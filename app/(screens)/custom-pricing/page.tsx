"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2Icon, Search, ShoppingCart } from "lucide-react";

import pistis from "@/src/assets/full-logo.png";
import { useRouter } from "next-nprogress-bar";
import CustomCard from "@/components/side-comp/custom-card";
import useStudentsStore from "@/store/fetch-students-landing";

const CustomPayment = () => {
  const router = useRouter();
  const { students, fetchStudents, loading } = useStudentsStore();

  useEffect(() => {
    fetchStudents();
  }, []);
  return (
    <div className="bg-slate-50 h-[100%]">
      <div className="bg-main px-20 h-[98px] flex items-center justify-between">
        <Image src={pistis} className="md:w-auto w-5/6" alt="pistis" priority />
        <span className="relative w-1/3">
          <Search className="text-[#9F9F9F] absolute left-2 mt-3 w-5 h-5 font-normal" />
          <input
            type="text"
            className="bg-white rounded-[8px] py-3 w-full indent-8 placeholder:text-[#9F9F9F] text-sm font-normal"
            placeholder="Search for a preferred course"
          />
        </span>
        <span className=" md:flex hidden items-center gap-x-5">
          <Link href="/sign-in">
            <Button className="bg-sub py-[13px] hover:text-white px-[20px] text-lg text-black font-medium">
              Sign In
            </Button>
          </Link>

          <Link href="/pricing">
            <p className="text-lg hover:text-gray-200 text-white font-medium cursor-pointer">
              Create Account
            </p>
          </Link>
        </span>
      </div>

      <div className="px-20 ">
        <div className="flex py-5 items-center justify-between">
          <span
            onClick={() => router.back()}
            className="flex items-center gap-x-1 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
            <p className=" font-medium text-lg text-[#2E2E2E]">
              Available Courses
            </p>
          </span>
          <span>
            <button className="bg-sub cursor-pointer rounded-[6px] flex items-center justify-between gap-2 p-[16px_14px]">
              <span className="relative">
                <ShoppingCart className=" text-white w-6 h-6" />
                <p className="bg-[#FF0000] absolute top-0 -right-1 rounded-full flex items-center justify-center text-xs w-[14px] h-[14px] text-white font-medium">
                  5
                </p>
              </span>
              <p className="text-sm font-semibold text-white">Check Out</p>
            </button>
          </span>
        </div>

        <div className="grid grid-cols-3 justify-between gap-5">
          {loading ? (
            <span className="text-main w-full flex items-center justify-center">
              <Loader2Icon className="animate-spin" />
              <p className="text-lg text-center md:text-xl">Loading...</p>
            </span>
          ) : students?.course_details &&
            students?.course_details.length > 0 ? (
            students?.course_details.map((course: any, index: number) => {
              return (
                <CustomCard
                  key={course.id}
                  id={course.id}
                  index={index}
                  image={course.course_image}
                  header={course.title}
                  moduleCount={course.module_count}
                  duration={course.course_duration}
                />
              );
            })
          ) : (
            <p className="text-center w-full lg:text-xl font-semibold absolute text-main text-sm">
              No course available yet!
            </p>
          )}
        </div>
      </div>

      <div className="flex py-10 cursor-pointer justify-center">
        <button
          onClick={() => {
            router.push("/custom-pricing/order-summary");
          }}
          className="bg-sub rounded-[8px] py-4 text-[#2E2E2E] text-base font-medium w-1/3"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CustomPayment;
