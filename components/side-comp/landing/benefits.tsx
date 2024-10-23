"use client"
import React from "react";
import Image from "next/image";

import { motion } from "framer-motion";

import book from "@/public/assets/book.png";
import star from "@/public/assets/star.png";
import rocket from "@/public/assets/rocket.png";
import gram from "@/public/assets/gram.png";

const Benefits = () => {
  const cardData = [
    {
      icon: book,
      head: "Hands-On Learning",
      p: "Engage in real-world projects that replicate industry challenges, building essential DevOps skills. These practical exercises prepare you to solve complex problems and implement cutting-edge solutions.",
    },
    {
      icon: star,
      head: "Expert Mentors",
      p: "Receive personalized guidance from experienced DevOps professionals who have spent years mastering their craft. Their insights will help you navigate your learning journey and achieve your goals.",
    },
    {
      icon: rocket,
      head: "Career Support",
      p: "Benefit from dedicated career coaching, including resume reviews and interview preparation tailored to the DevOps field. Our job placement assistance will connect you with top employers.",
    },
    {
      icon: gram,
      head: "Flexible Learning Paths",
      p: "Choose from a wide range of courses, bootcamps, and self-paced modules tailored to your learning style. Whether you're a beginner or an advanced learner, you'll progress at your own pace and convenience.",
    },
  ];

  return (
    <div className="bg-white md:p-20 p-3 py-10 md:py-20">
      <div className="flex flex-col items-center gap-y-2">
        <motion.p
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 100 }}
          transition={{ duration: 0.5 }}
          className="rounded-[6px] py-2 px-6 bg-[#FF105314] text-xs sm:text-base font-normal text-[#FF1053] inline-block text-center "
        >
          Key Benefits
        </motion.p>
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 100 }}
          transition={{ duration: 0.7 }}
          className="text-main font-semibold text-center text-[28px] md:text-[32px] "
        >
          Why Choose Our DevOps Program?
        </motion.h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-8 my-10">
        {cardData.map((data, index) => {
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              key={index}
              className="rounded-[10px] bg-white shadow-[0_0_20px_rgba(0,0,0,0.2)] flex p-4 md:p-6 gap-x-6 items-center"
            >
              <Image alt="icon" src={data.icon} />
              <div>
                <p className="text-main font-semibold text-xl md:text-2xl">{data.head}</p>
                <p className="text-[#666666] font-normal text-sm md:text-base font-sf-pro-display pt-2">
                  {data.p}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Benefits;
