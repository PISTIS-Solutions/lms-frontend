"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import bene1 from "@/src/assets/bene/bene1.png";
import bene2 from "@/src/assets/bene/bene2.jpeg";

const Sponsors = () => {
  const partners = [bene1, bene2]; 

  return (
    <section className="bg-white md:px-20 px-5 py-16 md:py-24">
      <div className="flex flex-col items-center text-center space-y-6">
        <motion.span
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-full py-2 px-6 bg-[#FF105314] font-sfProDisplay text-sm sm:text-base font-medium text-[#FF1053]"
        >
          Key Partners
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[#0A0A0A] text-xl sm:text-2xl md:text-3xl font-semibold font-sfProDisplay"
        >
          Trusted by Innovative Companies
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center gap-6 md:gap-10 mt-6"
        >
          {partners.map((bene, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-[160px]  md:w-[180px] p-2 flex justify-center items-center bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <Image
                src={bene}
                alt={`Partner ${index + 1}`}
                className="object-contain w-[80%] h-auto"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Sponsors;
