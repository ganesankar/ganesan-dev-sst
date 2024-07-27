"use client";
import { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";
import { useParams } from "next/navigation";
import moment from "moment";
import Image from "next/image";
import { LiaCalendar } from "react-icons/lia";

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const [blogPostLoading, setBlogPostLoading] = useState(true);
  const [blogPostError, setBlogPostError] = useState({
    status: 200,
    message: "",
  });
  const [blogPost, setBlogPost] = useState({
    img: "",
    title: "",
    publishedOn: "",
    content: "",
  });

  useEffect(() => {
    fetchBlogPost();
  }, []);

  const fetchBlogPost = async () => {
    try {
      const { slug } = params;
      const response = await fetch(`/api/blog/${slug}`);
      if (response.ok) {
        const entries = await response.json();
        setBlogPost(entries);
        setBlogPostLoading(false);
      } else {
        setBlogPostError({
          status: 400,
          message: "SomeThing Went Wrong",
        });
        console.error("Error fetching BlogPost :", response.status);
      }
    } catch (error) {
      setBlogPostError({
        status: 400,
        message: "SomeThing Went Wrong",
      });
      console.error("Error fetching BlogPost :", error);
    }
  };
  return (
    <div id="home" className="text-base-content">
      <div className="flex  items-center justify-center">
        <div className="relative z-10 mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16 ">
          <div className="mx-auto max-w-screen-xl px-4 py-8  lg:py-16">
            <div className="flex items-center justify-center pb-4"></div>
            <div className="mx-auto py-8">
              {blogPostLoading && (
                <div className="flex  justify-center items-center">
                  <div className="text-center">
                    <Spinner
                      aria-label="Extra large spinner example"
                      size="xl"
                    />
                  </div>
                </div>
              )}
              {blogPost?.img && (
                <Image
                  className="rounded-lg"
                  src={blogPost?.img}
                  alt={blogPost?.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }} // optional
                />
              )}
            </div>
            {!blogPostLoading  && blogPost?.title && (
              <>
                <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
                <a
                  href="#"
                  className="mb-2 inline-flex items-center rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-gray-700 dark:text-blue-400"
                >
                  <LiaCalendar /> &nbsp;{" "}
                  {blogPost.publishedOn &&
                    moment(blogPost.publishedOn).format("ll")}
                </a>
                <h2 className="mb-2 text-3xl font-extrabold text-gray-900 dark:text-white text-center">
                  {blogPost.title}
                </h2>

                <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
                <div
                  className="text-justify blog-post text-gray-600 dark:text-gray-300"
                  dangerouslySetInnerHTML={{ __html: blogPost.content }}
                ></div>
              </>
            )}

            {!blogPostLoading && !blogPost?.title && (
              <div className="flex  justify-center items-center">
                <div className="text-center py-3">
                  <h6 className="text-lg font-bold dark:text-white">
                    This Post is not available
                  </h6>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="absolute left-0 top-0 z-0 h-3/6 w-full bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900"></div>
      </div>
    </div>
  );
}
