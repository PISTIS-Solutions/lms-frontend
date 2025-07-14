import Image from "next/image";
import React from "react";

import customImg from "@/src/assets/customimg.png";
import note from "@/src/assets/svg/note.svg";
import timer from "@/src/assets/svg/timer.svg";
import rate from "@/src/assets/svg/rate.svg";

import { BsCartPlus } from "react-icons/bs";
import { useRouter } from "next-nprogress-bar";
import { motion } from "framer-motion";

interface Componentprops {
  image: any;
  header: String;
  index: number;
  id: any;
  moduleCount: number;
  duration: any;
}

const CustomCard = ({
  image,
  header,
  index,
  id,
  moduleCount,
  duration,
}: Componentprops) => {
  const router = useRouter();
  // const id = 1;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      key={id}
      onClick={() => router.push(`custom-pricing/${id}`)}
      className="max-w-[416px] h-auto bg-white rounded-[8px] p-2"
    >
      <div className=" rounded-tl-[8px] rounded-tr-[8px]">
        <Image
          src={image}
          alt="img"
          width={100}
          height={100}
          priority
          className="w-full rounded-tl-[6px] rounded-tr-[6px] h-[180px] bg-cover"
        />
      </div>
      <div className="p-2 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-semibold text-[#2E2E2E]">{header}</h3>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-x-[8px]">
              <span className="bg-[#E6F6FF] rounded py-1 px-2 flex items-center justify-between">
                <Image alt="note" src={note} className="w-4 h-4" />
                <p className="text-[#014873] font-normal text-sm">
                  {moduleCount} modules
                </p>
              </span>
              <span className="bg-[#E6F6FF] rounded py-1 px-2 flex items-center justify-between">
                <Image alt="note" src={timer} className="w-4 h-4" />
                <p className="text-[#014873] font-normal text-sm">{duration}</p>
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
    </motion.div>
  );
};

export default CustomCard;
