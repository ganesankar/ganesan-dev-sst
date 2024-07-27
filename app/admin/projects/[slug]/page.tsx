"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Spinner,
} from "flowbite-react";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { LiaPlusCircleSolid, LiaFileCode } from "react-icons/lia";
import { ProjectItem } from "@/types/api";
import { getProjectBySlug, updateProject } from "@/app/actions/projects";
import { Editor } from "@/app/components/admin/QEditor";
import { Slugify } from "@/app/components/admin/Slugify";

export default function ProjectEdit() {
  const params = useParams<{ slug: string }>();
  const { slug } = params;
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [projectItemLoading, setProjectItemLoading] = useState(true);
  const [formError, setFormError] = useState(false);
  const [projectItem, setProjectItem] = useState<ProjectItem>({
    title: "",
    slug: "",
    isPublished: 0,
    github: "",
    content: "",
    demo: "",
  });
  const [projectItemBackup, setProjectItemBackup] = useState<ProjectItem>({
    title: "",
    slug: "",
    isPublished: 0,
    github: "",
    content: "",
    demo: "",
  });
  useEffect(() => {
    fetchProjectItem();
  }, []);

  useEffect(() => {
    if (projectItem?.content) {
      setContent(projectItem?.content);
    }
  }, [projectItem]);

  const fetchProjectItem = async () => {
    try {
      if (slug !== "new") {
        const response = await getProjectBySlug(slug, session?.accessToken);
        const projectItem = { ...response };
        setProjectItem(projectItem);
        setProjectItemBackup(projectItem);
      }

      setProjectItemLoading(false);
    } catch (error) {
      console.error("Error fetching ProjectItem :", error);
    }
  };

  const updateFields = (f, e) => {
    setFormError(false);
    const updatingData = { ...projectItem };
    updatingData[f] = e;
    setProjectItem(updatingData);
  };

  const updateData = async (e) => {
    let errors = false;
    const newData = { ...projectItem };
    newData.content = content;
    const a = ["title", "slug", "isPublished", "content", "github"];
    a.forEach((field) => {
      if (
        newData[field] === "" ||
        newData[field] === undefined ||
        newData[field] === null
      ) {
        errors = true;
      }
    });
    if (
      JSON.stringify(newData) === JSON.stringify(projectItemBackup) ||
      errors
    ) {
      toast.error("No Changes To Update or Mandatory Fields Missing");
      setFormError(true);
    } else {
      try {
        setProjectItemLoading(true);
        await updateProject(newData, session?.accessToken);
        setProjectItemLoading(false);
      } catch (error) {
        toast.error("Failed to update Resume Item");
      }
    }
  };
  return (
    <div id="home" className="text-base-content">
      {projectItemLoading && (
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
                  <LiaFileCode className="mr-2 h-8 w-8 text-gray-900 dark:text-white" />
                  <h1 className="text-xl  text-gray-900 sm:text-2xl dark:text-white">
                    Project : {slug ? "Update" : "Create"}
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
                value={projectItem.title}
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
                  {slug == "new" && <Slugify value={projectItem?.title} />}
                </div>
              </div>
              <TextInput
                id="slug"
                type="text"
                value={projectItem.slug}
                required
                onChange={(event) => updateFields("slug", event.target.value)}
                placeholder="slug"
                disabled={slug !== "new"}
                helperText={<> {formError && "Slug is Mandatory"}</>}
              />
            </div>
          </div>
          <div className="row mb-3 mt-4">
            <div className="col-sm-12 col-md-4">
              <div className="mb-2 block">
                <Label htmlFor="small" value="Github Link" />
              </div>
              <TextInput
                id="Github"
                type="text"
                value={projectItem.github}
                required
                onChange={(event) => updateFields("github", event.target.value)}
                placeholder="github link"
                helperText={<> {formError && "repo link is Mandatory"}</>}
              />
            </div>
            <div className="col-sm-12 col-md-4">
              <div className="mb-2 block">
                <Label htmlFor="small" value="Demo Link" />
              </div>
              <TextInput
                id="demo"
                type="text"
                value={projectItem.demo}
                required
                onChange={(event) => updateFields("demo", event.target.value)}
                placeholder="demo link"
                helperText={<> {formError && "repo link is Mandatory"}</>}
              />
            </div>
            <div className="col-sm-12 col-md-4 pt-3">
              <div className="mb-2 block">
                <Checkbox
                  id="small"
                  checked={projectItem.isPublished == 1}
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
                <Editor
                  onChange={setContent}
                  value={projectItem.content}
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
