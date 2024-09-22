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
        <Script strategy="lazyOnload" id="clarity-script">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "jtwfhpce93");
        `}
      </Script>
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
