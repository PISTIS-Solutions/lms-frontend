"use client";

import React, { useState } from "react";
import Image from "next/image";

import logo from "@/public/assets/pistis_logo.png";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

import Fulllogo from "@/public/assets/full-logo.png";
import axios from "axios";

const Verify_SignUp = () => {
  const router = useRouter();
  const [response, setResponse] = useState<any>();
  const params = useParams<{ uid: string; token: string }>();

  // const handleVerifyToken = async () => {
  //   try {
  //     const url =
  //       "https://pistis-lms-backend.onrender.com/api/v1/auth/users/student/activation/";

  //     console.log("Sending request new...");

  //     const response = await axios.post(url, {
  //       uid: params.uid,
  //       token: params.token,
  //     });

  //     console.log("Response received:", response);

  //     setResponse(JSON.stringify(response.data, null, 2));
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // const handleVerifyToken = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post(
  //       "https://pistis-lms-backend.onrender.com/api/v1/auth/users/student/activation/",
  //       {
  //         uid: params.uid,
  //         token: params.token,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       console.log("Great response:", response.data);
  //       // Access response.data here for further processing
  //     }
  //   } catch (error: any) {
  //     console.log("Error:", error.message);
  //   }
  // };

  const handleVerifyToken = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://pistis-lms-backend.onrender.com/api/v1/auth/users/student/activation/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: params.uid,
            token: params.token,
          }),
        }
      );

      if (response.ok) {
        // setModal(true);
        console.log("successful");
        console.log("Great response");
      }
    } catch (error: any) {
      console.log(error.message);
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
          <h1 className="text-2xl text-center">
            A message has been sent to your email address, verify your account
            on your email
          </h1>
          <p>{params.uid}</p>
          <p>{params.token}</p>
        </div>
        <div>
          <Button onClick={handleVerifyToken}>Verify</Button>
        </div>
      </div>
    </main>
  );
};

export default Verify_SignUp;
