"use client";

import { Card } from "flowbite-react";
import { HomeWorkPropsType } from "@/types/index";

export default function Work({
  title,
  prefix,
  text,
  services,
  icon,
}: HomeWorkPropsType) {
  return (
    <div className="hero min-h-screen" id="at-work">
      <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
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

            <div className="grid md:grid-cols-2 gap-8 pt-4">
              {services.map(({ points, title, icon }, index) => (
                <Card key={`homeWork${index}`}>
                  <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    {icon}
                  </h1>
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {title}
                  </h5>
                  <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 p-1">
                    {points.map((item, indexx) => (
                      <li
                        key={`homeWork${indexx}`}
                        className=" text-gray-700 dark:text-gray-400"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-0 h-full w-full bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900"></div>
      </div>
    </div>
  );
}
