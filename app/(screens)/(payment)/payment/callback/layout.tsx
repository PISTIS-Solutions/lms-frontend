import type { Metadata } from "next";
import Image from "next/image";
import kelsey from "@/src/assets/kelsey.png";
import bg from "@/src/assets/forgot-bg.png";
import NavigationBar from "@/components/side-comp/nav";

export const metadata: Metadata = {
  title: "PayStack Payment Verification",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* <NavigationBar /> */}
      {children}
    </div>
  );
}
