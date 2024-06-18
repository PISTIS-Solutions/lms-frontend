"use client";
import React, { useState } from "react";
import Image from "next/image";
import pistis from "@/public/assets/full-logo.png";
import Link from "next/link";
import x from "@/public/assets/socials/x.png";
import fb from "@/public/assets/socials/fb.png";
import insta from "@/public/assets/socials/insta.png";
import link from "@/public/assets/socials/in.png";
import { Loader } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { urls } from "@/utils/config";

const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const addToWaitlist = async (e: any) => {
    e.preventDefault();
    if (email !== "") {
      try {
        setLoading(true);
        const response = await axios.post(urls.waitList, { email });
        if (response.status === 201) {
          toast.success("Email added to waitlist!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
          setEmail("");
        }
      } catch (error: any) {
        console.log(error, "error");
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
        } else if (error?.response?.data?.email[0]) {
          toast.error("Email already exists on waitlist!", {
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
    }
  };
  return (
    <div>
      <ToastContainer />
      <nav className="md:h-24 fixed w-full z-[1000] h-[37px] md:py-0 py-10 bg-main flex items-center justify-between px-5 md:px-10">
        <Link href="/">
          <Image
            src={pistis}
            className="md:w-auto w-5/6"
            alt="pistis"
            priority
          />
        </Link>
      </nav>
      <div className="bg-waitBack w-full h-[100vh] flex flex-col gap-y-2 justify-center items-center bg-cover bg-no-repeat">
        <div className="md:w-1/2 w-5/6 h-[385px] p-5 flex flex-col justify-center items-center gap-y-10 bg-[#FFFFFF33] backdrop-blur-md bg-opacity-60 border border-white rounded-[40px] relative">
          <div className="text-white flex flex-col items-center">
            <h1 className="font-medium text-2xl md:text-4xl">
              Join our waitlist!
            </h1>
            <p className="font-normal text-sm md:text-md w-full md:w-4/6 text-center py-3">
              Sign up for our newsletter to receive the latest updates and
              insights straight to your inbox.
            </p>
          </div>
          <form className="md:flex block w-full gap-x-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email here"
              className="text-[#2E2E2E] placeholder:text-[#2E2E2E] bg-white py-3 px-4 rounded-[30px] w-full md:w-[79%]"
            />
            <button
              disabled={loading}
              onClick={addToWaitlist}
              className="bg-sub text-main font-medium text-md md:w-auto w-full md:my-0 my-2 rounded-[30px] py-3 px-4 hover:bg-main hover:text-white"
            >
              {loading ? <Loader className="animate-spin" /> : "Join Waitlist"}
            </button>
          </form>
        </div>
        <div className="flex items-center gap-x-2 md:gap-x-5">
          <a href="https://x.com/pististechub?s=21" target="_blank">
            <div className="w-[48px] h-[48px] p-1 flex flex-col justify-center items-center bg-[#FFFFFF33] backdrop-blur-md bg-opacity-60 border border-white rounded-[8px] relative">
              <Image src={x} alt="x" />
            </div>
          </a>
          <a
            href="https://www.facebook.com/share/iDufou6CkYC3KWL7/?mibextid=LQQJ4d"
            target="_blank"
          >
            <div className="w-[48px] h-[48px] p-1 flex flex-col justify-center items-center bg-[#FFFFFF33] backdrop-blur-md bg-opacity-60 border border-white rounded-[8px] relative">
              <Image src={fb} alt="x" />
            </div>
          </a>
          <a
            href="https://www.instagram.com/pististechub?igsh=MW0zMDJ4dzg1emV5bA=="
            target="_blank"
          >
            <div className="w-[48px] h-[48px] p-1 flex flex-col justify-center items-center bg-[#FFFFFF33] backdrop-blur-md bg-opacity-60 border border-white rounded-[8px] relative">
              <Image src={insta} alt="x" />
            </div>
          </a>
          <a
            href="https://www.linkedin.com/in/pistis-solutions-163049314/"
            target="_blank"
          >
            <div className="w-[48px] h-[48px] p-1 flex flex-col justify-center items-center bg-[#FFFFFF33] backdrop-blur-md bg-opacity-60 border border-white rounded-[8px] relative">
              <Image src={link} alt="x" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Waitlist;
