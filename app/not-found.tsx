"use client";
import Link from "next/link";
import { PageNotFoundContent } from "@/app/util/content";
export default function NotFoundPage() {
  return (
    <div id="NotFoundPage" className="text-base-content">
      <section className="py-32">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <span className="mb-2 inline-flex items-center rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-gray-700 dark:text-blue-400">
                {PageNotFoundContent?.icon}&nbsp;{PageNotFoundContent?.prefix}
              </span>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            {PageNotFoundContent.title}
          </h1>
         {PageNotFoundContent.text?.map((item, index) => ( <p  key={index} className="mb-3 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
            {item}
          </p>))}
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 pt-6">
            {PageNotFoundContent.buttons?.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              >
                {item.icon}&nbsp; {item.text}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
