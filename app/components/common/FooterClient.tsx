"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useThemeMode, Button, Popover } from "flowbite-react";
import { LiaCodeSolid } from "react-icons/lia";
import { FooterContactContent } from "@/app/util/content";

export default function FooterClient() {
  const pathName = usePathname();
  return (
    <div key="footer" id="contact" className="p-2">
      <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      {!pathName.includes("/admin") && (
        <>
          <div className="mx-auto max-w-screen-xl p-4 md:p-8 text-center">
            <span className="mb-2 inline-flex items-center rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-gray-700 dark:text-blue-400">
              {FooterContactContent.icon}&nbsp;
              {FooterContactContent.prefix}
            </span>

            <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">
              {FooterContactContent.title}
            </h2>
            {FooterContactContent?.text.map((item, index) => (
              <p
                key={index}
                className="m-auto text-lg font-normal text-gray-500 dark:text-gray-400 mb-4 max-w-2xl"
              >
                {item}
              </p>
            ))}
            {FooterContactContent.links.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center mr-3"
              >
                {item.icon}&nbsp; {item.name}
              </Link>
            ))}
          </div>
        </>
      )}
      
      <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <Popover
        aria-labelledby="default-popover"
        content={
          <div className="w-64 text-sm text-gray-500 dark:text-gray-400 p-5">
            <p className="text-center text-pretty font-normal  text-gray-400 text-sm">
              Built with{" "}
              <Link
                href="https://sst.dev/"
                className="text-gray-600 dark:text-gray-200"
                target="_blank"
              >
                SST
              </Link>
              ,{" "}
              <Link
                href="https://nextjs.org/"
                className="text-gray-600 dark:text-gray-200"
                target="_blank"
              >
                Next.js
              </Link>
              ,{" "}
              <Link
                href="https://tailwindcss.com/"
                className="text-gray-600 dark:text-gray-200"
                target="_blank"
              >
                Tailwind CSS
              </Link>,&nbsp;
              <Link
                href="https://flowbite-react.com/"
                className="text-gray-600 dark:text-gray-200"
                target="_blank"
              >
                Flowbite
              </Link>
              ,&nbsp; in &nbsp;
              <Link
                href="https://aws.amazon.com"
                className="text-gray-600 dark:text-gray-200"
                target="_blank"
              >
                AWS
              </Link>
              &nbsp; utilizing Lambda, DynamoDB, API Gateway, S3, Cognito 
              &amp; code available in &nbsp;
              <Link
                href="https://github.com/ganesankar/ganesan-dev-sst"
                className="text-gray-600 dark:text-gray-200"
                target="_blank"
              >
                Github
              </Link>
            </p>
          </div>
        }
      >
        <Button color="gray" pill size="xs" className=" m-auto">
          <LiaCodeSolid className="h-5 w-5" />
        </Button>
      </Popover>{" "}
      
    </div>
  );
}
