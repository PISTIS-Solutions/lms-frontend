"use client";
import React from "react";

import "react-toastify/dist/ReactToastify.css";
import doubleTick from "@/public/assets/svg/doubletick.svg";
import loop from "@/public/assets/svg/loop.svg";
import Image from "next/image";
import Link from "next/link";

const AdvanceCard = () => {
  const services = [
    { serv: "Move image layer italic" },
    { serv: "Blur rectangle distribute layerBlur recta" },
    { serv: "Main scale export inspect" },
    { serv: "Main scale export inspect" },
    { serv: "Main scale export inspect" },
    { serv: "Variant duplicate connection star" },
  ];

  return (
    <div className="border-2 relative border-[#001D3D] rounded-[10px] w-full lg:w-[32%] px-2 flex-col flex self-stretch bg-advanceCardBg bg-cover bg-main overflow-hidden bg-blend-screen">
      <div className="flex justify-between flex-col h-full">
        <div className="px-4">
          <section className="border-b-[0.5px] border-[#CCCCCC] rounded-tr-[4px] rounded-tl-[4px] py-6 ">
            <div className="flex mb-4 items-center justify-between">
              <Image src={loop} alt="thunder bolt icon" />

              {/* TODO: add font */}
              <p className="p-[4px_10px] text-xs text-main  h-fit rounded-sm bg-white">
                Enterprise
              </p>
            </div>
            <div className="text-white">
              <h1 className="text-2xl  font-medium">Advance</h1>
              <p className="text-sm  mb-6">
                Introduction to DevOps concepts, tools, and basic practices.
              </p>
            </div>
            <h1 className="text-[40px] h-fit text-white font-medium">Custom</h1>
          </section>
          <section className="mt-10 h-[45%] overflow-y-scroll">
            {services.map((service, i) => {
              return (
                <div key={i} className="flex py-2 items-top gap-x-1">
                  <Image src={doubleTick} alt="double check mark icon" />
                  <p className="text-sm text-white font-medium">
                    {service.serv}
                  </p>
                </div>
              );
            })}
          </section>
        </div>
        <Link
          href="custom-pricing"
          className="bg-white rounded-[10px] font-semibold mt-6 mb-2 h-[52px] flex items-center justify-center text-main"
        >
          Purchase a Preferred Course
        </Link>
      </div>
    </div>
  );
};

export default AdvanceCard;
