"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Datepicker,
  Spinner,
} from "flowbite-react";
import { toast } from "react-toastify";
import moment from "moment";
import { useParams } from "next/navigation";
import { LiaPlusCircleSolid, LiaFileAlt } from "react-icons/lia";
import { PostItem } from "@/types/api";
import { getPostBySlug, updatePost } from "@/app/actions/posts";
import { Editor } from "@/app/components/admin/QEditor";
import { Slugify } from "@/app/components/admin/Slugify";
import { AttachmentPicker } from "@/app/components/admin/AttachmentPicker";

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const { slug } = params;
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [blogPostLoading, setBlogPostLoading] = useState(true);
  const [formError, setFormError] = useState(false);
  const [blogPost, setBlogPost] = useState<PostItem>({
    img: "",
    title: "",
    slug: "",
    isPublished: 0,
    publishedOn: "",
    content: "",
    tags: [],
  });
  const [blogPostBackup, setBlogPostBackup] = useState<PostItem>({
    img: "",
    title: "",
    slug: "",
    isPublished: 0,
    publishedOn: "",
    content: "",
    tags: [],
  });
  useEffect(() => {
    fetchBlogPost();
  }, []);

  useEffect(() => {
    if (blogPost?.content) {
      setContent(blogPost?.content);
    }
  }, [blogPost]);

  const fetchBlogPost = async () => {
    try {
      if (slug !== "new") {
        const response = await getPostBySlug(slug, session?.accessToken);
        const blogPost = { ...response };
        setBlogPost(blogPost);
        setBlogPostBackup(blogPost);
      }

      setBlogPostLoading(false);
    } catch (error) {
      console.error("Error fetching BlogPost :", error);
    }
  };

  const updateFields = (f, e) => {
    setFormError(false);
    const updatingData = { ...blogPost };
    let newVal = e;
    if (f === "tags") {
      newVal = e?.lingth > 1 ? e.split(",") : [e];
    } else if (f === "publishedOn") {
      newVal = moment(e).format();
    }
    updatingData[f] = newVal;
    setBlogPost(updatingData);
  };
  const updateImage = (val) => {
    const updatingData = { ...blogPost };
    updatingData.img = val;
    setBlogPost(updatingData);
  };

  const updateData = async (e) => {
    let errors = false;
    const newData = { ...blogPost };
    newData.content = content;
    const a = ["title", "slug", "publishedOn", "content"];
    a.forEach((field) => {
      if (
        newData[field] === "" ||
        newData[field] === undefined ||
        newData[field] === null
      ) {
        errors = true;
      }
    });
    if (JSON.stringify(newData) === JSON.stringify(blogPostBackup) || errors) {
      toast.error("No Changes To Update or Mandatory Fields Missing");
      setFormError(true);
    } else {
      try {
        setBlogPostLoading(true);
        await updatePost(newData, session?.accessToken);
        setBlogPostLoading(false);
      } catch (error) {
        toast.error("Failed to update Resume Item");
      }
    }
  };
  return (
    <div id="home" className="text-base-content">
      {blogPostLoading && (
        <div className="flex h-screen w-screen absolute  z-50 left-0 top-0 ">
          <div className="m-auto">
            <Spinner aria-label="Loading" size="xl" />
          </div>
        </div>
      )}
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200  dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="flex items-center w-full sm:justify-end">
                <div className="flex pl-2 space-x-1">
                  {" "}
                  <LiaFileAlt className="mr-2 h-8 w-8 text-gray-900 dark:text-white" />
                  <h1 className="text-xl  text-gray-900 sm:text-2xl dark:text-white">
                    Blog : {slug ? "Update" : "Create"}
                  </h1>
                </div>
              </div>
            </div>
            <Button
              color="blue"
              pill
              onClick={(event) => updateData(event)}
              className="me-2"
            >
              <LiaPlusCircleSolid className="mr-2 h-5 w-5" />{" "}
              {slug ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </div>
      <div className="container fluid">
        <form className="">
          <div className="row mb-3 mt-4">
            <div className="col-sm-12 col-md-6">
              <div className="mb-2 block">
                <Label htmlFor="small" value="Title" />
              </div>
              <TextInput
                id="Title"
                type="text"
                value={blogPost.title}
                required
                onChange={(event) => updateFields("title", event.target.value)}
                placeholder="Title"
                helperText={<> {formError && "Title is Mandatory"}</>}
              />
            </div>
            <div className="col-sm-12 col-md-6">
              <div className="mb-2 block">
                <div className="flex flex-wrap gap-1 pt-6">
                  <Label htmlFor="small" value="Slug" className="pt-1 mr-2" />{" "}
                 {slug == "new" &&   <Slugify value={blogPost?.title} />}
                </div>
              </div>
              <TextInput
                id="slug"
                type="text"
                value={blogPost.slug}
                required
                onChange={(event) => updateFields("slug", event.target.value)}
                placeholder="slug"
                disabled={slug !== "new"}
                helperText={<> {formError && "Slug is Mandatory"}</>}
              />
            </div>
          </div>
          <div className="row mb-3 mt-4">
            <div className="col-sm-12 col-md-12">
              <div className="mb-2 block">
                <Label htmlFor="small" value="Image" />
              </div>

              <div className="flex pr-3">
                <div className="flex-1 pr-3">
                  <TextInput
                    id="Image"
                    type="text"
                    value={blogPost.img}
                    required
                    onChange={(event) =>
                      updateFields("img", event.target.value)
                    }
                    placeholder="image s3 path"
                  />
                </div>
                <div className="flex-none w-24">
                  <AttachmentPicker
                    updateImage={updateImage}
                    selectedImg={blogPost.img}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-3 mt-4">
            <div className="col-sm-12 col-md-12">
              <div className="mb-2 block">
                <Label htmlFor="small" value="published On" />
              </div>
              <Datepicker
                id="publishedOn"
                type="text"
                value={
                  blogPost?.publishedOn
                    ? moment(blogPost?.publishedOn).toDate().toString()
                    : "--/--/--"
                }
                required
                onSelectedDateChanged={(d) => {
                  updateFields("publishedOn", d);
                }}
                placeholder="published On"
                helperText={<> {formError && "Published Date is Mandatory"}</>}
              />
            </div>
          </div>
          <div className="row mb-3 mt-4">
            <div className="col-sm-12 col-md-4">
              <div className="mb-2 block">
                <Label htmlFor="small" value="Tags" />
              </div>
              <TextInput
                id="Tags"
                type="text"
                value={
                  blogPost.tags && blogPost.tags.length > 0
                    ? blogPost.tags.join(",")
                    : ""
                }
                required
                onChange={(event) => updateFields("tags", event.target.value)}
                placeholder="Tags"
              />
            </div>
            <div className="col-sm-12 col-md-4 pt-3">
              <div className="mb-2 block">
                <Checkbox
                  id="small"
                  checked={blogPost.isPublished == 1}
                  onChange={(event) =>
                    updateFields("isPublished", event.target.checked ? 1 : 0)
                  }
                />{" "}
                <Label htmlFor="small" value="isPublished" />
              </div>
            </div>
          </div>
          <div className="row mb-3 mt-4">
            <div className="col-sm-12 col-md-12">
              <div className="mb-2 block">
                <Label htmlFor="small" value="Content in HTML" />
              </div>
              <div className="mb-2 block" style={{ height: 250 }}>
                {/*         
               <Textarea
                id="Content in HTML"
                value={blogPost.content}
                required
                onChange={(event) =>
                  updateFields("content", event.target.value)
                }
                rows={1}
                placeholder="as raw HTML"
              /> */}
                <Editor
                  onChange={setContent}
                  value={blogPost.content}
                  placeholder="Write something..."
                />
              </div>
              {formError && <div className="">Content is Mandatory</div>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
