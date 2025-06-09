"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next-nprogress-bar";

import { ChevronLeft, Info, Search } from "lucide-react";
import { FaLock } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { AiTwotoneDelete } from "react-icons/ai";

import note from "@/src/assets/svg/note.svg";
import timer from "@/src/assets/svg/timer.svg";
import pistis from "@/src/assets/full-logo.png";

const OrderSummary = () => {
  const router = useRouter();
  const carts = [
    {
      title:
        "Introduction to DevOps Practices Mastering Continuous Integration",
      price: "₦428,000.00",
    },
    {
      title:
        "Introduction to DevOps Practices Mastering Continuous Integration",
      price: "₦428,000.00",
    },
    {
      title:
        "Introduction to DevOps Practices Mastering Continuous Integration",
      price: "₦428,000.00",
    },
    {
      title:
        "Introduction to DevOps Practices Mastering Continuous Integration",
      price: "₦428,000.00",
    },
    {
      title:
        "Introduction to DevOps Practices Mastering Continuous Integration",
      price: "₦428,000.00",
    },
    {
      title:
        "Introduction to DevOps Practices Mastering Continuous Integration",
      price: "₦428,000.00",
    },
  ];
  const inputs = [
    {
      name: "full_name",
      label: "Full Name",
    },
    {
      name: "email",
      label: "Email Address",
    },
  ];
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
      <div className="p-5 flex justify-between gap-5">
        <div className="bg-main rounded-[16px] w-[60%] overflow-y-scroll h-screen p-10">
          <div className="flex items-center gap-5 text-white">
            <span onClick={() => router.back()} className="cursor-pointer">
              <ChevronLeft className="w-6 h-6" />
            </span>
            <p className=" font-medium text-2xl">
              Order Summary{" "}
              <span className="text-[#2FBC8D] font-semibold text-lg">(8)</span>
            </p>
          </div>
          <div>
            <p className="font-medium text-base text-white text-center pt-2">
              Total payment
            </p>
            <h1 className="font-semibold text-5xl text-white text-center py-3">
              ₦428,000.00
            </h1>
            <div className="flex items-center gap-2 justify-center my-3">
              <FaLock className=" w-6 h-6 text-[#2FBC8D]" />
              <p className="font-medium text-base text-white text-center">
                Secure Payment
              </p>
            </div>
          </div>
          <hr className="my-5" />
          <div className="w-full flex justify-center">
            <div className="bg-[#FFFFFF1A] rounded-[8px] w-[80%]">
              {carts.map((cart, index) => {
                const id = 1;
                return (
                  <>
                    <div
                      onClick={() => router.push(`/custom-pricing/${id}`)}
                      key={index}
                      className="flex flex-col gap-5 py-5 p-4 cursor-pointer"
                    >
                      <div className="flex justify-between">
                        <h1 className="font-medium text-base text-white">
                          {cart.title}
                        </h1>
                        {/* <span className="flex items-center justify-center rounded-[6px] cursor-pointer">
                      </span> */}
                        <AiTwotoneDelete className="p-2 text-white cursor-pointer w-10 h-10 " />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-[8px]">
                          <span className="bg-[#E6F6FF] rounded py-1 px-2 flex items-center justify-between">
                            <Image alt="note" src={note} className="w-4 h-4" />
                            <p className="text-[#014873] font-normal text-sm">
                              12 modules
                            </p>
                          </span>
                          <span className="bg-[#E6F6FF] rounded py-1 px-2 flex items-center justify-between">
                            <Image alt="note" src={timer} className="w-4 h-4" />
                            <p className="text-[#014873] font-normal text-sm">
                              85hr 43min
                            </p>
                          </span>
                        </div>
                        <h1 className="font-semibold text-2xl text-white">
                          {cart.price}
                        </h1>
                      </div>
                    </div>
                    <hr />
                  </>
                );
              })}
            </div>
          </div>
          <div className="text-sm font-normal flex items-center justify-center gap-5 mt-5 text-white">
            <p>©2025 All rights reserved</p>
            <p>Terms of Service</p>
            <p>Privacy Policy</p>
          </div>
        </div>
        <div className="w-[40%] p-10">
          <div>
            <h1 className="text-main font-semibold text-3xl">
              Personal Details
            </h1>
            <p className="text-[#666666] text-base font-medium">
              Not team model seems turn per info.
            </p>
          </div>
          <div>
            <form
              className="w-full mt-5 space-y-2"
              // onSubmit={handleSubmit}
            >
              <div className="">
                {inputs.map((itm) => (
                  <div key={itm.label} className="mb-2">
                    <label
                      htmlFor={itm.label}
                      className="capitalize text-[#2E2E2E] mb-2"
                    >
                      {itm.label}
                    </label>
                    <input
                      type={itm.label === "Email Address" ? "email" : "text"}
                      className="outline-none border border-[#DADADA] bg-[#FAFAFA] placeholder:text-[#9F9F9F] py-3 px-[14px] w-full rounded-md"
                      placeholder={`Enter your ${itm.label.toLocaleLowerCase()}`}
                      id="Name"
                      required
                      name={itm.name}
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="Phone Number"
                    className="capitalize text-[#2E2E2E] mb-2"
                  >
                    Phone Number
                  </label>
                  <div className="border border-[#DADADA] bg-[#FAFAFA] flex items-center rounded-md py-3 px-[14px]">
                    <span className="border-r border-[#2E2E2E]">+234</span>
                    <input
                      type="number"
                      className="outline-none  placeholder:text-[#9F9F9F]  w-full "
                      id="Name"
                      placeholder="123 456 7890"
                      required
                      name="phone_number"
                    />
                  </div>

                  <span className="flex gap-x-[6px] text-[#9F9F9F] text-xs items-center mt-2">
                    <Info className="text-[#9F9F9F] rotate-180" size={11.67} />
                    <span>This number should be active on WhatsApp</span>
                  </span>
                </div>
                <div className="flex justify-center mt-4">
                  <div className="w-[95%] border border-[#DADADA] p-4 rounded-[6px] flex items-center gap-3">
                    <input type="checkbox" name="" id="" />
                    <div>
                      <p className="font-medium text-sm text-[#666666]">
                        Securely save my information for 1-click checkout
                      </p>
                      <p className="font-normal text-xs text-[#828282]">
                        Orci feugiat morbi pharetra laoreet nunc lobortis
                        tincidunt.
                      </p>
                    </div>
                  </div>
                </div>
                <button className="bg-main h-[50px] flex items-center justify-center w-full text-white rounded-lg font-medium mt-10">
                  Proceed to Make Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* 
      <div className="flex items-center justify-between my-5">
       
      </div>
      <div className="flex w-full justify-center flex-col items-center">
        <div className="bg-white rounded-[8px]  p-6 shadow-lg h-[339px] overflow-y-scroll w-1/2">
          {carts.map((cart, index) => {
            return (
              <div key={index} className="flex flex-col gap-5 py-5">
                <div className="flex justify-between">
                  <h1 className="font-medium text-base text-[#2E2E2E]">
                    {cart.title}
                  </h1>
                  <span className="p-2 bg-[#FF0000] text-white w-8 h-8 flex items-center justify-center rounded-[6px] cursor-pointer">
                    <AiTwotoneDelete />
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-[8px]">
                    <span className="bg-[#E6F6FF] rounded py-1 px-2 flex items-center justify-between">
                      <Image alt="note" src={note} className="w-4 h-4" />
                      <p className="text-[#014873] font-normal text-sm">
                        12 modules
                      </p>
                    </span>
                    <span className="bg-[#E6F6FF] rounded py-1 px-2 flex items-center justify-between">
                      <Image alt="note" src={timer} className="w-4 h-4" />
                      <p className="text-[#014873] font-normal text-sm">
                        85hr 43min
                      </p>
                    </span>
                  </div>
                  <h1 className="font-semibold text-xl text-[#484848]">
                    {cart.price}
                  </h1>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
       
        </div>
        <div className="flex pb-4 cursor-pointer justify-center">
          <button
            onClick={() => {
            //   router.push("/custom-pricing/order-summary");
            }}
            className="bg-sub rounded-[8px] py-4 text-[#2E2E2E] text-base font-medium w-full px-10"
          >
            Confirm Order
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default OrderSummary;
