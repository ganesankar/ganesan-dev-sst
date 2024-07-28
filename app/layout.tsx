import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Flowbite, ThemeModeScript, useThemeMode  } from "flowbite-react";

import Script from 'next/script';
import { flowbiteTheme } from "@/app/util/theme";

import SEO from "@/app/components/common/SEO";
import FooterAll from "@/app/components/common/FooterAll";
import "react-toastify/dist/ReactToastify.css";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });
import { seoData } from "@/app/util/content";


export const metadata: Metadata = {
  title: "Ganesan Karuppaiya",
  description: "Full Stack Lead Developer || UX Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
        <SEO {...seoData} />
      </head>
      <body className={`bg-gray-50 dark:bg-gray-900 ${inter.className}`}>
        <Flowbite theme={{ theme: flowbiteTheme }}>
          <main>{children}</main>
          <FooterAll />
        </Flowbite>
      </body>
    </html>
  );
}
