"use client";
import React from "react";
import Image from "next/image";

import { motion } from "framer-motion";

import blogBack from "@/public/assets/blogBack.png";
import NavigationBar from "@/components/side-comp/nav";
import { MdOutlineOpenInNew } from "react-icons/md";
import Footer from "@/components/side-comp/landing/footer";

const Blog = () => {
  return (
    <div className="bg-white">
      <NavigationBar />
      <div className=" mx-14 relative">
        <Image
          src={blogBack}
          alt="landing background"
          priority
          className="w-full"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute ml-6 my-14 p-10 left-0 bottom-0"
        >
          <div className="rounded-[6px] text-white bg-white/20 inline-block px-4 py-2 font-medium text-lg">
            Featured Blog
          </div>

          <div className="flex items-center justify-between ">
            <h1 className="text-5xl max-w-[1140px] font-normal leading-snug py-4 text-white">
              Stay Informed with Insights, Tips, and the Latest Trends in
              Learning and Development
            </h1>
            <MdOutlineOpenInNew className=" w-14 h-14 text-white" />
          </div>
          <p className="text-base font-normal max-w-[779px] pb-4 text-white">
            Explore our blog for expert advice, industry updates, and
            thought-provoking articles designed to inspire and guide your
            educational journey.Explore our blog for expert advice, industry
            updates, and thought-provoking articles designed to inspire and
            guide your educational journey.
          </p>
        </motion.div>
      </div>
      <div>
        <div className="flex flex-col items-center gap-y-2">
          <motion.p
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 100 }}
            transition={{ duration: 0.5 }}
            className="rounded-[6px] py-2 px-6 bg-[#FF105314] text-base font-normal text-[#FF1053] inline-block text-center "
          >
            Blog Posts
          </motion.p>
          <motion.h1
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 100 }}
            transition={{ duration: 0.7 }}
            className="text-main font-semibold text-[32px] "
          >
            Recent Blog Posts
          </motion.h1>
        </div>
        <div className="w-full h-[40vh] flex items-center justify-center">
          <h1 className="text-4xl text-main">Coming Soon!🤞</h1>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Blog;
