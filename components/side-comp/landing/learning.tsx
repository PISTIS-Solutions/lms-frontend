"use client";
import React from "react";
import Image from "next/image";

import { motion } from "framer-motion";

import cube from "@/src/assets/cube.png";
import print from "@/src/assets/print.png";
import game from "@/src/assets/game.png";

const Learning = () => {
  const learnData = [
    {
      image: cube,
      head: "Peer-to-Peer Learning",
      para: "Join study groups and collaborate with fellow learners to deepen your DevOps understanding. This interactive environment fosters knowledge sharing and makes challenges more enjoyable.",
    },
    {
      image: print,
      head: "Mentorship Access",
      para: "Receive personalized feedback and guidance from experienced mentors dedicated to your success. They’ll help you navigate topics and achieve your learning goals.",
    },
    {
      image: game,
      head: "Gamified Learning",
      para: "Earn badges, rewards, and recognition as you progress, adding fun to your journey. This gamified approach keeps you engaged while celebrating your achievements!",
    },
  ];

  return (
    <div className="md:p-[1rem_5rem_5rem_5rem] p-[10px_10px_10px_10px] sm:p-[1px_10px_10px_10px] bg-white">
      <div className="flex flex-col items-center gap-y-2">
        <motion.p
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 100 }}
          transition={{ duration: 0.5 }}
          className="rounded-[6px] py-2 px-6 bg-[#FF105314] font-sfProDisplay text-xs sm:text-base font-normal text-[#FF1053] inline-block text-center "
        >
          Learning Experience
        </motion.p>
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 100 }}
          transition={{ duration: 0.7 }}
          className="text-main font-semibold text-center text-[28px] md:text-[32px] "
        >
          Enhance Your Learning Experience
        </motion.h1>
      </div>
      <div className="flex lg:flex-row flex-col items-center mx-2 sm:mx-0 justify-center md:justify-between gap-8 my-10">
        {learnData.map((learn, index) => {
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              key={index}
              className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.2)] flex flex-col items-center justify-between rounded-[16px] py-8 px-6"
            >
              <div className="flex flex-col gap-y-2">
                <p className="text-main font-medium md:text-left text-center text-xl md:text-2xl">
                  {learn.head}
                </p>
                <p className="font-normal text-sm md:text-left text-center md:text-base font-sfProDisplay">
                  {learn.para}
                </p>
              </div>
              <Image alt="card-img" className="md:p-4 p-2" src={learn.image} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Learning;
