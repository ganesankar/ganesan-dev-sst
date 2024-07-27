"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import moment from "moment";
import { groupBy } from "lodash";
import { Timeline, Spinner } from "flowbite-react";
import { blogContent } from "@/app/util/content";
import { BlogPostListType, BlogPostErrorType } from "@/types/index";

export default function BlogPage() {
  const [blogPostsLoading, setBlogPostsLoading] = useState(true);
  const [blogPostError, setBlogPostError] = useState<BlogPostErrorType>({
    status: 200,
    message: "",
  });
  const [blogPostEntries, setBlogPostEntries] = useState<BlogPostListType[]>(
    []
  );

  useEffect(() => {
    fetchBlogPostEntries();
  }, []);

  const fetchBlogPostEntries = async () => {
    try {
      const response = await fetch("/api/blog");
      let newArray = [];
      if (response.ok) {
        const entries = await response.json();
        const groups = groupBy(entries, "year");
        const ordered = Object.keys(groups)
          .sort()
          .reverse()
          .filter((x) => {
            var y: number = +x;
            return !isNaN(y);
          });
        newArray = ordered.map((year) => ({
          year: year,
          list: groups[year],
        }));
        setBlogPostsLoading(false);
        setBlogPostEntries(newArray);
      } else {
        console.error("Error fetching BlogPost entries:", response.status);
      }
    } catch (error) {
      console.error("Error fetching BlogPost entries:", error);
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
              {blogContent.icon} &nbsp; {blogContent.prefix}
            </a>
            <h2 className="mb-2 text-3xl font-extrabold text-gray-900 dark:text-white">
              {blogContent.title}
            </h2>
            {blogContent.text.map((item: any, index: any) => (
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
      <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
      {blogPostsLoading && (
        <div className="flex  justify-center items-center">
          <div className="text-center">
            <Spinner aria-label="Extra large spinner example" size="xl" />
          </div>
        </div>
      )}
      {!blogPostsLoading && blogPostEntries?.length === 0 && (
        <div className="flex  justify-center items-center">
          <div className="text-center py-3">
            <h6 className="text-lg font-bold dark:text-white">
              No Posts to show!
            </h6>
          </div>
        </div>
      )}
      {blogPostEntries?.map(({ year, list }: any, index: any) => (
        <div key={index} className="mx-auto max-w-screen-xl px-4  text-left ">
          <div className="container grid w-full grid-cols-1 p-4 sm:grid-cols-1 md:grid-cols-4">
            <div className=" p-4">
              <h1 className="mb-4 text-4xl font-extrabold leading-none  text-right tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                {year}
              </h1>
            </div>
            <div className="col-span-3 p-4">
              <Timeline>
                {list?.map(
                  ({ title, slug, publishedOn, content }: any, index: any) => (
                    <Timeline.Item key={`homeblog${index}`}>
                      <Timeline.Point />
                      <Timeline.Content>
                        <Timeline.Time>
                          {" "}
                          {publishedOn ? moment(publishedOn).format("ll") : ""}
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
              <div className="">
                <div className="text-right pt-3"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
