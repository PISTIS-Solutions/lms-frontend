import React from "react";
import Image from "next/image";

import logo from "@/public/assets/pistis_logo.png";
import enve from "@/public/assets/enve.png";
import AuthImageContainer from "@/components/side-comp/auth-image-container";
import avatarImage from "@/public/assets/auth-image/kelsey.webp";
import createAccount from "@/public/assets/auth-image/create-account.webp";

const verify_ForgotPassword = () => {
  return (
    <main className="h-screen w-full flex relative">
      <AuthImageContainer
        avatarImage={avatarImage}
        avatarName="Kelsey Hightower"
        bgImg={createAccount}
        quote="“You don’t need to be an expert to start with DevOps. The key is a willingness to learn, collaborate, and embrace automation. Every small step you take towards improving your processes brings you closer to success.”"
      />
      <div className="bg-white w-[100%] lg:w-[50%] h-screen rounded-none lg:rounded-tl-[40px] lg:rounded-bl-[40px] px-10">
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
