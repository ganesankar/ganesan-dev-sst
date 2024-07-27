"use client";
import React from "react";
import { Badge, Button, Navbar, DarkThemeToggle, Card } from "flowbite-react";
import { confirmAlert } from "react-confirm-alert"; // Import

import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function AdminNavbar() {
  const pathname = usePathname();

  const LogoutConfirm = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <Card className="max-w-sm">
              <div className="flex flex-col items-center pb-5">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />

                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  Are you sure?
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  You want to Sign out?
                </span>
                <div className="mt-4 flex space-x-3 lg:mt-6">
                  <Button
                    color="failure"
                    onClick={() => {
                      signOut({});
                      onClose();
                    }}
                    className="me-2"
                  >
                    <LiaSignOutAltSolid className="mr-2 h-5 w-5" /> signOut
                  </Button>
                  <Button color="gray" onClick={onClose}>
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        );
      },
    });
  };
  return (
    <>
      <Navbar
        fluid
        className="fixed top-0 z-10 w-full bg-opacity-75 backdrop-blur-lg dark:bg-opacity-75 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 "
      >
        <Navbar.Brand as={Link} href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Ganesan.dev's
          </span>
          &nbsp;
          <Badge color="indigo">Admin Panel</Badge>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <DarkThemeToggle /> &nbsp;
          <Button  className="ml-3 "color="blue" onClick={() => LogoutConfirm()}>
            Sign out
          </Button>
          <Navbar.Toggle />
        </div>
      </Navbar>
    </>
  );
}
