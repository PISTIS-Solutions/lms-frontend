import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import bene1 from "@/src/assets/bene/bene1.png";
import bene2 from "@/src/assets/bene/bene2.png";
import bene3 from "@/src/assets/bene/bene3.png";

const Sponsors = () => {
  return (
    <div className="bg-white md:p-20 p-3 py-10 md:py-20">
      <motion.p
        initial={{ y: -100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 100 }}
        transition={{ duration: 0.5 }}
        className="rounded-[6px] py-2 px-6 bg-[#FF105314] font-sfProDisplay text-xs sm:text-base font-normal text-[#FF1053] inline-block text-center "
      >
        Key Partners
      </motion.p>
      <div className="flex my-5 flex-wrap gap-y-5 gap-x-2.5 justify-center">
        {[bene1, bene2, bene3,bene1, bene2, bene3,bene1, bene2, bene3,bene1, bene2].map((bene, index) => (
          <div
            key={index}
            className="w-[187px] flex justify-center items-center h-[80px] bg-white/50 shadow-md rounded-[4px] p-2"
          >
            <Image alt="b1" src={bene} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsors;
