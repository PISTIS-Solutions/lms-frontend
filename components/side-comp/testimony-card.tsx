import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa6";



interface Componentprops {
  avatar: any;
  name: String;
  quote: String;
}

const TestimonialCard = ({ avatar, name, quote }: Componentprops) => {
  return (
    <main className="w-[98%] h-[276px]  shadow-md relative rounded-[16px] p-4 bg-white">
      <Image
        src={avatar}
        alt="avatar"
        priority
        className="absolute right-5 object-fill rounded-full -top-7 md:w-[108px] w-[80px] h-[80px] md:h-[108px]"
      />
      <div>
        <h3 className="md:text-xl sm:text-lg text-sm font-semibold">{name}</h3>
        <div className="flex gap-x-1 text-main">
        <FaStar/>
        <FaStar/>
        <FaStar/>
        <FaStar/>
        <FaStar/>
        </div>
      </div>
      <div className="h-[80%] overflow-y-scroll">
        <p className="md:text-lg text-xs text-justify sm:text-base pt-6 text-[#3E3E3E]">“{quote}”</p>
      </div>
    </main>
  );
};

export default TestimonialCard;
