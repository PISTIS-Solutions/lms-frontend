import React from "react";
import Image from "next/image";

import logo from "@/public/assets/pistis_logo.png";
import enve from "@/public/assets/enve.png";

const verify_ForgotPassword = () => {
  return (
    <main className="bg-form-back h-screen w-full bg-no-repeat bg-cover relative">
      <div className="bg-white w-[100%] lg:w-[50%] h-screen rounded-none lg:rounded-tl-[40px] lg:rounded-bl-[40px] absolute right-0 px-10">
        <div className="">
          <Image
            src={logo}
            alt="pistis_logo"
            className="absolute right-5 top-3"
            priority
          />
        </div>
        <div className="flex flex-col h-[100vh] justify-center items-center gap-5">
          <Image src={enve} priority alt="success" />
          <div>
            <h1 className="lg:text-5xl md:text-3xl text-xl font-medium text-center">
              Check Your Mail
            </h1>
            <p className="text-center lg:text-xl text-sm md:text-lg pt-5 text-[#3E3E3E]">
              We have sent a reset link to your registered email address, kindly
              click on the link to reset password
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default verify_ForgotPassword;
