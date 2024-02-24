"use client";

import SideNav from "@/components/side-comp/side-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import React from "react";

import sad from "@/public/assets/sad.png";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const LogOut = () => {
  const router = useRouter();
  const onlogOut = () => {
    Cookies.remove("authToken");
    console.log(Cookies.get("authToken"))
    router.replace("/");
  };

  return (
    <main className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <div className="md:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[96px] h-[60px] flex justify-end items-center bg-white shadow-md p-4 w-full">
          <div className="flex items-center gap-1 md:gap-2">
            <Avatar>
              {/* <AvatarImage src={avatar} /> */}
              <AvatarFallback>JN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="md:text-base text-sm font-medium">John Mark</h1>
              <p className="md:text-sm text-xs text-[#5D5B5B]">Student</p>
            </div>
          </div>
        </div>
        <div className="h-screen flex justify-center items-center ">
          <div className="lg:w-[642px] w-1/2 flex justify-center flex-col gap-y-5 p-4 items-center h-auto bg-white shadow-md rounded-[8px]">
            <Image src={sad} alt="don't log out" />
            <p className="text-sm lg:text-lg text-center">
              Are you sure you want to log out?
            </p>
            <div className="">
              <Button className="bg-[] rounded-[8px] mr-[43px] py-4 px-6 text-sm border-2 border-solid border-[#3c9] hover:bg-main hover:text-white text-black">
                Stay Logged In
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
