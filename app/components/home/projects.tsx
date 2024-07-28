"use client";
import { useState, useEffect } from "react";

import { Button, Badge } from "flowbite-react";
import Link from "next/link";
import {
  LiaArrowRightSolid,
  LiaGithub,
  LiaExternalLinkAltSolid,
} from "react-icons/lia";
import { HomeProjectPropsType } from "@/types/index";

export default function Projects({
  title,
  prefix,
  text,
  icon,
}: HomeProjectPropsType) {
  const [projectItemEntries, setProjectItemEntries] = useState([]);

  useEffect(() => {
    fetchProjectPostEntries();
  }, []);

  const fetchProjectPostEntries = async () => {
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const entries = await response.json();
        const slicedArray = entries.slice(0, 3);
        setProjectItemEntries(slicedArray);
      } else {
        console.error("Error fetching ProjectPost entries:", response.status);
      }
    } catch (error) {
      console.error("Error fetching ProjectPost entries:", error);
    }
  };
  return (
    <div className="hero min-h-screen" id="projects">
      <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
      <div className="flex  min-h-screen items-center justify-center">
        <div className="mx-auto max-w-screen-xl px-4 py-8 text-left lg:py-16">
          <div className="container grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-1 md:grid-cols-4">
            <div className=" p-4">
              <span className="mb-2 inline-flex items-center rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-gray-700 dark:text-blue-400">
                {icon}&nbsp;{prefix}
              </span>
              <h2 className="mb-2 text-3xl font-extrabold text-gray-900 dark:text-white">
                {title}
              </h2>
            </div>
            <div className="col-span-3 p-4">
              {text.map((item, index) => (
                <p
                  key={index}
                  className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400"
                >
                  {item}
                </p>
              ))}

              <div className="">
                {projectItemEntries.map(
                  (
                    { github, demo, title, content, stacks }: any,
                    index: any
                  ) => (
                    <div
                      key={index}
                      className="mb-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 md:p-8"
                    >
                      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {title}
                      </h5>
                      <div className="font-normal text-gray-700 dark:text-gray-400 pb-6">
                        {" "}
                        {content}
                      </div>
                      <p className="font-normal text-gray-700 dark:text-gray-400 pb-6">
                        {stacks?.map((item, index) => (
                          <a
                            href={item?.url}
                            target="_blank"
                            key={index}
                            className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-blue-400 mb-2 mr-2"
                          >
                            {item?.name}
                          </a>
                        ))}
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
                            <LiaExternalLinkAltSolid size={"1.5em"} /> &nbsp;
                            Demo
                          </Button>
                        )}
                      </div>
                    </div>
                  )
                )}
                <div className="text-right pt-3">
                  <Link
                    href="/projects"
                    className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center"
                  >
                    View All &nbsp;
                    <LiaArrowRightSolid />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-0 h-full w-full bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900"></div>
      </div>
    </div>
  );
}
