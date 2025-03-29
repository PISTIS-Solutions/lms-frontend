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

const GoogleAuthSignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = window.location.href;

      const match = url.match(/access_token=([^&]+)/);
      const accessToken = match ? match[1] : null;

      if (accessToken) {
        setLoading(true);
        Cookies.set("authToken", accessToken, {
          secure: true,
          sameSite: "None",
          path: "/",
        });

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
          router.push("/login");
        }, 2000);
      }
    }
  }, [router]);

  return (
    <>
      <ToastContainer />
      <div className="lg:max-w-[75.4%] flex flex-col lg:my-6 w-full gap-y-6">
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
        <div className="px-2 my-2 md:my-0 md:px-0">
          <Image src={email} alt="verify" className="mx-auto" />
          <h1 className="text-3xl text-center font-semibold">Google Sign Up</h1>
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
    </>
  );
};

export default GoogleAuthSignUp;
