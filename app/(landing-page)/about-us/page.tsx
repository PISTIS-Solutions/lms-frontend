"use client";
import React from "react";
import Image from "next/image";

import { motion } from "framer-motion";

import NavigationBar from "@/components/side-comp/nav";
import aboutBack from "@/src/assets/aboutBack.png";
import Benefits from "@/components/side-comp/landing/benefits";
import Slides from "@/components/side-comp/landing/slides";
import Learning from "@/components/side-comp/landing/learning";
import Footer from "@/components/side-comp/landing/footer";

import missionBg from "@/src/assets/missionBg.png";
import aboutImg from "@/src/assets/abtImage.png";
import target from "@/src/assets/target.png";
import aim from "@/src/assets/aim.png";
import diamond from "@/src/assets/diamond.png";

const AboutUs = () => {
  const cards = [
    {
      bgImg: missionBg,
      tag: "Mission",
      para: `Sed consectetur purus in cras dui risus. Purus nisl morbi
              vestibulum sit. Lobortis non vel convallis nunc rhoncus tempor
              pulvinar adipiscing pharetra. Vitae auctor at semper semper at
              nulla nisi. Et eget lectus sit volutpat fermentum pellentesque.`,
      hexImg: target,
    },
    {
      bgImg: missionBg,
      tag: "vision",
      para: `Dui lorem gravida ultrices elit fringilla aliquam. Faucibus aliquam mollis eget diam amet pharetra sit hendrerit. In vitae imperdiet sapien facilisis accumsan dolor. A ultrices neque tincidunt id ornare nec. Vitae lacus velit varius enim accumsan sollicitudin sollicitudin ut.`,
      hexImg: aim,
    },
    {
      bgImg: missionBg,
      tag: "values",
      para: `Risus diam et egestas proin varius nulla. Amet lobortis vitae porta vel. Nulla eu nec arcu elit fermentum sit nec lobortis. Commodo viverra tincidunt blandit nisl sit ac. Diam amet ante aenean nulla massa massa parturient accumsan nam.`,
      hexImg: diamond,
    },
  ];
  return (
    <div className="bg-white">
      <NavigationBar />
      <div
        style={{ backgroundImage: `url(${aboutImg.src})` }}
        className=" mx-3 md:bg-none bg-cover md:rounded-none rounded-[32px] md:mx-7 lg:mx-14 relative"
      >
        <Image
          src={aboutBack}
          alt="landing background"
          priority
          className="w-full hidden md:block"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="md:absolute static ml-0 lg:ml-6 my-0 lg:my-14 p-4 lg:p-10 left-0 top-0"
        >
          <div className="rounded-[6px] text-white bg-white/20 inline-block px-4 py-1 lg:py-2 font-medium text-sm md:text-base lg:text-lg">
            🚀 Automate and Innovate
          </div>

          <h1 className="lg:text-5xl text-2xl md:text-4xl font-normal py-2 lg:py-4 text-white sm:text-left max-w-full md:max-w-[740px] text-center">
            Discover Our Mission to
            <span className=" relative underline-custom">
              {" "}
              Empower Larners and Shape
            </span>{" "}
            <br />
            the Future of Education
          </h1>
          <p className="lg:text-base text-xs sm:text-left text-center md:text-sm font-normal max-w-[581px] pb-2 lg:pb-4 text-white">
            We're passionate about creating transformative learning experiences
            that equip individuals with the skills and knowledge they need to
            thrive. Learn more about our journey and the values that drive us
            forward.
          </p>
        </motion.div>
      </div>
      <div className="bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-between md:p-20 p-10 py-10 md:py-20">
        {cards.map((card, index) => {
          return (
            <div
              key={index}
              className="rounded-[24px] shadow-[0_0_40px_0_rgba(0,0,0,0.1)] w-full h-[534px]"
            >
              <div
                style={{ backgroundImage: `url(${missionBg.src})` }}
                className="w-full bg-cover rounded-tr-[24px] rounded-tl-[24px]  flex justify-center h-[258px] items-center"
              >
                <h1 className="text-white font-semibold text-2xl sm:text-3xl md:text-4xl uppercase ">
                  {card.tag}
                </h1>
              </div>
              <div className="p-5 relative flex justify-center items-center h-[276px]">
                <Image
                  src={card.hexImg}
                  alt={card.tag}
                  className="absolute -top-24 h-[167px] w-[167px]"
                />

                <p className="text-[#666666] font-normal text-sm sm:text-base text-center mt-4">
                  {card.para}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <Benefits />
      <Slides />
      <Learning />
      <Footer />
    </div>
  );
};

export default AboutUs;
