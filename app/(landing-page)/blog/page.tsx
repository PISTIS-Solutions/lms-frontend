"use client";
import React from "react";
import Image from "next/image";

import { motion } from "framer-motion";

import blogBack from "@/src/assets/blogBack.png";
import NavigationBar from "@/components/side-comp/nav";
import { MdOutlineOpenInNew } from "react-icons/md";
import Footer from "@/components/side-comp/landing/footer";
import blogImg from "@/src/assets/blogImg.png";

const Blog = () => {
  return (
    <div className="bg-white">
      <NavigationBar />
      <div
        style={{ backgroundImage: `url(${blogImg.src})` }}
        className="md:h-auto mx-3 md:bg-none bg-blogImg bg-cover md:rounded-none rounded-[32px] md:mx-7 lg:mx-14 relative"
      >
        <Image
          src={blogBack}
          alt="landing background"
          priority
          className="w-full hidden md:block"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="md:absolute static ml-6 my-0 md:my-14 p-3 lg:p-10 left-0 bottom-0"
        >
          <div className="rounded-[6px] text-white bg-white/20 inline-block px-4 py-1 lg:py-2 font-medium text-sm md:text-base lg:text-lg">
            Featured Blog
          </div>

          <div className="flex items-center justify-between ">
            <h1 className="lg:text-5xl text-2xl md:text-4xl font-normal py-2 lg:py-4 text-white sm:text-left text-center">
              Stay Informed with Insights, Tips, and the Latest Trends in
              Learning and Development
            </h1>
            <MdOutlineOpenInNew className=" w-14 h-14 text-white" />
          </div>
          <p className="lg:text-base text-xs sm:text-left text-center md:text-sm font-normal max-w-[581px] pb-2 lg:pb-4 text-white">
            Explore our blog for expert advice, industry updates, and
            thought-provoking articles designed to inspire and guide your
            educational journey.Explore our blog for expert advice, industry
            updates, and thought-provoking articles designed to inspire and
            guide your educational journey.
          </p>
        </motion.div>
      </div>
      <div className="mt-5 md:mt-0">
        <div className="flex flex-col items-center gap-y-2">
          <motion.p
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 100 }}
            transition={{ duration: 0.5 }}
            className="rounded-[6px] py-2 px-6 bg-[#FF105314] text-xs sm:text-base font-normal text-[#FF1053] inline-block text-center "
          >
            Blog Posts
          </motion.p>
          <motion.h1
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 100 }}
            transition={{ duration: 0.7 }}
            className="text-main font-semibold text-center text-[28px] md:text-[32px] "
          >
            Recent Blog Posts
          </motion.h1>
        </div>
        <div className="w-full h-[40vh] flex items-center justify-center">
          <h1 className="md:text-4xl text-3xl text-main">Coming Soon!🤞</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
