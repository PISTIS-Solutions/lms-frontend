import React from "react";

import { motion } from "framer-motion";

import BeginnerCard from "@/components/side-comp/price/BeginnerCard";
import IntermediateCard from "@/components/side-comp/price/IntermediateCard";
import AdvanceCard from "@/components/side-comp/price/AdvancedCard";

const LandingPayment = () => {
  return (
    <div className="md:p-[0_5rem_5rem_5rem] p-[0_6px_6px_6px] sm:p-[0_3rem_3rem_3rem] bg-white">
      <div className="flex flex-col items-center gap-y-2">
        <motion.p
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 100 }}
          transition={{ duration: 0.5 }}
          className="rounded-[6px] py-2 px-6 bg-[#FF105314] text-xs sm:text-base font-normal text-[#FF1053] inline-block text-center "
        >
          Pricing and Enrollment
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="text-main font-semibold text-center text-[28px] md:text-[32px] "
        >
          Flexible Pricing for Everyone
        </motion.h1>
      </div>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 100 }}
        transition={{ duration: 0.5 }}
        className="flex overflow-x-hidden flex-wrap items-center justify-between gap-4 md:gap-6 my-10"
      >
        <BeginnerCard />
        <IntermediateCard />
        <AdvanceCard />
      </motion.div>
    </div>
  );
};

export default LandingPayment;
