"use client";

import React, { useState } from "react";
import Image from "next/image";

import logo from "../../../public/assets/pistis_logo.png";
import { Eye, EyeOff, KeyRound, Loader2, Mail, Router } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useLoginFormStore from "@/store/sign-in-store";
import axios from "axios";
import { urls } from "@/utils/config";
import Cookies from "js-cookie";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Terms from "@/components/side-comp/terms";

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
    <main className="bg-form-back h-screen w-full bg-no-repeat bg-cover relative">
      <div className="bg-white w-[100%] lg:w-[50%] h-screen rounded-none lg:rounded-tl-[40px] lg:rounded-bl-[40px] absolute right-0 flex flex-col justify-around px-5  md:px-6 lg:px-10">
        <div className="flex justify-end">
          <Image src={logo} alt="pistis_logo" className="" priority />
        </div>
        <div className="">
          <h1 className="md:text-4xl sm:text-2xl text-xl font-semibold">
            Sign In
          </h1>
          <h3 className="md:text-2xl sm:text-lg text-base">
            Glad to have you back!
          </h3>
        </div>
        <ToastContainer />
        <div>
          <form onSubmit={onsubmitLogin} className="space-y-2">
            <div>
              <label className="text-[#3E3E3E] md:text-xl sm:text-base text-sm">
                Email Address
              </label>
              <div className="relative">
                <Mail className="mr-2 absolute md:top-5 top-4 text-[#4F5B67] left-3 h-5 w-5" />
                <input
                  type="email"
                  className="py-4 bg-[#FAFAFA] w-full text-xs md:text-base placeholder:text-[#4F5B67] rounded-[6px] indent-9"
                  placeholder="example@gmail.com"
                  value={formStore.email}
                  onChange={(e) => formStore.setField("email", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-[#3E3E3E] md:text-xl text-base sm:text-sm">
                Password
              </label>
              <div className="relative">
                <KeyRound className="mr-2 absolute md:top-5 top-4 text-[#4F5B67] left-3 h-5 w-5" />
                {formStore.showPassword ? (
                  <Eye
                    onClick={formStore.togglePassword}
                    className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                  />
                ) : (
                  <EyeOff
                    onClick={formStore.togglePassword}
                    className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                  />
                )}
                <input
                  type={formStore.showPassword ? "text" : "password"}
                  className="py-4 bg-[#FAFAFA] text-xs md:text-base  placeholder:text-[#4F5B67] rounded-[6px] indent-9 w-full"
                  placeholder="Password"
                  value={formStore.password}
                  onChange={(e) =>
                    formStore.setField("password", e.target.value)
                  }
                />
              </div>
            </div>

            <p className="text-[#3E3E3E] text-xs md:text-sm lg:text-base text-right">
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
              className="w-full bg-[#33CC99] py-4 flex justify-center items-center rounded-[8px] disabled:bg-sub/30 disabled:text-black/30 font-medium text-lg md:text-2xl text-black hover:text-white"
            >
              {loading ? (
                <Loader2 className="animate-spin text-white" />
              ) : (
                <>Sign In</>
              )}
            </button>
          </form>
        </div>
        <div>
          <p className="text-center font-medium text-sm md:text-xl">
            Don't have an account?{" "}
            <Link className="text-main font-semibold" href="/pricing">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
