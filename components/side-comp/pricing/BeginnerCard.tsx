"use client";
import React from "react";

import "react-toastify/dist/ReactToastify.css";
import doubleTick from "@/src/assets/svg/doubletick.svg";
import bolt from "@/src/assets/svg/roundBolt.svg";
import Image from "next/image";
import BeginnerCardModal from "../modal/plan/BeginnerCardModal";

const BeginnerCard = () => {
  const services = [
    { serv: "Digital literacy" },
    { serv: "Getting familiar with IT" },
    { serv: "⁠Exploring different Tech Careers" },
    { serv: "Introduction to IT Career Services and guide" },
    { serv: "Introduction to DevOps" },
    { serv: "Data Infographics" },
    { serv: "Troubleshooting" },
  ];

  return (
    <div className="border-2 relative border-[#DADADA] rounded-[10px] w-full lg:w-[32%] px-2 flex-col flex self-stretch">
      <div className="flex justify-between flex-col h-full">
        <div className="px-4">
          <section className="border-b-[0.5px] border-[#CCCCCC] rounded-tr-[4px] rounded-tl-[4px] py-6 ">
            <div className="flex mb-4 items-center justify-between">
              <Image src={bolt} alt="thunder bolt icon" />
              {/* TODO: add font */}
              {/* <p className="border-[#60C4FF] p-[4px_10px] text-xs text-[#014873] border h-fit rounded-sm">
                Next
              </p> */}
            </div>
            <div>
              <h1 className="text-2xl text-[#000066] font-medium">Beginner</h1>
              <p className="text-sm text-[#3E3E3E] mb-6">
                Introduction to DevOps concepts, tools, and basic practices.
              </p>
            </div>
            <h1 className="text-[40px] h-fit text-main font-medium before:content-['₦'] pl-8 before:left-0 before:top-[6%] before:inline before:text-[26px] before:absolute relative">
              100,000
              <span className=" inline-flex text-base font-medium">
                / 8 Weeks
              </span>
            </h1>
          </section>
          <section className="mt-10 h-[45%] overflow-y-scroll">
            {services.map((service, i) => {
              return (
                <div key={i} className="flex py-2 items-top gap-x-1">
                  <Image src={doubleTick} alt="double check mark icon" />
                  <p className="text-sm text-[#1A1A1A] font-medium">
                    {service.serv}
                  </p>
                </div>
              );
            })}
          </section>
        </div>
        <BeginnerCardModal />
      </div>
    </div>
  );
};

export default BeginnerCard;
