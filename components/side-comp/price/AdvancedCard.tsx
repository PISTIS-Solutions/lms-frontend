"use client";
import React from "react";

import "react-toastify/dist/ReactToastify.css";
import infinity from "@/src/assets/svg/infinity.svg";
import redStash from "@/src/assets/svg/redStash.svg";
import Image from "next/image";
import { useRouter } from "next-nprogress-bar";

const AdvanceCard = () => {
  const services = [
    { serv: "Customizable courses to fit your needs" },
    { serv: "Hands-on projects" },
    { serv: "Expert mentorship for personalized guidance" },
    { serv: "Main scale export inspect" },
    { serv: "Access to high-quality content" },
  ];

  const router = useRouter();

  return (
    <div className="border-2 relative border-[#001D3D] rounded-[10px] w-full lg:w-[32%] px-2 flex-col flex self-stretch bg-advanceCardBg bg-cover bg-main overflow-hidden bg-blend-screen">
      <div className="flex justify-between flex-col h-full">
        <div className="px-4">
          <section className="border-b-[0.5px] border-[#CCCCCC] rounded-tr-[4px] rounded-tl-[4px] py-6 ">
            <div className="flex mb-4 items-center justify-between">
              <Image src={infinity} alt="double check mark icon" />
              {/* TODO: add font */}
              <p className="p-[4px_10px] text-xs text-white  h-fit rounded-sm bg-[#FF1053]">
                Enterprise
              </p>
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-sfProDisplay font-medium">
                Advance
              </h1>
              <p className="text-sm font-sfProDisplay mb-6">
                Choose the perfect DevOps course that aligns with your goals and
                current skill level.
              </p>
            </div>
            <h1 className="text-[40px] h-fit font-sfProDisplayfont-sfProDisplay text-white font-medium">
              Custom
            </h1>
          </section>
          <section className="mt-10 h-[45%] overflow-y-scroll">
            {services.map((service, i) => {
              return (
                <div key={i} className="flex py-2 items-top gap-x-1">
                  <Image src={redStash} alt="thunder bolt icon" />
                  <p className="text-sm text-white font-sfProDisplay font-medium">
                    {service.serv}
                  </p>
                </div>
              );
            })}
          </section>
        </div>
        <button
          disabled
          className="bg-main border border-white disabled:cursor-not-allowed disabled:main/50 cursor-pointer rounded-[10px] font-semibold mt-6 mb-2 h-[52px] flex items-center justify-center text-white"
          // onClick={() => (authToken ? toggleModal() : router.push("/pricing"))}
          // onClick={() => router.push("/create-account")}
        >
          Coming soon
        </button>
      </div>
    </div>
  );
};

export default AdvanceCard;
