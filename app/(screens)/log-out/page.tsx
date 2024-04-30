"use client";

import SideNav from "@/components/side-comp/side-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import React from "react";

import sad from "@/public/assets/sad.png";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import TopNav from "@/components/side-comp/topNav";
import Link from "next/link";

const LogOut = () => {
  const router = useRouter();
  const onlogOut = () => {
    Cookies.remove("authToken");
    router.replace("/");
  };

  return (
    <main className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <div className="lg:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[96px] h-[60px] flex justify-end items-center bg-white shadow-md p-4 w-full">
          <TopNav />
        </div>
        <div className="h-screen flex justify-center items-center ">
          <div className="lg:w-[642px] w-5/6 flex justify-center flex-col gap-y-5 p-4 items-center h-auto bg-white shadow-md rounded-[8px]">
            <Image src={sad} alt="don't log out" />
            <p className="text-sm lg:text-lg text-center">
              Are you sure you want to log out?
            </p>
            <div className="flex flex-col md:flex-row gap-2 ">
              <Button className="bg-white rounded-[8px] py-4 px-6 text-sm border-2 border-solid border-[#3c9] hover:bg-main hover:text-white text-black">
                <Link href="/dashboard">Stay Logged In</Link>
              </Button>
              <Button
                onClick={onlogOut}
                className="bg-sub rounded-[8px] py-4 px-6 text-sm hover:bg-main hover:text-white text-black"
              >
                Yes, Log Out.
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LogOut;
