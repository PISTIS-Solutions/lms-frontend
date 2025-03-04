import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Favicon from "../public/favicon.ico";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import Providers from "@/components/side-comp/ProgressBarProvider";

const montserrat = Montserrat({ subsets: ["latin"], display: "auto" });
const SFProDisplay = localFont({
  src: [
    {
      path: "../public/fonts/FontsFree-Net-SFProDisplay-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/FontsFree-Net-SFProDisplay-Medium.ttf",
      weight: "500",
      style: "medium",
    },
  ],
  variable: "--font-sf-pro-display",
});
const digitalNumbers = localFont({
  src: [
    {
      path: "../public/fonts/DigitalNumbers-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-DigitalNumbers",
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
      <body className={montserrat.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
