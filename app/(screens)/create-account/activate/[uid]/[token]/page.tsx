"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import logo from "@/public/assets/pistis_logo.png";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

import Fulllogo from "@/public/assets/full-logo.png";
import axios from "axios";
import { Check, Loader2 } from "lucide-react";
import { urls } from "@/utils/config";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Verify_SignUp = () => {
  const router = useRouter();
  const [response, setResponse] = useState<any>();
  const [loading, setLoading] = useState<any>();
  const [used, setUsed] = useState<string>();
  const params = useParams<{ uid: string; token: string }>();

  const handleVerifyToken = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        urls.activateEmail,
        {
          uid: params.uid,
          token: params.token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setResponse(response.data);
        setLoading(false);
        localStorage.setItem("user_id", response.data.user_id);
        router.replace("/create-account/success");
      }
      if (response.status === 403) {
        setUsed("Email already verified");
      }
    } catch (error: any) {
      if (error?.message === "Network Error") {
        toast.error("Check your network!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      } else {
        toast.error(error?.response?.data?.detail, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      }
    }
  };

  const [reloaded, setReloaded] = useState(false);

  useEffect(() => {
    if (!reloaded) {
      window.location.reload();
      setReloaded(true);
    }
  }, [reloaded]);

  return (
    <main className="md:bg-form-back bg-white h-screen w-full bg-no-repeat bg-cover relative">
      <ToastContainer />
      <div className="bg-white w-full md:w-[50%] h-screen rounded-tl-[40px] rounded-bl-[40px] absolute right-0 block md:flex flex-col  px-0 md:px-10">
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
        <div className="px-2 my-10 md:my-0 md:px-0">
          <h1 className="md:text-4xl text-3xl text-center py-5 font-semibold">
            Verify Account
          </h1>
        </div>
        <div>
          <h1 className="text-2xl py-10 text-center">
            A message was sent to your email address, click "Verify" button to
            verify your account.
          </h1>
        </div>
        <div>
          <Button
            disabled={loading}
            className="w-full bg-[#33CC99] py-4 flex justify-center items-center rounded-[8px] font-medium text-lg md:text-2xl text-black hover:text-white"
            onClick={handleVerifyToken}
          >
            {loading ? (
              <Loader2 className="animate-spin text-white" />
            ) : (
              <>Submit</>
            )}
          </Button>
        </div>
        {used && (
          <div>
            <p className="text-right text-red-500">Email Already Verified</p>
          </div>
        )}
        {response?.is_active && (
          <div className="flex justify-end py-2 gap-x-2">
            <Check className="text-green-500" />
            <p>Verified</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Verify_SignUp;
