"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navbar, DarkThemeToggle } from "flowbite-react";
import { NavLinkType } from "@/types/index";
export default function Header() {
  const pathName = usePathname();
  const menu: NavLinkType[] = [
    {
      name: "About",
      url: pathName === "/" ? "/#about" : "/",
    },
    {
      name: "Projects",
      url: pathName === "/" ? "/#projects" : "/projects",
    },
    {
      name: "Blog",
      url: pathName === "/" ? "/#blog" : "/blog",
    },
    {
      name: "Contact",
      url: "/contact",
    },
  ];
  const exMenu: NavLinkType[] = [
    {
      name: "Resume",
      url: "/resume",
    },
  ];
  return (
    <>
      <Navbar
        fluid
        className="fixed top-0 z-50 w-full bg-opacity-75 backdrop-blur-lg dark:bg-opacity-75 "
      >
        <Navbar.Brand as={Link} href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Ganesan  <span className ="hidden sm:inline-block">Karuppaiya</span>
          </span>
        </Navbar.Brand>
        <Navbar.Collapse>
          {menu?.map((item: NavLinkType, index: any) => (
            <Navbar.Link
              key={`headMainNav${index}`}
              href={item.url}
              className={`${pathName === item.url ? "active" : ""}`}
            >
              {item.name}{" "}
            </Navbar.Link>
          ))}
        </Navbar.Collapse>
        <div className="flex md:order-2">
          {exMenu?.map((item: NavLinkType, index: any) => (
            <Link
              key={`headExNav${index}`}
              href={item.url}
              className="me-2 rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {item.name}{" "}
            </Link>
          ))}
          <DarkThemeToggle className="mx-3" />
          <Navbar.Toggle />
        </div>
      </Navbar>
    </>
  );
}
