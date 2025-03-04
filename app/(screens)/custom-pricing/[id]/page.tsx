"use client";
import React from "react";
import Image from "next/image";
import { ChevronLeft, Search, ShoppingCart } from "lucide-react";
import { MdOpenInNew } from "react-icons/md";
import { Button } from "@/components/ui/button";
import pistis from "@/src/assets/full-logo.png";
import Link from "next/link";
import { useRouter } from "next-nprogress-bar";
import customImg from "@/src/assets/customimg.png";
import note from "@/src/assets/svg/note.svg";
import timer from "@/src/assets/svg/timer.svg";
import rate from "@/src/assets/svg/rate.svg";

const CourseDetails = () => {
  const router = useRouter();
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
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChevronLeft onClick={() => router.back()} />
            <p className="text-[#2E2E2E] text-lg font-medium">Course Details</p>
          </div>
          <button className="bg-sub cursor-pointer rounded-[6px] flex items-center justify-between gap-2 p-[16px_14px]">
            <span className="relative">
              <ShoppingCart className=" text-white w-6 h-6" />
              <p className="bg-[#FF0000] absolute top-0 -right-1 rounded-full flex items-center justify-center text-xs w-[14px] h-[14px] text-white font-medium">
                5
              </p>
            </span>
            <p className="text-sm font-semibold text-white">Check Out</p>
          </button>
        </div>
        <div className="flex gap-5 my-5">
          <div className="w-[60%] bg-white shadow-lg p-2 rounded-[8px]">
            <Image
              alt="courseDetailImage"
              className="w-full h-[328px] "
              src={customImg}
            />
            <div>
              <h1 className="text-[#2E2E2E] font-semibold text-2xl py-2">
                Mastering DevOps Essentials
              </h1>
              <p className="text-[#666666] font-normal text-sm pt-3">
                In this essential course on mastering DevOps, you will delve
                into a comprehensive range of topics. From understanding the
                core principles to practical applications, you will learn how to
                streamline processes, enhance collaboration, and optimize
                workflows. Dive into automation, continuous integration, and
                deployment strategies to elevate your DevOps skills to the next
                level.
              </p>
              <div className="flex items-center justify-between py-5">
                <div className="flex items-center gap-x-[8px]">
                  <span className="bg-[#FAFAFA] rounded py-1 px-2 flex items-center justify-between">
                    <Image alt="note" src={note} className="w-4 h-4" />
                    <p className="text-[#484848] font-normal text-sm">
                      12 modules
                    </p>
                  </span>
                  <span className="bg-[#FAFAFA] rounded py-1 px-2 flex items-center justify-between">
                    <Image alt="note" src={timer} className="w-4 h-4" />
                    <p className="text-[#484848] font-normal text-sm">
                      85hr 43min
                    </p>
                  </span>
                </div>
                <div className="flex items-center gap-x-2">
                  <Image alt="rate" src={rate} className="w-4 h-4" />
                  <p className="text-[#484848] text-sm font-normal">
                    4.5 (163)
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3">
                <p className="text-[#484848] font-medium text-sm">Price:</p>
                <h1 className="text-[#484848] font-semibold text-3xl">
                  ₦428,000.00
                </h1>
              </div>
            </div>
            <div>
              <h1 className="text-[#2E2E2E] font-semibold text-lg py-4">
                Course Overview
              </h1>
              <p className="text-[#666666] font-normal text-base">
                Welcome to the Mastering DevOps Essentials course overview! In
                this course, you will learn about a wide range of topics
                including:
              </p>
              <ul className="text-[#666666] text-base font-normal list-inside px-4 flex flex-col gap-2 py-4 list-disc">
                <li>Duplicate Selection</li>
                <li>Duplicate Selection</li>
                <li>Duplicate Selection</li>
                <li>Duplicate Selection</li>
                <li>Duplicate Selection</li>
                <li>Duplicate Selection</li>
                <li>Duplicate Selection</li>
                <li>Duplicate Selection</li>
                <li>Duplicate Selection</li>
                <li>Duplicate Selection</li>
              </ul>
            </div>
          </div>
          <div className="w-[40%] bg-white shadow-lg p-2 rounded-[8px]">
            <h1 className="text-lg font-semibold text-[#2E2E2E] py-3">
              About Tutor
            </h1>
            <div className="bg-[#E6F6FF] rounded-[6px] p-3">
              <div>
                <div className="flex justify-between">
                  <Image
                    alt="tutorImg"
                    src={customImg}
                    className="w-24 h-24 rounded-full object-fill"
                  />
                  <MdOpenInNew className="text-[#484848] h-5 w-5 cursor-pointer" />
                </div>
                <h1 className="text-main font-semibold text-lg mt-3">
                  Alex Thompson
                </h1>
                <p className="text-[#666666] font-normal text-sm py-1">
                  Senior DevOps Engineer & Cloud Infrastructure Expert
                </p>
              </div>
              <p className="text-[#2E2E2E] text-base font-normal py-3 leading-relaxed">
                Alex Thompson is a highly skilled DevOps engineer with over a
                decade of experience in automating and optimizing cloud
                infrastructures. He has led DevOps teams at top tech firms,
                focusing on improving deployment pipelines, enhancing system
                reliability, and implementing robust CI/CD practices. Alex is a
                dedicated mentor, known for his ability to simplify complex
                DevOps concepts and tools, empowering his students to excel in
                dynamic tech environments.
              </p>
            </div>
            <div className="my-3">
              <h1 className="text-[#2E2E2E] font-semibold text-lg">
                Course Reviews
              </h1>
              <div>
                <p className="font-normal text-[#666666] text-base leading-relaxed my-2">
                  Alex, a seasoned DevOps professional with over a decade of
                  experience in optimizing cloud infrastructures. Alex has led
                  DevOps teams at top tech firms, focusing on improving
                  deployment processes, enhancing system reliability, and
                  implementing robust{" "}
                </p>
                <div className="flex items-center justify-between my-3">
                  <div className="flex items-center gap-2">
                    <Image alt="" src={customImg} className="w-8 h-8 rounded-full" />
                    <p className="text-base font-semibold text-[#484848]">
                      Alex Thompson
                    </p>
                    <div className=" h-1 w-1 rounded-full bg-[#2E2E2E]" />
                    <p className="text-[#666666] font-normal text-sm">
                      4 months ago
                    </p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <Image alt="rate" src={rate} className="w-4 h-4" />
                    <p className="text-[#484848] text-sm font-normal">4.5</p>
                  </div>
                </div>
              </div>
            </div>
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
    </div>
  );
};

export default CourseDetails;
