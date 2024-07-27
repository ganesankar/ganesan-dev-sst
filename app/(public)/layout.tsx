"use client";
import React from "react";
import Header from "@/app/components/common/HeaderMenu";
import FooterClient from "@/app/components/common/FooterClient";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div >{children}</div>
      <FooterClient />
    </>
  );
}
