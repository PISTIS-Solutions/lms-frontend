import type { Metadata } from "next";
import "./globals.css";
import Favicon from "../public/favicon.ico";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Providers from "@/components/side-comp/ProgressBarProvider";

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
      <body
        className={`${digitalNumbers.variable} ${SFProDisplay.variable} `}
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        <Providers>{children}</Providers>
        <ToastContainer position="top-right" autoClose={5000} />
      </body>
    </html>
  );
}
