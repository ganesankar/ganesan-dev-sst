"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Spinner,
  Datepicker,
  Textarea,
  Select,
} from "flowbite-react";
import { toast } from "react-toastify";
import moment from "moment";
import { useParams } from "next/navigation";
import {
  LiaPlusCircleSolid,
  LiaTrashAltSolid,
  LiaFileCode,
} from "react-icons/lia";
import { ResumeItem } from "@/types/api";
import { getResumeById, updateResume } from "@/app/actions/resume";
import { resumeCategory } from "@/app/util/adminContent";

export default function ResumeEdit() {
  const params = useParams<{ slug: string }>();
  const { slug } = params;
  const { data: session } = useSession();
  const [resumeItemLoading, setResumeItemLoading] = useState(true);
  const [formError, setFormError] = useState(false);
  const [resumeItem, setResumeItem] = useState<ResumeItem>({
    id: "",
    title: "",
    subtitle: "",
    isPublished: 0,
    category: "",
    description: "",
    startDate: "",
    endDate: "",
    listing: [],
    place: "",
  });
  const [resumeItemBackup, setResumeItemBackup] = useState<ResumeItem>({
    id: "",
    title: "",
    subtitle: "",
    isPublished: 0,
    category: "",
    description: "",
    startDate: "",
    endDate: "",
    listing: [],
    place: "",
  });
  useEffect(() => {
    fetchResumeItem();
  }, []);

  const fetchResumeItem = async () => {
    try {
      if (slug !== "new") {
        const response = await getResumeById(slug, session?.accessToken);
        const resumeItem = { ...response };
        setResumeItem(resumeItem);
        setResumeItemBackup(resumeItem);
      }

      setResumeItemLoading(false);
    } catch (error) {
      console.error("Error fetching ResumeItem :", error);
    }
  };

  const updateFields = (f, e) => {
    setFormError(false);
    const updatingData = { ...resumeItem };
    updatingData[f] = e;
    setResumeItem(updatingData);
  };
  const updatelistingFields = (f, i, e) => {
    setFormError(false);
    const updatingData = { ...resumeItem };
    updatingData[f][i] = e;
    setResumeItem(updatingData);
  };

  const removelistingFields = (f, i) => {
    setFormError(false);
    const updatingData = { ...resumeItem };
    if (i > -1) {
      updatingData[f].splice(i, 1);
    }
    setResumeItem(updatingData);
  };

  const insertlistingFields = (f) => {
    setFormError(false);
    const updatingData = { ...resumeItem };
    updatingData[f].push("");
    setResumeItem(updatingData);
  };
  const updateData = async (e) => {
    let errors = false;
    const newData = { ...resumeItem };
    const a = [
      "title",
      "subtitle",
      "isPublished",
      "category",
      "description",
      "startDate",
      "endDate",
      "listing",
      "place",
    ];
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
      JSON.stringify(newData) === JSON.stringify(resumeItemBackup) ||
      errors
    ) {
      toast.error("No Changes To Update or Mandatory Fields Missing");
      setFormError(true);
    } else {
      try {
        setResumeItemLoading(true);
        await updateResume(newData, session?.accessToken);
        setResumeItemLoading(false);
      } catch (error) {
        toast.error("Failed to update Resume Item");
      }
    }
  };
  return (
    <div id="home" className="text-base-content">
      {resumeItemLoading && (
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
                    Resume : {slug ? "Update" : "Create"}
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
      <div>
        <form className="px-8 py-8">
          <div className="mb-2 block">
            <Label htmlFor="small" value="Title" />
          </div>
          <TextInput
            id="Title"
            type="text"
            value={resumeItem.title}
            required
            onChange={(event) => updateFields("title", event.target.value)}
            placeholder="Title"
            helperText={<> {formError && "Title is Mandatory"}</>}
          />
          <div className="mb-2 block">
            <Label htmlFor="small" value="Sub Title" />
          </div>
          <TextInput
            id="subtitle"
            type="text"
            value={resumeItem.subtitle}
            required
            onChange={(event) => updateFields("subtitle", event.target.value)}
            placeholder="Title"
            helperText={<> {formError && "subtitle is Mandatory"}</>}
          />
          <div className="mb-2 block">
            <Label htmlFor="small" value="Category" />
          </div>
          <Select
            id="countries"
            required
            onChange={(event) => updateFields("category", event.target.value)}
          >
            {resumeCategory?.map((item, index) => (
              <option
                key={`adminSideBarLink${index}`}
                value={item}
                selected={resumeItem.category == item}
              >
                {item}
              </option>
            ))}
          </Select>
          <div className="mb-2 block">
            <Label htmlFor="small" value="Place" />
          </div>
          <TextInput
            id="place"
            type="text"
            value={resumeItem.place}
            required
            onChange={(event) => updateFields("place", event.target.value)}
            placeholder="place"
            helperText={<> {formError && "place is Mandatory"}</>}
          />
          <div className="mb-2 block">
            <Label htmlFor="small" value="Description" />
          </div>
          <div className="mb-2 block">
            <Textarea
              id="description"
              value={resumeItem.description}
              required
              onChange={(event) => updateFields("description", event.target.value)}
              rows={5}
              placeholder="as raw HTML"
              helperText={<> {formError && "description is Mandatory"}</>}
            />
          </div>
          <div className="mb-2 block ">
            <div className="flex mr-5">
              <Label htmlFor="small" value="List" className="relative  w-full " />
          
            <div className="relativepl-5">
              <Button
                color="gray"
                pill
                size="xs"
                onClick={(d) => {
                  insertlistingFields("listing");
                }}
              >
                Add
              </Button>
            </div>
          </div>  </div>
          <div className="mb-2 block">
            {resumeItem.listing.map((item: any, index: any) => (
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
                  <input
                    id={`resumelistingItem${index}`}
                    type="text"
                    value={item}
                    required
                    onChange={(event) =>
                      updatelistingFields("listing", index, event.target.value)
                    }
                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Enter List"
                  />
                  <button
                    type="submit"
                    onClick={(d) => {
                      removelistingFields("listing", index);
                    }}
                    className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <LiaTrashAltSolid className=" h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              {" "}
              <div className="mb-2 block">
                <Label htmlFor="small" value="Start Date" />
              </div>
              <Datepicker
                id="startDate"
                type="text"
                value={
                  resumeItem?.startDate
                    ? moment(resumeItem?.startDate).toDate().toString()
                    : "--/--/--"
                }
                required
                onSelectedDateChanged={(d) => {
                  updateFields("startDate", d);
                }}
                placeholder="published On"
                helperText={<> {formError && "start Date is Mandatory"}</>}
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <div className="mb-2 block">
                <Label htmlFor="small" value="End Date" /> {"  "}
                <Checkbox
                  id="presentDate"
                  checked={resumeItem.endDate == "P"}
                  onChange={(event) =>
                    updateFields("endDate", event.target.checked ? "P" : "")
                  }
                />{" "}
                <Label htmlFor="presentDate" value="Is Present" />
              </div>
              {resumeItem.endDate !== "P" && (
                <Datepicker
                  id="endDate"
                  type="text"
                  value={
                    resumeItem?.endDate
                      ? moment(resumeItem?.endDate).toDate().toString()
                      : "--/--/--"
                  }
                  required
                  onSelectedDateChanged={(d) => {
                    updateFields("endDate", d);
                  }}
                  placeholder="published On"
                  helperText={<> {formError && "end Date  is Mandatory"}</>}
                />
              )}
            </div>
          </div>

          <div className="mb-2 block">
            <Checkbox
              id="isPublished"
              checked={resumeItem.isPublished == 1}
              onChange={(event) =>
                updateFields("isPublished", event.target.checked ? 1 : 0)
              }
            />{" "}
            <Label htmlFor="isPublished" value="isPublished" />
          </div>
        </form>
      </div>
    </div>
  );
}
