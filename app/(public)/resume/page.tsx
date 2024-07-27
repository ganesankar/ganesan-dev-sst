"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

import { groupBy } from "lodash";
import { Button, Spinner } from "flowbite-react";
import { resumeContent } from "@/app/util/content";

import { ResumeSectionType } from "@/types/index";

import Summary from "@/app/components/resume/Summary";
import Expertise from "@/app/components/resume/Expertise";
import Experience from "@/app/components/resume/Experience";
import Education from "@/app/components/resume/Education";
import Awards from "@/app/components/resume/Awards";

export default function ProjectPage() {
  const [resumeLoading, setResumeLoading] = useState(true);
  const [resumeEntries, setResumeEntries] = useState<ResumeSectionType[]>([]);

  useEffect(() => {
    fetchResumeEntries();
  }, []);

  const fetchResumeEntries = async () => {
    try {
      setResumeLoading(true);
      const response = await fetch("/api/resume");
      let newArray = [];
      if (response.ok) {
        const entries = await response.json();
        if (entries?.length > 0) {
          const groups = groupBy(entries, "category");
          //const ordered = Object.keys(groups);
          const ordered = [
            "summary",
            "expertise",
            "experience",
            "education",
            "awards",
            "projects",
          ];
          newArray = ordered.map((type) => ({
            title: type,
            content: groups[type].sort((a, b) => {
              return b.startDate - a.startDate;
            }),
          }));
        }
        setResumeLoading(false);
        setResumeEntries(newArray);
      } else {
        console.error("Error fetching resume entries:", response.status);
      }
    } catch (error) {
      console.error("Error fetching resume entries:", error);
    }
  };
  return (
    <div id="home" className="text-base-content">
      <div className="flex   items-center justify-center">
        <div className="absolute left-0 top-0 z-0 h-3/6 w-full bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900"></div>
      </div>
      <div className="mx-auto max-w-screen-lg px-4  text-left pt-24  z-1 relative ">
        <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 gap-4">
          <div className="">
            {" "}
            <Image
              src={resumeContent.image}
              width="400"
              height="400"
              alt={resumeContent.name}
              className=" rounded-full"
            />
          </div>
          <div className="col-span-3 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4  ">
              <div className="col-span-3 h-64 ">
                <div className="grid ">
                  <div className="w-full p-10">
                    <h2 className="mb-2 text-3xl font-extrabold text-gray-900 dark:text-white">
                      {resumeContent.name}
                    </h2>
                    <p className="max-w-2xl mb-6 text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                      {resumeContent.title}
                    </p>
                    <div className="flex">
                      {resumeContent.buttons?.map((item, index) => (
                        <Link
                          key={index}
                          href={item.link}
                          target="_blank"
                          className="flex-initial flex w-42 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                          <span>{item.icon}</span>&nbsp; {item.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {resumeLoading && (
          <div className="flex  justify-center items-center">
            <div className="text-center">
              <Spinner aria-label="Extra large spinner example" size="xl" />
            </div>
          </div>
        )}
        {!resumeLoading && resumeEntries?.length === 0 && (
          <div className="flex  justify-center items-center">
            <div className="text-center py-3">
              <h6 className="text-lg font-bold dark:text-white">
                No Resume Details to show!
              </h6>
            </div>
          </div>
        )}
        {resumeEntries.map(({ title, content }: any, index: any) => (
          <div key={index} className="">
            {" "}
            <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className="grid  grid-cols-1 sm:grid-cols-4 md:grid-cols-4 gap-4 pt-8">
              <div>
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white textFirstCap">
                  {" "}
                  {title}{" "}
                </h5>
              </div>
              <div className="col-span-3">
                {(() => {
                  switch (title) {
                    case "summary":
                      return <Summary content={content} />;
                    case "expertise":
                      return <Expertise content={content} />;
                    case "experience":
                      return <Experience content={content} title={title} />;
                    case "projects":
                      return <Experience content={content} title={title} />;
                    case "awards":
                      return <Awards content={content} />;
                    case "education":
                      return <Education content={content} />;
                    default:
                      return null;
                  }
                })()}
              </div>
            </div>
            <div className="container pt-8">
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-3 col-xl-2"></div>
                <div className="col-xs-12 col-sm-6 col-md-9 col-xl-19 pt-3"></div>
              </div>
            </div>
            <div className="mb-4 flex items-center justify-between"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
