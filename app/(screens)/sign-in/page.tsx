"use client";

import React, { useState } from "react";
import Image from "next/image";

import logo from "../../../public/assets/pistis_logo.png";
import { Eye, EyeOff, KeyRound, Loader2, Mail, Router } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next-nprogress-bar";
import useLoginFormStore from "@/store/sign-in-store";
import axios from "axios";
import { urls } from "@/utils/config";
import Cookies from "js-cookie";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Terms from "@/components/side-comp/terms";
import bg from "@/public/assets/auth_bg.webp";
import google from "@/public/assets/svg/google.svg";

const SignIn = () => {
  const formStore = useLoginFormStore();
  const route = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const onsubmitLogin = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!containsSpecialCharacters(formStore.password)) {
        throw new Error("Password must contain special characters");
      }
      const url = urls.signin;

      // Make the API request
      const response = await axios.post(url, {
        email: formStore.email,
        password: formStore.password,
      });

      if (response.status === 200) {
        Cookies.set("authToken", response.data.access, {
          sameSite: "None",
          secure: true,
        });

        Cookies.set("refreshToken", response.data.refresh, {
          sameSite: "None",
          secure: true,
        });
        Cookies.set("fullName", response.data.user.full_name, {
          sameSite: "None",
          secure: true,
        });
        Cookies.set("userId", response.data.user.id, {
          sameSite: "None",
          secure: true,
        });
        Cookies.set("subscription_status", response.data.user.status, {
          sameSite: "None",
          secure: true,
        });
        Cookies.set("pfp", response.data.user.profile_photo, {
          sameSite: "None",
          secure: true,
        });
        toast.success("Email and password accepted!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
        route.replace("/dashboard");
      }
    } catch (error: any) {
      if (error?.message === "Network Error") {
        toast.error("Check your network!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      } else if (
        error.response.data.detail ===
        "No active account found with the given credentials"
      ) {
        toast.error("Incorrect password or email!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      } else {
        toast.error(error?.response?.data?.detail, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  function containsSpecialCharacters(str: string): boolean {
    const specialCharacters = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/;
    return specialCharacters.test(str);
  }

  return (
    <main className=" bg-white min-h-screen w-full relative flex">
      <ToastContainer />

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
      <div className="flex justify-center  lg:w-[48.06%]  lg:overflow-auto">
        <div className="bg-white w-[100%] lg:w-[50%] h-screen rounded-none lg:rounded-tl-[40px] lg:rounded-bl-[40px] absolute right-0 flex flex-col gap-y-6 lg:gap-y-10 px-5  md:px-6 lg:px-10">
          <div className="">
            <div className="flex justify-end">
              <Image src={logo} alt="pistis_logo" className="" priority />
            </div>
            <div className="">
              <h1 className="text-main text-2xl md:text-[32px] font-bold">
                Welcome Back
              </h1>
              <h3 className="text-[#828282] text-sm md:text-base">
                Glad to have you back! Enter your details and jump right back
                in.
              </h3>
            </div>
          </div>

          {/* change font */}
          <button className="h-[50px] flex items-center justify-center outline-none rounded-lg border border-[#DADADA] bg-[#FAFAFA] hover:bg-[#E0E0E0] text-[#666666] font-medium gap-x-2">
            <Image src={google} alt="google icon" />
            Continue with Google
          </button>

          <span className="before:absolute relative before:h-[1px] before:w-[45%] before:-left-0 text-center before:bg-[#BDBDBD] before:top-[45%] font-medium text-[#666666] after:absolute after:h-[1px] after:w-[45%] after:-right-0 after:bg-[#BDBDBD] after:top-[45%]">
            {/* TODO: change font */}
            or
          </span>

          <div>
            {/* TODO: change font */}
            <form onSubmit={onsubmitLogin} className="space-y-2">
              <div>
                <label className="text-[#2E2E2E] mb-1 ">Email Address</label>
                <div className="h-[50px] flex items-center bg-[#FAFAFA] px-[14px] gap-3 rounded-[6px] border border-[#DADADA]">
                  <div className="border-[#DADADA] h-[70%] border-r-[1.5px] pr-3 items-center flex">
                    <Mail className=" text-[#9F9F9F] h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    className="outline-none bg-transparent  placeholder:text-[#9F9F9F] w-full"
                    placeholder="example@gmail.com"
                    value={formStore.email}
                    onChange={(e) =>
                      formStore.setField("email", e.target.value)
                    }
                  />
                </div>
              </div>
              <div>
                <label className="text-[#2E2E2E] mb-1 ">Password</label>
                <div className="h-[50px] flex items-center bg-[#FAFAFA] px-[14px] gap-3 rounded-[6px] border border-[#DADADA]">
                  <div className="border-[#DADADA] h-[70%] border-r-[1.5px] pr-3 items-center flex">
                    <KeyRound className=" text-[#666666] h-5 w-5" />
                  </div>

                  <input
                    type={formStore.showPassword ? "text" : "password"}
                    className="outline-none bg-transparent  placeholder:text-[#9F9F9F] w-full"
                    placeholder="Password"
                    value={formStore.password}
                    onChange={(e) =>
                      formStore.setField("password", e.target.value)
                    }
                  />

                  <div className="hover:cursor-pointer">
                    {formStore.showPassword ? (
                      <Eye
                        onClick={formStore.togglePassword}
                        className=" text-[#666666] h-5 w-5"
                      />
                    ) : (
                      <EyeOff
                        onClick={formStore.togglePassword}
                        className=" text-[#666666] h-5 w-5"
                      />
                    )}
                  </div>
                </div>
              </div>

              <p className="text-[#3E3E3E] text-xs md:text-sm text-right">
                <Link href="/sign-in/forgot-password">Forgot Password?</Link>
              </p>
              {!containsSpecialCharacters(formStore.password) && (
                <p className="text-red-500 text-xs md:text-sm lg:text-base text-center">
                  Password must contain special characters
                </p>
              )}
              <button
                disabled={loading}
                type="submit"
                className="w-full bg-main text-white py-4 flex justify-center items-center rounded-[8px] disabled:bg-main/30 disabled:text-white/30 font-medium !mt-8 lg:!mt-10"
              >
                {loading ? (
                  <Loader2 className="animate-spin text-white" />
                ) : (
                  <>Sign In</>
                )}
              </button>
            </form>
          </div>

          {/*TODO: change font */}
          <div>
            <p className="text-center font-medium text-sm md:text-base">
              Don't have an account?{" "}
              <Link className="text-main font-semibold" href="/pricing">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
