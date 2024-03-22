"use client";
import { CheckCircle2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaidPricing = () => {
  const services = [
    { serv: "Access to 4 one-on-one mentoring sessions/month" },
    { serv: "6 months free access" },
    { serv: "Access to all courses" },
    { serv: "Access to all projects" },
    { serv: "Group blocker sessions" },
  ];

  const paidFunct = () => {
    localStorage.setItem("plan", "Paid");
    toast.success("Paid Plan Selected!", {
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
    <div className="border-2 relative border-main rounded-[8px] max-w-[310px] w-full h-[444px]">
      <ToastContainer />
      <div className="bg-[#F8F9FF] rounded-tr-[8px] rounded-tl-[8px] px-4 py-6">
        <div>
          <h1 className="text-lg text-[#1A1A1A] font-medium">Paid Plan</h1>
          <p className="text-xs text-[#3E3E3E] pb-4 pt-2">
            Ideal for a student seeking to explore the complete functionality of
            the web app
          </p>
        </div>
        <h1 className="text-2xl text-main font-semibold">N400,000</h1>
      </div>

      <div className="bg-main rounded-br-[8px] rounded-bl-[8px]">
        <div className="pt-4 h-[277px] overflow-y-scroll px-4">
          {services.map((service, i) => {
            return (
              <div key={i} className="flex py-2 items-top gap-x-1">
                <CheckCircle2 className="text-white h-4 w-4" />
                <p className="text-sm text-white font-medium">{service.serv}</p>
              </div>
            );
          })}
        </div>
        <Link href="/pricing/paid">
          <Button
            onClick={() => {
              paidFunct();
            }}
            className="bg-sub absolute bottom-4 hover:text-white hover:bg-main w-[90%] mx-4"
          >
            Choose Plan
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PaidPricing;
