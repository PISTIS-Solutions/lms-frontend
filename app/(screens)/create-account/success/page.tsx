"use client";

import React from "react";
import Image from "next/image";

import logo from "@/src/assets/pistis_logo.png";
import envelope from "@/src/assets/enve.png";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import Fulllogo from "@/src/assets/full-logo.png";
import verifyImage from "@/src/assets/auth-image/verification-success.webp";
import profilePic from "@/src/assets/auth-image/patrick.webp";
import AuthImageContainer from "@/components/side-comp/auth-image-container";

const VerifySuccess = () => {
  const router = useRouter();
  return (
    <main className=" bg-white h-screen w-full flex">
      <AuthImageContainer
        avatarImage={profilePic}
        avatarName="Patrick Debois"
        bgImg={verifyImage}
        quote="“You don’t need to be an expert to start with DevOps. The key is a willingness to learn, collaborate, and emDevOps is a journey, not a destination. The focus should always be on learning, experimenting, and improving with every iteration, no matter where you start.brace automation. Every small step you take towards improving your processes brings you closer to success.”"
      />
      <div className="bg-white w-full md:w-[50%] h-screen rounded-tl-[40px] rounded-bl-[40px] block md:flex flex-col justify-around px-0 md:px-10 xl:px-16">
        <div className="h-auto block md:hidden w-full bg-main p-2">
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
          <div className="flex justify-center py-4">
            <Image src={envelope} alt="enve" priority />
          </div>
          <div className="py-10 px-2 my-10 md:my-0 md:px-0">
            <h1 className="md:text-4xl text-3xl text-center font-semibold">
              Your mail has been verified
            </h1>
            <h3 className="md:text-2xl text-lg py-5 md:py-0 text-center">
              We're thrilled to have you on board. Your decision to join us is a
              fantastic step towards the beginning of your success story
            </h3>
          </div>
        </div>
        <div>
          <div className="px-2 md:px-2">
            <Button
              onClick={() => {
                router.push("/create-account/complete-profile");
              }}
              type="submit"
              className="w-full bg-[#33CC99] py-6 font-medium text-2xl text-black hover:text-white"
            >
              Continue
            </Button>
          </div>
        </div>
        <div></div>
      </div>
    </main>
  );
};

export default VerifySuccess;
