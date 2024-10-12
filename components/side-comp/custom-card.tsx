import Image from "next/image";
import React from "react";

import customImg from "@/public/assets/customimg.png";
import note from "@/public/assets/svg/note.svg";
import timer from "@/public/assets/svg/timer.svg";
import rate from "@/public/assets/svg/rate.svg";

import { BsCartPlus } from "react-icons/bs";

const CustomCard = () => {
  return (
    <div className="w-[416px] h-[325px] bg-white rounded-[8px] p-2">
      <div className=" rounded-tl-[8px] rounded-tr-[8px]">
        <Image
          src={customImg}
          className="w-full h-1/2"
          alt="custom-card-image"
        />
      </div>
      <div className="p-2 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-semibold text-[#2E2E2E]">
            Introduction to DevOps Practices Mastering Continuous Integration
          </h3>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-x-[8px]">
              <span className="bg-[#E6F6FF] rounded py-1 px-2 flex items-center justify-between">
                <Image alt="note" src={note} className="w-4 h-4" />
                <p className="text-[#014873] font-normal text-sm">12 modules</p>
              </span>
              <span className="bg-[#E6F6FF] rounded py-1 px-2 flex items-center justify-between">
                <Image alt="note" src={timer} className="w-4 h-4" />
                <p className="text-[#014873] font-normal text-sm">85hr 43min</p>
              </span>
            </div>
            <div className="flex items-center gap-x-2">
              <Image alt="rate" src={rate} className="w-4 h-4" />
              <p className="text-[#484848] text-sm font-normal">4.5 (163)</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-[#484848] text-xs font-normal">Price</p>
            <p className=" font-semibold text-xl text-[#484848]">₦428,000.00</p>
          </div>
          <button className="bg-sub cursor-pointer rounded-[6px] flex items-center justify-between gap-2 p-[16px_12px]">
            <BsCartPlus className=" text-white w-4 h-4" />
            <p className="text-sm font-semibold text-white">Add to cart</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
