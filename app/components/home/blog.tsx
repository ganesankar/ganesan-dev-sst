"use client";
import { useState, useEffect } from "react";
import { LiaArrowRightSolid } from "react-icons/lia";
import Link from "next/link";
import moment from "moment";
import { Timeline } from "flowbite-react";
import { HomeBlogPropsType } from "@/types/index";

export default function Blog({ title, prefix, text, icon }: HomeBlogPropsType) {
  const [blogPostEntries, setBlogPostEntries] = useState([]);

  useEffect(() => {
    fetchBlogPostEntries();
  }, []);

  const fetchBlogPostEntries = async () => {
    try {
      const response = await fetch("/api/blog");
      if (response.ok) {
        const entries = await response.json();
        const slicedArray = entries.slice(0, 5);
        setBlogPostEntries(slicedArray);
      } else {
        console.error("Error fetching BlogPost entries:", response.status);
      }
    } catch (error) {
      console.error("Error fetching BlogPost entries:", error);
    }
  };
  return (
    <div className="hero min-h-screen" id="blog">
      <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
      <div className="flex  min-h-screen items-center justify-center">
        <div className="flex  items-center justify-center">
          <div className="flex  w-full flex-col ">
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
                    <Timeline>
                      {blogPostEntries.map(
                        (
                          { title, slug, publishedOn, content }: any,
                          index: any
                        ) => (
                          <Timeline.Item key={`homeblog${index}`}>
                            <Timeline.Point />
                            <Timeline.Content>
                              <Timeline.Time>
                                {" "}
                                {publishedOn
                                  ? moment(publishedOn).format("ll")
                                  : ""}
                              </Timeline.Time>
                              <Timeline.Title>
                                <Link href={`/blog/${slug}`}>{title}</Link>
                              </Timeline.Title>
                              <Timeline.Body>
                                {" "}
                                <div
                                  dangerouslySetInnerHTML={{ __html: content }}
                                ></div>
                              </Timeline.Body>
                            </Timeline.Content>
                          </Timeline.Item>
                        )
                      )}
                    </Timeline>
                    <div className="text-right pt-3">
                      <Link
                        href="/blog"
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
          </div>
        </div>
        <div className="absolute left-0 top-0 z-0 h-full w-full bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900"></div>
      </div>
    </div>
  );
}
