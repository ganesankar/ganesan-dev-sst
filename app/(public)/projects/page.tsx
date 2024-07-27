"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

import { LiaGithub, LiaExternalLinkAltSolid } from "react-icons/lia";
import { Button, Spinner } from "flowbite-react";
import { projectContent } from "@/app/util/content";

import { ProjectItemType, ProjectItemErrorType } from "@/types/index";

export default function ProjectPage() {
  const [projectItemLoading, setProjectItemLoading] = useState(true);
  const [projectItemError, setProjectItemError] =
    useState<ProjectItemErrorType>({
      status: 200,
      message: "",
    });
  const [projectItemEntries, setProjectItemEntries] = useState<
    ProjectItemType[]
  >([]);

  useEffect(() => {
    fetchProjectItemEntries();
  }, []);

  const fetchProjectItemEntries = async () => {
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const entries = await response.json();
        setProjectItemLoading(false);
        setProjectItemEntries(entries);
      } else {
        console.error("Error fetching projects entries:", response.status);
      }
    } catch (error) {
      console.error("Error fetching projects entries:", error);
    }
  };
  return (
    <div id="home" className="text-base-content">
      <div className="flex   items-center justify-center">
        <div className="relative z-10 mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16 ">
          <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16">
            <div className="flex items-center justify-center pb-4"></div>
            <a
              href="#"
              className="mb-2 inline-flex items-center rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-gray-700 dark:text-blue-400"
            >
              {projectContent.icon} &nbsp; {projectContent.prefix}
            </a>
            <h2 className="mb-2 text-3xl font-extrabold text-gray-900 dark:text-white">
              {projectContent.title}
            </h2>
            {projectContent.text.map((item: any, index: any) => (
              <p
                key={`homeproject${index}`}
                className="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:px-48 lg:text-xl"
              >
                {item}
              </p>
            ))}
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 gap-4 "></div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-0 h-3/6 w-full bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900"></div>
      </div>
      {projectItemLoading && (
        <div className="flex  justify-center items-center">
          <div className="text-center">
            <Spinner aria-label="Extra large spinner example" size="xl" />
          </div>
        </div>
      )}
      
      {!projectItemLoading && projectItemEntries?.length === 0 && (
        <div className="flex  justify-center items-center">
          <div className="text-center py-3">
            <h6 className="text-lg font-bold dark:text-white">
              No Projects to show!
            </h6>
          </div>
        </div>
      )}
      <div className="mx-auto max-w-screen-lg px-4  text-left ">
        {projectItemEntries.map(
          ({ github, demo, title, content }: any, index: any) => (
            <div
              key={index}
              className="mb-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 md:p-8"
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {title}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400 pb-6">
                {content}
              </p>
              <div className="flex">
                {github && (
                  <Button
                    color="blue"
                    pill
                    as={Link}
                    href={github}
                    target="_blank"
                  >
                    <LiaGithub size={"1.5em"} /> &nbsp; Github
                  </Button>
                )}
                &nbsp;
                {demo && (
                  <Button
                    color="gray"
                    pill
                    as={Link}
                    href={demo}
                    target="_blank"
                  >
                    <LiaExternalLinkAltSolid size={"1.5em"} /> &nbsp; Demo
                  </Button>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
