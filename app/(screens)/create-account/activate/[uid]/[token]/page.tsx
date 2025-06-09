"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import logo from "@/src/assets/pistis_logo.png";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

import Fulllogo from "@/src/assets/full-logo.png";
import axios from "axios";
import { Check, Loader2 } from "lucide-react";
import { urls } from "@/utils/config";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFormStore from "@/store/create-account";
import Link from "next/link";
import email from "@/src/assets/email.png";

const Verify_SignUp = () => {
  const router = useRouter();
  // const [response, setResponse] = useState<any>();
  const [loading, setLoading] = useState<any>();
  const params = useParams<{ uid: string; token: string }>();
  const uid = params.uid;
  const token = params.token;

  useEffect(() => {
    const handleVerifyToken = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          urls.activateEmail,
          {
            uid: uid,
            token: token,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          toast.success("Email Verified!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
          setLoading(false);
          localStorage.setItem("user_id", response.data.user_id);
          router.replace("/create-account/success");
        } else if (response.status === 403) {
          toast.error("Email already used!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
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

    handleVerifyToken();
  }, [token]);

  const formStore = useFormStore();

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
          <h1 className=" text-3xl text-center font-semibold">
            Verify your email
          </h1>
        </div>
        <div>
          <p className=" text-base py-2 font-semibold text-[#828282] text-center">
            We’ve sent a verification link to your email, kindly click on
            the link to activate account
          </p>
        </div>
        <div className="flex justify-center">
          {/* <Button
            disabled={loading}
            className="w-[95%] bg-[#33CC99] my-3 md:my-0 py-4 flex justify-center items-center rounded-[8px] font-medium text-lg md:text-2xl text-black hover:text-white"
            // onClick={handleVerifyToken}
          >
            {loading ? (
              <Loader2 className="animate-spin text-white" />
            ) : (
              <>Submit</>
            )}
          </Button> */}
        </div>
        <div>
          <Link href="/create-account/resendToken">
            <p className="md:text-right md:text-base text-center text-sm cursor-pointer text-main">
              Resend Token
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Verify_SignUp;
