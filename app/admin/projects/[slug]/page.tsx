"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Spinner,
  Textarea,
} from "flowbite-react";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import {
  LiaPlusCircleSolid,
  LiaFileCode,
  LiaTrashAltSolid,
} from "react-icons/lia";
import { ProjectItem } from "@/types/api";
import { getProjectBySlug, updateProject } from "@/app/actions/projects";
import { Slugify } from "@/app/components/admin/Slugify";

export default function ProjectEdit() {
  const params = useParams<{ slug: string }>();
  const { slug } = params;
  const { data: session } = useSession();
  const [projectItemLoading, setProjectItemLoading] = useState(true);
  const [formError, setFormError] = useState(false);
  const [projectItem, setProjectItem] = useState<ProjectItem>({
    title: "",
    slug: "",
    isPublished: 0,
    github: "",
    content: "",
    demo: "",
    stacks: [],
  });
  const [projectItemBackup, setProjectItemBackup] = useState<ProjectItem>({
    title: "",
    slug: "",
    isPublished: 0,
    github: "",
    content: "",
    demo: "",
    stacks: [],
  });
  useEffect(() => {
    fetchProjectItem();
  }, []);

  const fetchProjectItem = async () => {
    try {
      if (slug !== "new") {
        const response = await getProjectBySlug(slug, session?.accessToken);
        const projectItem = { ...response };
        setProjectItem(
          projectItem ? JSON.parse(JSON.stringify(projectItem)) : {}
        );
        setProjectItemBackup(
          projectItem ? JSON.parse(JSON.stringify(projectItem)) : {}
        );
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
  const updatelistingFields = (f, i, k, e) => {
    setFormError(false);
    const updatingData = { ...projectItem };
    updatingData[f][i][k] = e;
    setProjectItem(updatingData);
  };

  const insertlistingFields = (f) => {
    setFormError(false);
    const updatingData = { ...projectItem };
    const newItem = {
      name: "",
      url: "",
    };
    if (updatingData[f]) {
      updatingData[f].push(newItem);
    } else {
      updatingData[f] = [newItem];
    }
    setProjectItem(updatingData);
  };
  const removelistingFields = (f, i) => {
    setFormError(false);
    const updatingData = { ...projectItem };
    if (i > -1) {
      updatingData[f].splice(i, 1);
    }
    setProjectItem(updatingData);
  };

  const updateData = async (e) => {
    let errors = false;
    const a = ["title", "slug", "isPublished", "content", "github"];
    a.forEach((field) => {
      if (
        projectItem[field] === "" ||
        projectItem[field] === undefined ||
        projectItem[field] === null
      ) {
        errors = true;
      }
    });
    if (
      JSON.stringify(projectItem) === JSON.stringify(projectItemBackup) ||
      errors
    ) {
      toast.error("No Changes To Update or Mandatory Fields Missing");
      setFormError(true);
    } else {
      try {
        setProjectItemLoading(true);
        await updateProject(projectItem, session?.accessToken);
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
          <div className="pb-2 block">
            <Label htmlFor="small" value="Title" />
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
          <div className="pb-2 block">
            <div className="flex flex-wrap gap-1  mb-2">
              <Label htmlFor="small" value="Slug" className="mr-2" />{" "}
              {slug == "new" && <Slugify value={projectItem?.title} />}
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
          <div className="pb-2 block">
            <Label htmlFor="small" value="Github Link" />
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
          <div className="pb-2 block">
            <Label htmlFor="small" value="Demo Link" />

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
          <div className="py-2 block">
            <Label htmlFor="small" value="isPublished" />
            <Checkbox
              className="ml-2"
              id="small"
              checked={projectItem.isPublished == 1}
              onChange={(event) =>
                updateFields("isPublished", event.target.checked ? 1 : 0)
              }
            />{" "}
          </div>
          <div className="pb-2 block">
            <Label htmlFor="small" value="Content in HTML" />
            <Textarea
              id="content"
              value={projectItem.content}
              required
              onChange={(event) => updateFields("content", event.target.value)}
              rows={8}
              placeholder="as raw HTML"
              helperText={<> {formError && "description is Mandatory"}</>}
            />{" "}
          </div>
          <div className="mb-2 block ">
            <div className="flex">
              <Label
                htmlFor="small"
                value="Stacks"
                className="relative  w-full "
              />
              <div className="relative pl-5">
                <Button
                  color="blue"
                  pill
                  size="sm"
                  onClick={(d) => {
                    insertlistingFields("stacks");
                  }}
                >
                  Add
                </Button>
              </div>
            </div>{" "}
          </div>
          <div className="mb-2 block">
            {projectItem?.stacks?.length > 0 ? (
              projectItem?.stacks.map((item: any, index: any) => (
                <div className="flex mb-2" key={`resumelistingItem${index}`}>
                  {" "}
                  <span className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                    {index + 1}
                  </span>
                  <div
                    id="dropdown"
                    className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                  ></div>
                  <div className="relative w-full">
                    <div className="flex ...">
                      <div className="flex-none w-64 ...">
                        <input
                          id={`resumelistingItem${index}`}
                          type="text"
                          value={item.name}
                          required
                          onChange={(event) =>
                            updatelistingFields(
                              "stacks",
                              index,
                              "name",
                              event.target.value
                            )
                          }
                          className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                          placeholder="Enter Name"
                        />
                      </div>
                      <div className="flex-1 ...">
                        <input
                          id={`resumelistingItem${index}`}
                          type="text"
                          value={item.url}
                          required
                          onChange={(event) =>
                            updatelistingFields(
                              "stacks",
                              index,
                              "url",
                              event.target.value
                            )
                          }
                          className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                          placeholder="Enter URL"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      onClick={(d) => {
                        removelistingFields("stacks", index);
                      }}
                      className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <LiaTrashAltSolid className=" h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                <h3 className="text-gray-900 dark:text-white text-xl font-extrabold mb-2">
                  No Stacks available
                </h3>
                <p className="font-normal text-gray-500 dark:text-gray-400 mb-4">
                  Please Add any
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
