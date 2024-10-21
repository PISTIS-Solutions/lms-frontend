import React from "react";
import Image from "next/image";

import { BiSolidQuoteAltLeft } from "react-icons/bi";

const Carousel = ({ images, name, quote, currentIndex }: any) => {
  return (
    <div className="">
      <div className="mb-5 p-6 max-h-[290px] overflow-y-scroll">
        <BiSolidQuoteAltLeft className="text-main absolute -top-7 -left-12 w-20 h-20" />
        <p className="font-medium text-3xl text-[#484848]">{quote}</p>
      </div>
      <div className="flex gap-3 px-2 items-center">
        <Image
          alt={name}
          src={images}
          className="rounded-full w-20 h-20"
          width={80}
          height={80}
        />
        <div>
          <p className="text-main text-3xl font-semibold">{name}</p>
          <p className="font-medium text-lg text-[#666666]">DevOps Engineer</p>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
