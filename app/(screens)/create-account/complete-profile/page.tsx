"use client";
import { useForm } from "react-hook-form";

import React from "react";
import Image from "next/image";

import logo from "../../../../public/assets/pistis_logo.png";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { nigerianStates } from "@/data";
import { MapPin } from "lucide-react";

import Fulllogo from "@/public/assets/full-logo.png";
import useFormStore from "@/store/create-account";
import { useRouter } from "next/navigation";

// const formSchema = z.object({
//   Fullname: z.string().min(2, {
//     message: "Input Full name",
//   }),
//   Phone: z.string().refine((value) => /^(\+)?\d+$/.test(value), {
//     message: "Phone number must be a number",
//   }),
//   location: z.string({
//     required_error: "Please select a location.",
//   }),
// });

const Completeprofile = () => {
  const formStore = useFormStore();
  const router = useRouter();
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     Fullname: formStore.Fullname,
  //     Phone: formStore.Phone,
  //     location: formStore.location,
  //   },
  // });

  const onSubmit = (e: any) => {
    e.preventDefault();
    const createAccountDetails = {
      email: formStore.email,
      password: formStore.password,
      confirm: formStore.confirm,
      Fullname: formStore.Fullname,
      Phone: Number(formStore.Phone),
      location: formStore.location,
    };

    console.log("Form Values", createAccountDetails);
  };

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
          <h1 className="md:text-4xl text-3xl font-semibold">
            Complete your profile
          </h1>
          <h3 className="md:text-2xl text-lg ">
            Please provide personal details
          </h3>
        </div>
        <div className="px-2 md:px-0">
          <form onSubmit={onSubmit} className="space-y-3">
            <div>
              <label className="md:text-xl text-sm font-medium">
                Full name
              </label>
              <input
                type="text"
                className="py-4 w-full indent-4 bg-[#FAFAFA] placeholder:text-[#4F5B67] rounded-[6px]"
                placeholder="Enter Full name"
                value={formStore.Fullname}
                onChange={(e) => formStore.setField("Fullname", e.target.value)}
              />
            </div>

            <div>
              <label className="md:text-xl text-sm font-medium">
                Phone number
              </label>
              <input
                className="py-4 w-full indent-4 bg-[#FAFAFA] placeholder:text-[#4F5B67] rounded-[6px]"
                placeholder="Input phone number"
                type="text"
                value={formStore.Phone}
                onChange={(e) => formStore.setField("Phone", e.target.value)}
              />
            </div>

            <div>
              <label className="md:text-xl text-sm font-medium">Location</label>
              <select
                className="py-4 w-full relative indent-4 bg-[#FAFAFA] placeholder:text-[#4F5B67] rounded-[6px]"
                value={formStore.location}
                onChange={(e) => formStore.setField("location", e.target.value)}
              >
                <option value="" disabled>
                  Select Location
                </option>
                {nigerianStates.map((single, index) => (
                  <option key={index} value={single}>
                    {single}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-[#33CC99] py-4 rounded-[8px] font-medium text-lg md:text-2xl text-black hover:text-white"
            >
              Proceed
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

export default Completeprofile;
