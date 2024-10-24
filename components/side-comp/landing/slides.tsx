"use client";
import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { tochukwu, olayinka, oyedokun, tolulope, avatar } from "@/app/index";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Carousel from "../carousel";

const Slides = () => {
  const [currentIndex, setCurrentIndex] = useState<any>(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex: any) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  };
  const handlePrevious = () => {
    setCurrentIndex((prevIndex: any) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const images = [
    {
      name: "Tochukwu Odeme",
      quote:
        "Pistis provides you a unique personal experience on your path to becoming a cloud DevOps engineer. This program offers one-on-one mentorship sessions and various practical applications, covering all potential scenarios you may encounter when applying your skills to cloud-related challenges. Highly recommended for anyone serious about advancing in this field.",
      image: tochukwu,
    },

    {
      name: "Olayinka Olaiya",
      quote:
        "My experience with the DevOps training at Pistis Tech Academy has been outstanding. The comprehensive and practical modules, responsive instructors, and supportive community have significantly enhanced my skills and enriched my learning experience. I highly recommend this training to anyone passionate about gaining DevOps skills or advancing their knowledge, regardless of prior tech experience. Students are trained step-by-step from basic to advanced stages, making it suitable for everyone. Engage actively, utilize the community, and manage your time effectively to get the most out of this excellent program.",
      image: olayinka,
    },

    {
      name: "Oyedokun Damilare",
      quote:
        "The decision of learning from pistis-tech has been the very best for me. They make complicated software skills  so simple because of their expertise. Available to help are skilled mentors, resourceful materials and in depth critical thinking projects that will expose you to the field of your course. I can guarantee you that learning software skills from pistis-tech will make your hand so strong in any of the fields you pick.",
      image: oyedokun,
    },

    {
      name: "Abayomi Omiwale",
      quote:
        "The timely help from the mentors has really made my learning easy and effective.",
      image: avatar,
    },

    {
      name: "Tolulope",
      quote:
        "A hub of well seasoned mentors, flexible learning, prompt response to issues. Pistis is a place where you can learn irrespective of what your schedule looks like.",
      image: tolulope,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex: number) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="bg-white block md:flex overflow-x-hidden items-center gap-20 justify-between p-4 sm:p-10 md:p-20 ">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 100 }}
        transition={{ duration: 0.5 }}
        className="max-w-full md:max-w-[45%]"
      >
        <h1 className="text-main font-medium text-4xl text-center md:text-left md:text-5xl ">
          Real Stories, Real Success
        </h1>
        <p className="md:text-base text-sm md:text-left text-center max-w-full md:max-w-[472px] py-4 font font-sf-pro-display">
          See how our DevOps program has transformed careers and empowered
          professionals to achieve their goals.
        </p>
        <div className="flex justify-center md:justify-normal items-center my-4 gap-x-8">
          <button
            className=" md:w-14 w-10 h-10 disabled:text-[#BDBDBD] text-main md:h-14 rounded-full bg-white flex justify-center items-center cursor-pointer shadow-[0_0_12px_rgba(0,0,0,0.1)]"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <ArrowLeft />
          </button>
          <button
            className=" md:w-14 w-10 h-10 md:h-14 rounded-full text-main disabled:text-[#BDBDBD] bg-white flex justify-center items-center cursor-pointer shadow-[0_0_12px_rgba(0,0,0,0.1)]"
            onClick={handleNext}
            disabled={currentIndex === 4}
          >
            <ArrowRight />
          </button>
        </div>
      </motion.div>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 100 }}
        transition={{ duration: 0.5 }}
        className="md:max-w-[48%] max-w-full relative"
      >
        <Carousel
          images={images[currentIndex].image}
          name={images[currentIndex].name}
          quote={images[currentIndex].quote}
          currentIndex={currentIndex}
        />
      </motion.div>
    </div>
  );
};

export default Slides;
