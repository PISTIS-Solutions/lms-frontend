import React from "react";
import Image from "next/image";

import logo from "@/public/assets/pistis_logo.png";
import enve from "@/public/assets/enve.webp";
// import bg from "@/public/assets/auth_bg.webp";
import kelsey from "@/public/assets/kelsey.png";
import bg from "@/public/assets/forgot-bg.png";

const verify_ForgotPassword = () => {
  return (
    <main className=" bg-white min-h-screen w-full relative flex">
      <div className="hidden md:block p-2 w-1/2 h-screen relative">
        <div className="relative mx-auto w-fit h-full ">
          <Image src={bg} alt="auth image" className=" object-fill  h-full" />
          <div className="w-[80%] p-3 bg-white/5 border-2 rounded-[20px] border-white absolute bottom-5 left-2 ">
            <p className="font-normal text-white text-sm">
              You don’t need to be an expert to start with DevOps. The key is a
              willingness to learn, collaborate, and embrace automation. Every
              small step you take towards improving your processes brings you
              closer to success.
            </p>
            <div className="flex items-center gap-2 my-2">
              <Image src={kelsey} alt="gene" />
              <p className="text-2xl font-semibold text-white">
                Kelsey Hightower
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center  lg:w-[48.06%]  lg:overflow-auto w-full">
        <div className="">
          <Image
            src={logo}
            alt="pistis_logo"
            className="absolute right-5 top-3 "
            priority
          />
        </div>
        <div className="flex flex-col h-[100vh] justify-center items-center gap-5  mx-3 md:mx-0">
          <Image src={enve} priority alt="success" className="max-w-[168px]" />
          <div>
            <h1 className="text-main text-2xl md:text-[32px] text-center font-semibold">
              Check your inbox
            </h1>
            <p className=" py-5 md:py-0 text-center text-[#828282] text-sm md:text-base">
              We’ve sent a reset link to your registered email address,
              <br /> Kindly click on the link to reset password.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default verify_ForgotPassword;
