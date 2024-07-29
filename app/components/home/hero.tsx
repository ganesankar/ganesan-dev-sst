"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Tooltip } from "flowbite-react";
import { HomeHeroPropsType } from "@/types/index";
export default function Hero({
  image,
  name,
  title,
  prefix,
  subText,
  buttons,
  icon,
}: HomeHeroPropsType) {
  return (
    <div className="hero min-h-screen" id="home">
      <div className="flex  min-h-screen items-center justify-center">
        <div className="relative z-10 mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16 ">
          <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16">
            <div className="flex items-center justify-center pb-4">
              <Image
                src={image}
                width="400"
                height="400"
                alt={name}
                className="size-64 rounded-full"
              />
            </div>
            <a
              href="#"
              className="mb-2 inline-flex items-center rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-gray-700 dark:text-blue-400"
            >
              {icon}&nbsp;{prefix}
            </a>
            <h2 className="mb-2 text-3xl font-extrabold text-gray-900 dark:text-white">
              {name}
            </h2>

            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:px-48 lg:text-xl">
              {subText}
            </p>
            <div className="flex flex-row justify-center ">
              {buttons?.map((item, index) => (
                <Link key={index} href={item.link} className="m-2" target="_blank">
                  <Tooltip content={item.text}>
                    <span className=" text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
                      {item.icon}
                    </span>
                  </Tooltip>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-0 h-full w-full bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900"></div>
      </div>
    </div>
  );
}
