"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

import { adminDashboardContent } from "@/app/util/adminContent";
export default function Page() {
  const { data: session, status, update } = useSession();
  return (
    <>
      <section className="bg-white dark:bg-gray-900"></section>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="py-8 px-8 mx-auto ">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p- md:p-12 ">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-blue-400 mb-2">
              {adminDashboardContent.icon} &nbsp;{adminDashboardContent.prefix}
            </span>
            <h1 className="text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold mb-2">
              {adminDashboardContent.title}&nbsp; {session?.user?.email}
            </h1>
            {adminDashboardContent.text.map((item, index) => (
              <p
                key={`adminDashboardtext${index}`}
                className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6"
              >
                {item}
              </p>
            ))}
            {adminDashboardContent.links.map((item, index) => (
              <Link
                key={`adminDashboardlink${index}`}
                href={item.link}
                className="mr-3 inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              >
               {<item.icon/>} &nbsp; {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="pb-8 px-8 lg:pb-16">
          <div className="grid md:grid-cols-3 gap-8"></div>
        </div>
      </section>
    </>
  );
}
