"use client";
import { Check, CheckCircle2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Cookies from "js-cookie";

const PaidPricing = ({ bool }: any) => {
  const services = [
    { serv: "4 one-on-one mentoring sessions per month" },
    { serv: "6months unlimited access" },
    { serv: "15 courses" },
    { serv: "15 projects" },
    { serv: "Group blocker sessions" },
  ];

  const paidFunct = () => {
    localStorage.setItem("plan", "Paid");
    toast.success("Paid Plan Selected!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "dark",
    });
  };
  const plan = Cookies.get("plan");
  return (
    <div className="border-2 relative border-[A5ACBA] rounded-[4px] max-w-[310px] w-full h-[444px]">
      <ToastContainer />
      <div className="bg-[#F8F9FF] text-center rounded-tr-[4px] rounded-tl-[4px] px-4 py-6">
        <div>
          <h1 className="text-lg text-[#1A1A1A] font-medium">Paid Plan</h1>
          <p className="text-xs text-[#3E3E3E] pb-4 pt-2">
            Ideal for a students seeking to explore the complete functionality
            of the web app
          </p>
        </div>
        <h1 className="text-2xl text-main font-semibold">N400,000</h1>
      </div>

      <div className="bg-main rounded-br-[8px] rounded-bl-[8px]">
        <div className="pt-4 h-[277px] px-7 overflow-y-scroll">
          {services.map((service, i) => {
            return (
              <div key={i} className="flex py-2 items-top gap-x-1">
                <span className="w-4 h-4 mt-0.5 bg-[#33CC99] flex items-center justify-center p-0.5 rounded-full">
                  <Check className="text-white" />
                </span>
                <p className="text-sm text-white font-medium">{service.serv}</p>
              </div>
            );
          })}
        </div>
        {bool ? (
          <Link href="/create-account">
            <Button
              onClick={() => {
                paidFunct();
              }}
              className="bg-sub absolute bottom-4  hover:text-white text-black hover:bg-main w-[90%] mx-4"
            >
              Choose Plan
            </Button>
          </Link>
        ) : (
          <Button
            onClick={plan == "Paid" ? undefined : paidFunct}
            className={
              plan == "Paid"
                ? "bg-sub absolute bottom-4 text-black w-[90%] mx-4"
                : "bg-[#DAE0E6] absolute bottom-4 hover:text-white text-black hover:bg-main w-[90%] mx-4"
            }
          >
            Choose Plan
          </Button>
        )}
      </div>
    </div>
  );
};

export default PaidPricing;
