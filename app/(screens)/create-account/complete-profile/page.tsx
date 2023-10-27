"use client";

import React from "react";
import Image from "next/image";

import logo from "../../../../public/assets/pistis_logo.png";

import { useForm } from "react-hook-form";
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
// import { Separator } from "@/components/ui/separator";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { nigerianStates } from "@/data";
import { MapPin } from "lucide-react";

const formSchema = z.object({
  Fullname: z.string().min(2, {
    message: "Input Full name",
  }),
  Phone: z.string().refine((value) => /^(\+)?\d+$/.test(value), {
    message: "Phone number must be a number",
  }),
  location: z.string({
    required_error: "Please select a location.",
  }),
});

const completeProfile = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const phoneValue = Number(values.Phone);
    console.log(values);
  }

  return (
    <main className="bg-form-back h-screen w-full bg-no-repeat bg-cover relative">
      <div className="bg-white w-[50%] h-screen rounded-tl-[40px] rounded-bl-[40px] absolute right-0 flex flex-col justify-around px-10">
        <div className="flex justify-end">
          <Image src={logo} alt="pistis_logo" className="" priority />
        </div>
        <div className="">
          <h1 className="text-4xl font-semibold">Complete your profile</h1>
          <h3 className="text-2xl">Please provide personal details</h3>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="Fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-medium">
                      Full name
                    </FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          type="text"
                          className="py-6 bg-[#FAFAFA] placeholder:text-[#4F5B67] rounded-[6px]"
                          placeholder="Enter First name"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-medium">
                      Phone number
                    </FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          type="number"
                          className="py-6 bg-[#FAFAFA] placeholder:text-[#4F5B67] rounded-[6px]"
                          placeholder="+234"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-medium">
                      Location
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="py-6 relative indent-5 bg-[#FAFAFA] placeholder:text-[#4F5B67] rounded-[6px]">
                          <MapPin className="absolute top-4 text-[#4F5B67] w-[15px] h-[15px]" />
                          <SelectValue placeholder="Select Location" />
                        </SelectTrigger>
                      </FormControl>{" "}
                      <SelectContent className="h-[400px] overflow-y-scroll">
                        {nigerianStates.map((single, index) => {
                          return (
                            <SelectItem key={index} value={single}>
                              {single}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full mt-10 bg-[#33CC99] py-6 font-medium text-2xl text-black hover:text-white"
              >
                Proceed
              </Button>
            </form>
          </Form>
        </div>
        <div>
          <p className="text-center text-lg font-normal ">
            Already have an account? <Link href="/sign-in">Sign In</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default completeProfile;
