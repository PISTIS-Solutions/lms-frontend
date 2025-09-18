"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

import logo from "@/src/assets/pistis_logo.png";
import Fulllogo from "@/src/assets/full-logo.png";
import email from "@/src/assets/email.png";
import { Loader } from "lucide-react";

import bg from "@/src/assets/sign-in-bg.png";
import kim from "@/src/assets/kim.png";

const GoogleAuthSignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);

      const accessToken = url.searchParams.get("access_token");
      const refreshToken = url.searchParams.get("refresh_token");
      const firstLogin = url.searchParams.get("first_login");
      const isCertified = url.searchParams.get("is_certified");
      const userId = url.searchParams.get("user_id");
      const status = url.searchParams.get("subscription_status");
      const auto_renew = url.searchParams.get("auto_renew");

      if (accessToken) {
        setLoading(true);

        Cookies.set("authToken", accessToken, {
          secure: true,
          sameSite: "None",
          path: "/",
        });

        if (refreshToken) {
          Cookies.set("refreshToken", refreshToken, {
            secure: true,
            sameSite: "None",
            path: "/",
          });
        }

        if (firstLogin !== null) {
          Cookies.set("first_login", firstLogin, {
            secure: true,
            sameSite: "None",
            path: "/",
          });
        }

        if (isCertified !== null) {
          Cookies.set("cert", isCertified, {
            secure: true,
            sameSite: "None",
            path: "/",
          });
        }
        if (userId !== null) {
          Cookies.set("user_id", userId, {
            secure: true,
            sameSite: "None",
            path: "/",
          });
        }
        if (status !== null) {
          Cookies.set("status", status, {
            secure: true,
            sameSite: "None",
            path: "/",
          });
        }
        if (auto_renew !== null) {
          Cookies.set("auto_renew", auto_renew, {
            secure: true,
            sameSite: "None",
            path: "/",
          });
        }

        toast.success("Google authentication successful!", {
          position: "top-right",
          autoClose: 3000,
          onClose: () => router.push("/dashboard"),
        });

        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        toast.error("Google authentication error!", {
          position: "top-right",
          autoClose: 5000,
        });

        setTimeout(() => {
          router.push("/sign-in");
        }, 2000);
      }
    }
  }, [router]);

  return (
    <>
      <ToastContainer />
      <div className="flex gap-2 justify-between">
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
        <div className="md:w-1/2 w-full h-screen">
          <div className="h-auto block md:hidden w-full bg-main p-2">
            <Image src={Fulllogo} alt="logo" />
          </div>
          <div className="flex absolute top-2 right-2 justify-end">
            <Image
              src={logo}
              alt="pistis_logo"
              className="md:block hidden"
              priority
            />
          </div>
          <div className="flex flex-col h-screen justify-center items-center">
            <div className="px-2 my-2 md:my-0 md:px-0">
              <Image src={email} alt="verify" className="mx-auto" />
              <h1 className="text-3xl text-center font-semibold">
                Google Sign Up
              </h1>
            </div>
            <div>
              <p className="text-base py-2 font-semibold text-[#828282] text-center">
                Google Sign Up Authenticating, Please wait...
              </p>
              {loading && (
                <div className="flex justify-center items-center w-full text-main">
                  <Loader className="animate-spin" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoogleAuthSignUp;
