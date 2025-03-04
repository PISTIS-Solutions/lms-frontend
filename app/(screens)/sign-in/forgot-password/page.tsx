"use client";
import React, { useState } from "react";
import Image from "next/image";

import logo from "../../../../public/assets/pistis_logo.png";
import bg from "@/public/assets/forgot-bg.png";
import kelsey from "@/public/assets/kelsey.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, KeyRound, Loader2Icon, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next-nprogress-bar";
import axios from "axios";
import { urls } from "@/utils/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import avatarImage from "@/public/assets/auth-image/kelsey.webp";
import createAccount from "@/public/assets/auth-image/create-account.webp";
import AuthImageContainer from "@/components/side-comp/auth-image-container";

const formSchema = z.object({
  Email: z.string().min(2, {
    message: "Input a valid email address",
  }),
});

const ForgotPassword = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: "",
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>, e: any) => {
    e.preventDefault();
    const email = values.Email;
    try {
      setLoading(true);
      const url = urls.forgotPassword;
      const response = await axios.post(url, { email: email });

      if (response.status === 204) {
        router.push("/sign-in/forgot-password/verify");
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      if (error.response.data.email[0] === "Email does not Exist ") {
        toast.error("Email address is invalid", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      } else if (error?.message === "Network Error") {
        toast.error("Check your network!", {
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

  return (
    <main className=" bg-white w-full relative flex ">
      <div className="hidden md:block p-2 w-1/2 h-screen relative">
        <div className="relative mx-auto w-fit h-full ">
          <Image src={bg} alt="auth image" className=" object-fill  h-full" />
          <div className="w-[80%] p-3 bg-white/5 border-2 rounded-[20px] border-white absolute bottom-5 left-2 ">
            <p className="font-normal text-white text-sm">
              “The most powerful thing about DevOps is the way it encourages
              cross-team collaboration and learning. It breaks down silos and
              enables everyone to contribute to the entire lifecycle of
              software, from idea to production, fostering a culture of
              continuous improvement and innovation.”
            </p>
            <div className="flex items-center gap-2 my-2">
              <Image src={kelsey} alt="gene" />
              <p className="text-2xl font-semibold text-white">Gene Kim</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full md:w-1/2 justify-center px-4 lg:px-0">
        <div className=" flex-col gap-y-6  flex">
          <ToastContainer />
          <div className="flex justify-end">
            <Image src={logo} alt="pistis_logo" className="" priority />
          </div>
          <div className="">
            <h1 className="text-2xl md:text-[32px] text-main  font-bold">
              Forgot Password?
            </h1>
            <h3 className="text-[#828282] text-sm md:text-base">
              Please provide your registered email address
            </h3>
          </div>
          <div className="flex flex-col">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-10"
              >
                <FormField
                  control={form.control}
                  name="Email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#2E2E2E] mb-1">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="h-[50px] flex items-center bg-[#FAFAFA] px-[14px] gap-3 rounded-[6px] border border-[#DADADA]">
                          <div className="border-[#DADADA] h-[70%] border-r-[1.5px] pr-3 items-center flex">
                            <Mail className=" text-[#9F9F9F] h-5 w-5" />
                          </div>
                          <Input
                            type="email"
                            className="outline-none bg-transparent  placeholder:text-[#9F9F9F] w-full border-0"
                            placeholder="example@gmail.com"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={loading}
                  type="submit"
                  className="w-full disabled:cursor-not-allowed disabled:bg-main/20 mt-10 bg-main py-6 font-medium  hover:bg-main/90  rounded-[8px]"
                >
                  {loading ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
