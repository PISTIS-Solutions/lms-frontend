"use client";
import React from "react";
import Image from "next/image";

import { motion } from "framer-motion";

import NavigationBar from "@/components/side-comp/nav";
import aboutBack from "@/public/assets/aboutBack.png";
import Benefits from "@/components/side-comp/landing/benefits";
import Slides from "@/components/side-comp/landing/slides";
import Learning from "@/components/side-comp/landing/learning";
import Footer from "@/components/side-comp/landing/footer";

const AboutUs = () => {
  return (
    <div className="bg-white">
      <NavigationBar />
      <div className=" mx-14 relative">
        <Image
          src={aboutBack}
          alt="landing background"
          priority
          className="w-full"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute ml-6 my-14 p-10 left-0 top-0"
        >
          <div className="rounded-[6px] text-white bg-white/20 inline-block px-4 py-2 font-medium text-lg">
            🚀 Automate and Innovate
          </div>

          <h1 className="text-5xl font-normal leading-snug py-4 text-white">
            Discover Our Mission to <br />
            <span className=" relative underline-custom">
              Empower Larners and Shape
            </span>{" "}
            <br />
            the Future of Education
          </h1>
          <p className="text-base font-normal max-w-[581px] pb-4 text-white">
            We're passionate about creating transformative learning experiences
            that equip individuals with the skills and knowledge they need to
            thrive. Learn more about our journey and the values that drive us
            forward.
          </p>
        </motion.div>
      </div>
      <Benefits />
      <Slides />
      <Learning />
      <Footer />
    </div>
  );
};

export default AboutUs;
