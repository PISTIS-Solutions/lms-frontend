import React from "react";
import Image from "next/image";

import logo from "@/public/assets/pistis_logo.png";
import enve from "@/public/assets/enve.webp";
import bg from "@/public/assets/auth_bg.webp";

const verify_ForgotPassword = () => {
  return (
    <main className=" bg-white min-h-screen w-full relative flex">
      <div className="hidden h-full lg:block    lg:p-10 lg:pr-0 lg:w-[51.9%] sticky top-0 lg:h-screen">
        <div className="relative mx-auto w-fit h-full ">
          <Image
            src={bg}
            alt="auth image"
            className="object-contain  2xl:max-w-[708px] h-full"
          />
          <div className="absolute bottom-0 text-white  m-10 max-w-[80%] px-6 border-l-2 border-white">
            <p className="font-semibold text-[32px] leading-[38.4px] mb-2">
              Ipsum list layout align italic component project thumb
            </p>
            {/* TODO: change font */}
            <p className="">
              Outline share italic underline clip. Frame invite export vertical
              select device. Underline ellipse outline figma follower. Undo
              selection select arrow share prototype component list. Arrow undo
              scale prototype boolean.Outline share italic underline clip. Frame
              invite export vertical select device.{" "}
            </p>
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
              Check Your Mail
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
