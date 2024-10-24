import React from "react";
import Image from "next/image";

import { BiSolidQuoteAltLeft } from "react-icons/bi";

const Carousel = ({ images, name, quote, currentIndex }: any) => {
  return (
    <div className="">
      <div className="mb-5 p-2 md:p-6 max-h-[290px] overflow-y-scroll">
        <BiSolidQuoteAltLeft className="text-main absolute -top-7 -left-5 md:-left-12 md:w-20 w-14 h-14 md:h-20" />
        <p className="font-medium text-xl md:text-3xl text-[#484848]">
          {quote}
        </p>
      </div>
      <div className="flex gap-3 px-1 md:px-2 items-center">
        <Image
          alt={name}
          src={images}
          className="rounded-full md:w-20 w-14 h-14 md:h-20"
          width={80}
          height={80}
        />
        <div>
          <p className="text-main text-xl sm:text-2xl md:text-3xl font-semibold">
            {name}
          </p>
          <p className="font-medium text-sm sm:text-base md:text-lg text-[#666666]">
            DevOps Engineer
          </p>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
