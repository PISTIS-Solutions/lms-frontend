"use client";

import React, { useState } from "react";
import Image from "next/image";

import logo from "@/public/assets/pistis_logo.png";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

import Fulllogo from "@/public/assets/full-logo.png";
import axios from "axios";
import { Check, Loader2 } from "lucide-react";

const Verify_SignUp = () => {
  const router = useRouter();
  const [response, setResponse] = useState<object>();
  const [loading, setLoading] = useState<any>();
  const params = useParams<{ uid: string; token: string }>();

  const handleVerifyToken = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        "https://pistis-lms-backend.onrender.com/api/v1/auth/users/student/activation/",
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
      }
    } catch (error: any) {
      console.log("Error:", error.message);
    }
  };

  return (
    <main className="md:bg-form-back bg-white h-screen w-full bg-no-repeat bg-cover relative">
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
        {response && (
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
