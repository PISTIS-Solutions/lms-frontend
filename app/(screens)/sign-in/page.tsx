"use client";

import React, { useState } from "react";
import Image from "next/image";

import logo from "@/src/assets/pistis_logo.png";
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
import bg from "@/src/assets/sign-in-bg.png";
import google from "@/src/assets/svg/google.svg";
import kim from "@/src/assets/kim.png";

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
      console.log(response);
      if (response.status === 200) {
        Cookies.set("authToken", response?.data?.access, {
          sameSite: "None",
          secure: true,
        });

        Cookies.set("refreshToken", response?.data?.refresh, {
          sameSite: "None",
          secure: true,
        });
        Cookies.set("firstName", response.data.user.first_name, {
          sameSite: "None",
          secure: true,
        });
        Cookies.set("lastName", response.data.user.last_name, {
          sameSite: "None",
          secure: true,
        });
        Cookies.set("userId", response.data.user.id, {
          sameSite: "None",
          secure: true,
        });
        // Cookies.set("subscription_status", response.data.user.status, {
        //   sameSite: "None",
        //   secure: true,
        // });
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
    <main className=" ">
      <ToastContainer />

      <div className="flex gap-5 justify-between">
        <div className="hidden md:block p-2 w-1/2 h-screen relative">
          <div className="relative mx-auto w-fit h-full ">
            <Image
              src={bg}
              alt="auth image"
              className=" object-fill w-full h-full"
            />
            <div className="w-[80%] p-3 bg-white/5 border-2 rounded-[20px] border-white absolute bottom-5 left-2 ">
              <p className="font-normal text-white text-sm">
                “The most powerful thing about DevOps is the way it encourages
                cross-team collaboration and learning. It breaks down silos and
                enables everyone to contribute to the entire lifecycle of
                software, from idea to production, fostering a culture of
                continuous improvement and innovation.”
              </p>
              <div className="flex items-center gap-2 my-2">
                <Image src={kim} alt="gene" />
                <p className="text-2xl font-semibold text-white">Gene Kim</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full md:w-1/2 overflow-y-scroll h-screen">
          <div className="bg-white w-[100%]  h-screen rounded-none lg:rounded-tl-[40px] lg:rounded-bl-[40px] flex flex-col gap-y-6 lg:gap-y-10 px-5  md:px-6 lg:px-10">
            <div className="">
              <div className="flex justify-end">
                <Image src={logo} alt="pistis_logo" className="" priority />
              </div>
              <div className="">
                <h1 className="text-main text-xl sm:text-2xl md:text-[32px] font-bold">
                  Welcome Back
                </h1>
                <h3 className="text-[#828282] text-xs sm:text-sm md:text-base">
                  Glad to have you back! Enter your details and jump right back
                  in.
                </h3>
              </div>
            </div>

            {/* change font */}
            <button className=" flex items-center py-2 justify-center sm:text-base text-sm outline-none rounded-lg border border-[#DADADA] bg-[#FAFAFA] hover:bg-[#E0E0E0] text-[#666666] font-medium gap-x-2">
              <Image src={google} alt="google icon" />
              Log in with Google
            </button>

            <span className="before:absolute relative before:h-[1px] before:w-[45%] before:-left-0 text-center before:bg-[#BDBDBD] before:top-[45%] font-medium text-[#666666] after:absolute after:h-[1px] after:w-[45%] after:-right-0 after:bg-[#BDBDBD] after:top-[45%]">
              {/* TODO: change font */}
              or
            </span>

            <div>
              {/* TODO: change font */}
              <form onSubmit={onsubmitLogin} className="space-y-2">
                <div>
                  <label className="text-[#2E2E2E] mb-1 sm:text-base text-sm">
                    Email Address
                  </label>
                  <div className="h-[50px] flex items-center bg-[#FAFAFA] px-[14px] gap-3 rounded-[6px] border border-[#DADADA]">
                    <div className="border-[#DADADA] h-[70%] border-r-[1.5px] pr-3 items-center flex">
                      <Mail className=" text-[#9F9F9F] h-5 w-5" />
                    </div>
                    <input
                      type="email"
                      className="outline-none bg-transparent sm:text-base text-sm placeholder:text-[#9F9F9F] w-full"
                      placeholder="example@gmail.com"
                      value={formStore.email}
                      onChange={(e) =>
                        formStore.setField("email", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[#2E2E2E] mb-1 sm:text-base text-sm">
                    Password
                  </label>
                  <div className="h-[50px] flex items-center bg-[#FAFAFA] px-[14px] gap-3 rounded-[6px] border border-[#DADADA]">
                    <div className="border-[#DADADA] h-[70%] border-r-[1.5px] pr-3 items-center flex">
                      <KeyRound className=" text-[#666666] h-5 w-5" />
                    </div>

                    <input
                      type={formStore.showPassword ? "text" : "password"}
                      className="outline-none sm:text-base text-sm bg-transparent  placeholder:text-[#9F9F9F] w-full"
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
                  className="w-full bg-main text-white py-4 flex justify-center items-center rounded-[8px] disabled:bg-main/30 disabled:text-white/30 font-medium !mt-3 lg:!mt-5"
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
              <p className="text-center font-medium text-sm my-2 md:text-base">
                Don't have an account?{" "}
                <Link className="text-main font-semibold" href="/pricing">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
