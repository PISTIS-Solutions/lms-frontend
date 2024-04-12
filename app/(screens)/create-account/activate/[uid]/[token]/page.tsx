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
import useFormStore from "@/store/create-account";

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
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
          setLoading(false);
          console.log(response.data.user_id, "vri");
          localStorage.setItem("user_id", response.data.user_id);
          router.replace("/create-account/success");
        } else if (response.status === 403) {
          toast.error("Email already used!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
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
      } finally {
        setLoading(false);
      }
    };

    handleVerifyToken();
  }, [token]);

  const formStore = useFormStore();
  const resendToken = async (e: any) => {
    const email = localStorage.getItem("email");
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        urls.resendToken,
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 204) {
        // setResponse(response.data);
        setLoading(false);
        toast.success("Check email for new tokeen", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
        // router.replace("/create-account/success");
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
      } else if (error.response.data.email[0] === "Email does not Exist ") {
        toast.error("Email address is invalid", {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="md:bg-form-back bg-white h-screen w-full bg-no-repeat bg-cover relative">
      <ToastContainer />
      <div className="bg-white w-full lg:w-[50%] h-screen rounded-tl-[40px] rounded-bl-[40px] absolute right-0 block md:flex flex-col  px-0 md:px-10">
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
          <h1 className="md:text-4xl text-xl text-center py-5 font-semibold">
            Verify Account
          </h1>
        </div>
        <div>
          <h1 className=" md:text-2xl text-base py-2 md:py-10 text-center">
            A message was sent to your email address, click "Verify" button to
            verify your account.
          </h1>
        </div>
        <div className="flex justify-center">
          <Button
            disabled={loading}
            className="w-[95%] bg-[#33CC99] my-3 md:my-0 py-4 flex justify-center items-center rounded-[8px] font-medium text-lg md:text-2xl text-black hover:text-white"
            // onClick={handleVerifyToken}
          >
            {loading ? (
              <Loader2 className="animate-spin text-white" />
            ) : (
              <>Submit</>
            )}
          </Button>
        </div>
        <div>
          <p
            onClick={(e) => {
              resendToken(e);
            }}
            className="md:text-right md:text-base text-center text-sm cursor-pointer text-main"
          >
            Resend Token
          </p>
        </div>
        {/* {response?.is_active && (
          <div className="flex justify-end py-2 gap-x-2">
            <Check className="text-green-500" />
            <p>Verified</p>
          </div>
        )} */}
      </div>
    </main>
  );
};

export default Verify_SignUp;
