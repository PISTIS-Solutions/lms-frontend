import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Favicon from "../public/favicon.ico";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });
const sp = localFont({
  src: [
    {
      path: "../public/fonts/SFProDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/SFProDisplay-Medium.woff2",
      weight: "500",
      style: "medium",
    },
  ],
  variable: "--font-sf-pro-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pistis Student",
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <Head>
        <link
          rel="preload"
          href="/fonts/SFProDisplay-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/SFProDisplay-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head> */}
      <body className={`${sp.variable} ${montserrat.className}`}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
