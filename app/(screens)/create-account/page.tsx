"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import logo from "../../../public/assets/pistis_logo.png";
import { Mail, KeyRound, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import useFormStore from "../../../store/create-account";

import Fulllogo from "@/public/assets/full-logo.png";

const SignUp = () => {
  const formStore = useFormStore();
  //submit function
  const router = useRouter();

  const onSubmit = (e: any) => {
    e.preventDefault();
    try {
      if (formStore.password === formStore.confirm) {
        if (!containsSpecialCharacters(formStore.password)) {
          throw new Error("Password must contain special characters");
        }
        router.push("/create-account/verify");
      } else {
        throw new Error("Password and Confirm do not match");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  function containsSpecialCharacters(str: string): boolean {
    const specialCharacters = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/;
    return specialCharacters.test(str);
  }

  return (
    <main className="md:bg-form-back bg-white h-screen w-full bg-no-repeat bg-cover relative">
      <div className="bg-white w-full md:w-[50%] h-screen rounded-tl-[40px] rounded-bl-[40px] absolute right-0 block md:flex flex-col justify-around px-0 md:px-10">
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
          <h1 className="md:text-4xl text-3xl font-semibold">Create Account</h1>
          <h3 className="md:text-2xl text-lg ">Let’s get you started</h3>
        </div>
        <div className="px-2 md:px-0">
          <form onSubmit={onSubmit} className="space-y-3">
            <div className="relative">
              <Mail className="mr-2 absolute top-4 text-[#4F5B67] left-3 h-5 w-5" />
              <input
                type="email"
                className="py-4 bg-[#FAFAFA] w-full placeholder:text-[#4F5B67] rounded-[6px] indent-10"
                placeholder="example@gmail.com"
                value={formStore.email}
                onChange={(e) => formStore.setField("email", e.target.value)}
              />
            </div>

            <div className="relative">
              <KeyRound className="mr-2 absolute top-4 text-[#4F5B67] left-3 h-5 w-5" />
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
                className="py-4 bg-[#FAFAFA] placeholder:text-[#4F5B67] rounded-[6px] indent-10 w-full"
                placeholder="Password"
                value={formStore.password}
                onChange={(e) => formStore.setField("password", e.target.value)}
              />
            </div>

            <div className="relative">
              <KeyRound className="mr-2 absolute top-4 text-[#4F5B67] left-3 h-5 w-5" />
              {formStore.showConfirmPassword ? (
                <Eye
                  onClick={formStore.toggleConfirmPassword}
                  className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                />
              ) : (
                <EyeOff
                  onClick={formStore.toggleConfirmPassword}
                  className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                />
              )}
              <input
                type={formStore.showConfirmPassword ? "text" : "password"}
                className="py-4 w-full bg-[#FAFAFA] placeholder:text-[#4F5B67] rounded-[6px] indent-10"
                placeholder="Confirm Password"
                value={formStore.confirm}
                onChange={(e) => formStore.setField("confirm", e.target.value)}
              />
            </div>

            <p className="text-[#3E3E3E] text-xs md:text-base text-right">
              Password must contain special characters
            </p>

            <button
              type="submit"
              className="w-full bg-[#33CC99] py-4 rounded-[8px] font-medium text-lg md:text-2xl text-black hover:text-white"
            >
              Sign Up
            </button>
          </form>
        </div>
        <div>
          <p className="text-center text-sm absolute bottom-4 md:sticky w-full md:text-lg font-normal ">
            Already have an account? <Link href="/sign-in">Sign In</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
