"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ToastContainer, Slide } from "react-toastify";
import { useThemeMode } from "flowbite-react";

export default function FooterAll() {
  const pathName = usePathname();
  const { computedMode } = useThemeMode();
  return (
    <div className="p-2">
      
      <p className="text-center text-pretty font-normal  text-gray-400 text-sm pb-4">
        &copy; {new Date().getFullYear()} Ganesan Karuppaiya
      </p>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnHover
        theme={computedMode}
        transition={Slide}
      />
    </div>
  );
}
