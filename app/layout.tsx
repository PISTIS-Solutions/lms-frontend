import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Favicon from "../public/favicon.ico";
import { ToastContainer } from "react-toastify";
import localFont from "next/font/local";
import "react-toastify/dist/ReactToastify.css";

const montserrat = Montserrat({ subsets: ["latin"] });

const sp = localFont({
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
      <body className={`${sp.variable} ${montserrat.className}`}>
        {/* <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={false}
          draggable={false}
          theme="dark"
        /> */}
        {children}
      </body>
    </html>
  );
}
