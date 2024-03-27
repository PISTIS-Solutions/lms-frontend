"use client";
import { Check, CheckCircle2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PricingCard = () => {
  const services = [
    { serv: "1 one-on-one mentoring session" },
    { serv: "30 days access" },
    { serv: "3 courses" },
    { serv: "3 projects" },
  ];

  const freePlan = () => {
    toast.success("Free Plan Selected!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "dark",
    });
  };

  return (
    <div className="border-2 relative border-[A5ACBA] rounded-[4px] max-w-[310px] w-full h-[444px]">
      <ToastContainer />
      <div className="bg-[#F8F9FF] text-center rounded-tr-[4px] rounded-tl-[4px] px-4 py-6">
        <div>
          <h1 className="text-lg text-[#1A1A1A] font-medium">Basic Plan</h1>
          <p className="text-xs text-[#3E3E3E] pb-4 pt-2">
            Ideal for a student seeking to familiarize themselves with the
            application's features
          </p>
        </div>
        <h1 className="text-2xl text-main font-semibold">Free</h1>
      </div>
      <div className="pt-4 h-[45%] px-7 overflow-y-scroll">
        {services.map((service, i) => {
          return (
            <div key={i} className="flex py-2 items-top gap-x-1">
              <span className="w-4 h-4 mt-0.5 bg-[#EEEEEE] flex items-center justify-center p-0.5 rounded-full">
                <Check className="text-[#919BA7]" />
              </span>
              <p className="text-sm text-[#1A1A1A] font-medium">
                {service.serv}
              </p>
            </div>
          );
        })}
      </div>
      <div>
        <Link href="/create-account">
          <Button
            onClick={() => {
              freePlan();
            }}
            className="bg-sub absolute bottom-4 text-black hover:text-white hover:bg-main w-[90%] mx-4"
          >
            Choose Plan
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PricingCard;
