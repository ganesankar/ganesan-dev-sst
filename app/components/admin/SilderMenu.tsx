"use client";
import React from "react";
import { Sidebar } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LiaHomeSolid } from "react-icons/lia";

import { AdminNavLinks } from "@/app/util/adminContent";

export default function SilderMenu() {
  const pathname = usePathname();
  return (
    <>
      <Sidebar
        aria-label="Sidebar with multi-level dropdown example"
        className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="flex h-full flex-col justify-between py-2">
          <div>
            <Sidebar.Items>
              <Sidebar.ItemGroup className="pb-2">
                <Sidebar.Item
                  href="/admin"
                  icon={LiaHomeSolid}
                  className={
                    pathname == "dashboard"
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  Dashboard
                </Sidebar.Item>
                {AdminNavLinks?.map((item, index) => (
                  <Sidebar.Item
                    key={`adminSideBarLink${index}`}
                    href={item.link}
                    icon={item.icon}
                    className={
                      pathname.includes(item.link)
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }
                  >
                    {item.name}
                  </Sidebar.Item>
                ))}
              </Sidebar.ItemGroup>
              <Sidebar.ItemGroup></Sidebar.ItemGroup>
            </Sidebar.Items>
          </div>
        </div>
      </Sidebar>
    </>
  );
}
