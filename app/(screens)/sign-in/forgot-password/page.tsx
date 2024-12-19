"use client";
import React, { useState } from "react";
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, KeyRound, Loader2Icon, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
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
    <main className="h-screen w-full flex">
      <ToastContainer />
      <AuthImageContainer
        avatarImage={avatarImage}
        avatarName="Kelsey Hightower"
        bgImg={createAccount}
        quote="“You don’t need to be an expert to start with DevOps. The key is a willingness to learn, collaborate, and embrace automation. Every small step you take towards improving your processes brings you closer to success.”"
      />
      <div className="bg-white w-[100%] lg:w-[50%] h-screen rounded-none lg:rounded-tl-[40px] lg:rounded-bl-[40px] flex flex-col justify-around px-5  md:px-6 lg:px-10 xl:px-16">
        <div className="flex justify-end">
          <Image src={logo} alt="pistis_logo" className="" priority />
        </div>
        <div className="">
          <h1 className="md:text-4xl sm:text-2xl text-xl font-semibold">
            Forgot Password?
          </h1>
          <h3 className="md:text-2xl sm:text-lg text-base">
            Please provide your registered email address
          </h3>
        </div>
        <div className="flex flex-col">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="Email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-xl text-lg font-medium">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="mr-2 absolute top-4 text-[#4F5B67] left-3 h-5 w-5" />
                        <Input
                          type="email"
                          className="py-6 bg-[#FAFAFA] placeholder:text-[#4F5B67] mb-10 rounded-[6px] indent-6"
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
                className="w-full disabled:cursor-not-allowed disabled:bg-sub/20 mt-10 bg-[#33CC99] py-6 font-medium text-sm md:text-xl lg:text-2xl text-black hover:text-white"
              >
                {loading ? <Loader2Icon className="animate-spin" /> : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
