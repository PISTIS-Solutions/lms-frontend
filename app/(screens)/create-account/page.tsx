"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import logo from "../../../public/assets/pistis_logo.png";
import {
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  Loader2,
  Check,
  Info,
} from "lucide-react";
import Link from "next/link";
import useFormStore from "../../../store/create-account";

import Fulllogo from "@/public/assets/full-logo.png";
import bg from "@/public/assets/auth_bg.webp";
import google from "@/public/assets/svg/google.svg";
import { urls } from "@/utils/config";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Terms from "@/components/side-comp/terms";

const containsSpecialChars = "Password must contain special characters";
const differentPassword =
  "Password and Confirm password contains different characters";

const SignUp = () => {
  const formStore = useFormStore();
  const [specialCharacterErr, setSpecialCharacterErr] = useState();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string | undefined>(undefined);
  const [overlay, setOverlay] = useState(false);
  const handleOverlay = () => {
    setOverlay((prev) => !prev);
  };
  console.log(error);
  // const [modal, setModal] = useState<boolean>(false);
  const router = useRouter();
  //submit function
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formStore.password === formStore.confirm) {
      if (!containsSpecialCharacters(formStore.password)) {
        setError(containsSpecialChars);
        throw new Error("Password does not have special characters");
      } else {
        try {
          setLoading(true);
          const response = await fetch(urls.signup, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formStore.email,
              password: formStore.password,
              re_password: formStore.confirm,
            }),
          });

          if (response.ok) {
            // setModal(true);
            // router.push("/create-account/activate/[uid]");
            localStorage.setItem("email", formStore.email);
            toast.success("Check email for validation!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              theme: "dark",
            });
          } else {
            toast.error("This email address has been registered!", {
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
          if (error.message === containsSpecialChars) {
            setError(error.message);
          }
        } finally {
          setLoading(false);
        }
      }
    } else setError(differentPassword);
  };

  function containsSpecialCharacters(str: string): boolean {
    const specialCharacters = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/;
    return specialCharacters.test(str);
  }

  function checkPasswordEquality(value1: string, value2: string) {
    if (error) {
      if (value1 === value2) {
        if (containsSpecialCharacters(formStore.password)) setError(undefined);
        else setError(containsSpecialChars);
      } else setError(differentPassword);
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="lg:max-w-[75.4%] flex flex-col lg:my-6 w-full gap-y-6">
        <div className="block md:hidden w-full bg-main p-2">
          <Image src={Fulllogo} alt="logo" />
        </div>

        <div className="flex justify-between items-center gap-y-6 px-5">
          <div className="px-2 my-10 md:my-0 md:px-0">
            <h1 className="md:text-[32px] sm:text-2xl text-xl font-bold text-main">
              Create Account
            </h1>
            {/* TODO: change font */}
            <h3 className="text-[#828282]">Let’s get you started!</h3>
          </div>
          <Image
            src={logo}
            alt="pistis_logo"
            className="md:block hidden"
            priority
          />
        </div>

        {/* change font */}
        <button className="h-[50px] flex items-center justify-center outline-none rounded-lg border border-[#DADADA] bg-[#FAFAFA] text-[#666666] font-medium gap-x-2">
          <Image src={google} alt="google icon" />
          Continue with Google
        </button>

        <span className="before:absolute relative before:h-[1px] before:w-[45%] before:-left-0 text-center before:bg-[#BDBDBD] before:top-[45%] font-medium text-[#666666] after:absolute after:h-[1px] after:w-[45%] after:-right-0 after:bg-[#BDBDBD] after:top-[45%]">
          {/* TODO: change font */}
          or
        </span>

        {/* TODO: change font */}
        <form onSubmit={onSubmit} className="space-y-3 px-2 md:px-0">
          <div className="flex justify-between">
            <div className="w-[49%]">
              <label className="text-[#2E2E2E] mb-1 ">First Name</label>
              <div className="h-[50px] flex items-center bg-[#FAFAFA] px-[14px] gap-3 rounded-[6px] border border-[#DADADA]">
                <input
                  type="text"
                  name=""
                  id=""
                  className="outline-none bg-transparent  placeholder:text-[#9F9F9F] w-full"
                  placeholder="Enter your first name"
                  value={formStore.firstName}
                  onChange={(e) =>
                    formStore.setField("firstName", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="w-[49%]">
              <label className="text-[#2E2E2E] mb-1 ">Last Name</label>
              <div className="h-[50px] flex items-center bg-[#FAFAFA] px-[14px] gap-3 rounded-[6px] border border-[#DADADA]">
                <input
                  type="text"
                  name=""
                  id=""
                  className="outline-none bg-transparent  placeholder:text-[#9F9F9F] w-full"
                  placeholder="Enter your last name"
                  value={formStore.lastName}
                  onChange={(e) =>
                    formStore.setField("lastName", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[#2E2E2E] mb-1 ">Email Address</label>
            <div className="h-[50px] flex items-center bg-[#FAFAFA] px-[14px] gap-3 rounded-[6px] border border-[#DADADA]">
              <div className="border-[#DADADA] h-[70%] border-r-[1.5px] pr-3 items-center flex">
                <Mail className=" text-[#9F9F9F] h-5 w-5" />
              </div>
              <input
                type="email"
                name=""
                id=""
                className="outline-none bg-transparent  placeholder:text-[#9F9F9F] w-full"
                placeholder="example@gmail.com"
                value={formStore.email}
                onChange={(e) => formStore.setField("email", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-[#2E2E2E] mb-1 ">Phone Number</label>
            <div className="h-[50px] flex items-center bg-[#FAFAFA] px-[14px] gap-3 rounded-[6px] border border-[#DADADA]">
              <div className="border-[#DADADA] h-[70%] border-r-[1.5px] pr-3 items-center flex">
                <Mail className=" text-[#9F9F9F] h-5 w-5" />
              </div>
              <input
                type="number"
                name=""
                id=""
                className="outline-none bg-transparent  placeholder:text-[#9F9F9F] w-full"
                placeholder="123 456 7890"
                value={formStore.email}
                onChange={(e) => formStore.setField("email", e.target.value)}
              />
            </div>
            <span className="text-xs text-[#9F9F9F] flex items-center gap-x-[6px] mt-1">
              <Info className="text-[#9F9F9F] rotate-180 w-[14px] h-[14px]" />
              This number should be active on WhatsApp
            </span>
          </div>

          <div>
            <label className="text-[#2E2E2E] mb-1 ">Password</label>
            <div className="h-[50px] flex items-center bg-[#FAFAFA] px-[14px] gap-3 rounded-[6px] border border-[#DADADA]">
              <div className="border-[#DADADA] h-[70%] border-r-[1.5px] pr-3 items-center flex">
                <KeyRound className=" text-[#666666] h-5 w-5" />
              </div>

              <input
                type={formStore.showPassword ? "text" : "password"}
                placeholder="Password"
                value={formStore.password}
                onChange={(e) => {
                  formStore.setField("password", e.target.value);
                  checkPasswordEquality(e.target.value, formStore.confirm);
                }}
                className="outline-none bg-transparent  placeholder:text-[#9F9F9F] w-full"
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

          <div>
            <label className="text-[#2E2E2E] mb-1 ">Confirm Password</label>
            <div className="h-[50px] flex items-center bg-[#FAFAFA] px-[14px] gap-3 rounded-[6px] border border-[#DADADA]">
              <div className="border-[#DADADA] h-[70%] border-r-[1.5px] pr-3 items-center flex">
                <KeyRound className=" text-[#666666] h-5 w-5" />
              </div>

              <input
                type={formStore.showConfirmPassword ? "text" : "password"}
                className="outline-none bg-transparent  placeholder:text-[#9F9F9F] w-full"
                placeholder="Confirm Password"
                value={formStore.confirm}
                onChange={(e) => {
                  formStore.setField("confirm", e.target.value);
                  checkPasswordEquality(e.target.value, formStore.password);
                }}
              />
              <div className="hover:cursor-pointer">
                {formStore.showConfirmPassword ? (
                  <Eye
                    onClick={formStore.toggleConfirmPassword}
                    className=" text-[#666666] h-5 w-5"
                  />
                ) : (
                  <EyeOff
                    onClick={formStore.toggleConfirmPassword}
                    className=" text-[#666666] h-5 w-5"
                  />
                )}
              </div>
            </div>
            <span className="text-xs text-[#9F9F9F] flex items-center gap-x-[6px] mt-1">
              <Info className="text-[#9F9F9F] rotate-180 w-[14px] h-[14px]" />
              Password must contain special character
            </span>
          </div>

          {/* <p className="text-red-500 text-xs md:text-sm lg:text-base text-center">
              Password must contain special characters
            </p> */}
          <div className="relative !mt-0 pt-10">
            {error && (
              <p className="text-red-500 text-center absolute top-[12%] text-xs font-semibold">
                {error}
              </p>
            )}
            <button
              disabled={loading}
              type="submit"
              className="w-full  bg-main disabled:cursor-not-allowed disabled:bg-main/30 disabled:text-black/30 py-4 flex justify-center items-center rounded-[8px] font-medium hover:text-white h-[50px] text-white"
            >
              {loading ? (
                <Loader2 className="animate-spin text-white" />
              ) : (
                <>Sign Up</>
              )}
            </button>
          </div>
        </form>

        <p className="text-center font-medium text-sm md:text-base text-[#9F9F9F]">
          Already have an account?{" "}
          <Link className="text-main" href="/sign-in">
            Sign In
          </Link>
        </p>
      </div>

      {overlay && (
        <div className="absolute flex justify-center items-center h-screen w-full bg-slate-200/25 top-0 right-0">
          <Terms handleOverlay={handleOverlay} />
        </div>
      )}
    </>
  );
};

export default SignUp;
