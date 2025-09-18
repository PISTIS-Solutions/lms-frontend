"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import pistis from "@/src/assets/full-logo.png";
import { Button } from "@/components/ui/button";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="bg-main px-5 sm:px-7 md:px-10 py-5 flex items-center justify-between">
        <Image
          src={pistis}
          alt="Pistis Logo"
          className="md:w-auto w-1/3"
          priority
        />

        {/* <nav className="flex items-center gap-x-2 sm:gap-x-5">
          <Link href="/sign-in">
            <Button className="bg-sub py-2 px-3 sm:py-[13px] sm:px-[20px] text-sm sm:text-lg font-medium text-black hover:text-white">
              Sign In
            </Button>
          </Link>

          <Link href="/create-account">
            <span className="text-sm sm:text-lg font-medium text-white hover:text-gray-200 cursor-pointer">
              Create Account
            </span>
          </Link>
        </nav> */}
      </header>

      <main>{children}</main>
    </div>
  );
}
