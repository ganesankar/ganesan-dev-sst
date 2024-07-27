"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import LoginWrapperProvider from "@/app/components/admin/LoginWrapperProvider";
import AdminNavbar from "@/app/components/admin/AdminNavbar";
import SilderMenu from "@/app/components/admin/SilderMenu";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional Theme applied to the Data Grid

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <LoginWrapperProvider>
        <AdminNavbar />
        <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900 w-full h-screen ">
          <aside className="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 hidden w-64 h-full pt-16  font-normal duration-75 lg:flex transition-width">
            <SilderMenu />
          </aside>
          <main className=" w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
            {children}
          </main>
        </div>
      </LoginWrapperProvider>
    </SessionProvider>
  );
}
