"use client";

import React from "react";
import Image from "next/image";

import logo from "../../../../public/assets/pistis_logo.png";
import envelope from "../../../../public/assets/enve.webp";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import Fulllogo from "@/public/assets/full-logo.png";

const VerifySuccess = () => {
  const router = useRouter();
  return (
    <div className="lg:max-w-[75.4%] flex flex-col lg:my-6 w-full gap-y-6">
      <div className="h-auto block md:hidden w-full bg-main p-2 ">
        <Image src={Fulllogo} alt="logo" />
      </div>
      <div className="flex justify-end">
        <Image
          src={logo}
          alt="pistis_logo"
          className="md:block hidden"
          priority
        />
      </div>
      <div className="">
        <div className="flex justify-center py-4 px-4  md:px-0">
          <Image
            src={envelope}
            alt="envelope"
            priority
            className="max-w-[168px]"
          />
        </div>
        <div className="lg:py-10 px-4  md:px-0">
          <h1 className="text-main text-2xl md:text-[32px] text-center font-semibold">
            Your mail has been verified
          </h1>
          {/* TODO: change font */}
          <h3 className=" py-5 md:py-0 text-center text-[#828282] text-sm md:text-base">
            We're thrilled to have you on board. Your decision to join us is a
            fantastic step towards the beginning of your success story
          </h3>
        </div>
      </div>
      <div>
        <div className="px-4 md:px-2">
          <Button
            onClick={() => {
              router.push("/sign-in");
            }}
            type="submit"
            className="w-full bg-main hover:bg-main/90 text-base text-white py-6 font-medium  "
          >
            Continue
          </Button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default VerifySuccess;
