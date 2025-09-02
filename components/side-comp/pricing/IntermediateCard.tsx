"use client";
import { Info } from "lucide-react";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import intermediateIcon from "@/src/assets/svg/intermediateIcon.svg";
import doubleTick from "@/src/assets/svg/doubletick.svg";
import Image from "next/image";
import IntermediateCardModal from "../modal/plan/IntermediateCardModal";

const IntermediateCard = () => {
  const services = [
    { serv: "Hands-on experience" },
    { serv: "Access to structured learning" },
    { serv: "Personalized Project Feedback" },
    { serv: "Real-world project-based learning approach" },
    { serv: "Group Blocker Sessions" },
    { serv: "6 months of unlimited access" },
    { serv: "Resume reviews and mock interviews" },
    { serv: "Expert-led monthly 4 one-on-one mentorship sessions" },
  ];

  return (
    <div className="border-2 relative border-[#DADADA] rounded-[10px] w-full lg:w-[32%] px-2 flex-col flex">
      <div className="px-4">
        <section className="border-b-[0.5px] border-[#CCCCCC] rounded-tr-[4px] rounded-tl-[4px] py-6 ">
          <div className="flex mb-4 items-center justify-between">
            <Image src={doubleTick} alt="thunder bolt icon" />
            {/* TODO: add font */}
            <p className="border-[#60C4FF] bg-[#C2E8FF] p-[4px_10px] text-xs text-[#001D3D] border h-fit rounded-sm">
              Recommended
            </p>
          </div>
          <div>
            <h1 className="text-2xl text-[#000066] font-medium">
              Intermediate
            </h1>
            <p className="text-sm text-[#3E3E3E] mb-6">
              Expanding on foundational knowledge with practical tools and
              workflows.
            </p>
          </div>
          <h1 className="text-4xl text-main items-end font-medium flex gap-1">
            ₦400,000
            <span className="inline-flex text-base font-medium">
              / 6 Months
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

      <IntermediateCardModal />
    </div>
  );
};

export default IntermediateCard;
