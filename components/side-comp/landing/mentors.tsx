"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ment1 from "@/src/assets/mentors/ment1.png";
import promise from "@/src/assets/mentors/promise.jpeg";
import bigTanks from "@/src/assets/mentors/bigTanks.jpeg";
import tony from "@/src/assets/mentors/tony.jpeg";
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const mentors = [
  {
    image: tony,
    name: "Akoji Anthony",
    location: "Lagos, Nigeria",
    techStack: ["SRE", "DevOps"],
    bio: "Passionate about reliability engineering and automation, Akoji builds resilient infrastructure that scales. With a strong background in DevOps, he loves optimizing CI/CD pipelines, improving deployment processes, and empowering teams with robust monitoring and observability systems.",
    socials: {
      linkedin: "http://www.linkedin.com/in/akojianthony",
      github: "https://github.com/Tonybesto",
      twitter: "https://x.com/tonybesto6?t=1a0hxgMVeuUuy5yFRWfmOw&s=09",
      email: "mailto:akojianthony@gmail.com",
    },
  },
  {
    image: bigTanks,
    name: "Raphael Tanko",
    location: "Lagos, Nigeria",
    techStack: ["Python", "Django", "Flask", "Java"],
    bio: "Raphael is a backend engineer who thrives on designing clean, efficient APIs and distributed systems. He enjoys tackling complex data challenges, optimizing performance, and mentoring others on writing maintainable backend code using modern Python frameworks.",
    socials: {
      linkedin: "https://www.linkedin.com/in/praise-anefu/",
      github: "https://github.com/Anefu",
      twitter: "",
      email: "",
    },
  },
  {
    image: promise,
    name: "Praise Anefu",
    location: "Netherlands",
    techStack: ["DevOps", "SRE"],
    bio: "SRE/DevOps Engineer with a focus on shipping code quicker and safer while maintaining overall system quality and adhering to cost-effective practices.",
    socials: {
      linkedin: "http://www.linkedin.com/in/raphael-tanko-172195137/",
      github: "https://github.com/Abbracx",
      twitter: "https://x.com/abbrac_x",
      email: "mailto:tankoraphael@gmail.com",
    },
  },
];

const OurMentors = () => {
  const [selectedMentor, setSelectedMentor] = useState(mentors[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goPrev = () => {
    const newIndex = (currentIndex - 1 + mentors.length) % mentors.length;
    setSelectedMentor(mentors[newIndex]);
    setCurrentIndex(newIndex);
  };

  const goNext = () => {
    const newIndex = (currentIndex + 1) % mentors.length;
    setSelectedMentor(mentors[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleMentorClick = (
    mentor: (typeof mentors)[number],
    index: number
  ) => {
    setSelectedMentor(mentor);
    setCurrentIndex(index);
  };

  return (
    <div className="bg-white md:p-10 p-3 py-10 md:py-20">
      <div className="flex flex-col items-center gap-y-2">
        <motion.p
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-[6px] py-2 px-6 bg-[#FF105314] font-sfProDisplay text-xs sm:text-base font-normal text-[#FF1053] inline-block text-center"
        >
          Our Mentors
        </motion.p>
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-main capitalize font-semibold text-center text-[28px] md:text-[32px]"
        >
          Our reliable mentors
        </motion.h1>
      </div>

      <div className="my-8">
        <div className="flex items-center justify-center overflow-x-auto gap-2 scrollbar-hide">
          {mentors.map((mentor, index) => (
            <div
              key={index}
              onClick={() => handleMentorClick(mentor, index)}
              className={`p-2 rounded-[10px] flex-none cursor-pointer transition hover:scale-105 ${
                selectedMentor?.name === mentor.name
                  ? "border-2 border-[#2FBC8D]"
                  : ""
              }`}
            >
              <Image
                src={mentor.image}
                width={100}
                height={100}
                alt={mentor.name}
                className="md:w-[154px] h-[100px] w-[100px] md:h-[154px] object-cover rounded-[8px]"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMentor.name}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full my-4 gap-5 sm:gap-7 md:gap-10"
          >
            {/* Left Button */}
            <FaChevronLeft
              className="w-10 h-10 hidden md:block cursor-pointer text-[#2FBC8D]"
              onClick={goPrev}
            />

            {/* Mentor Image */}
            <Image
              src={selectedMentor.image}
              alt={selectedMentor.name}
              width={100}
              height={100}
              unoptimized
              className="lg:w-[388px] w-[250px] object-cover sm:w-[320px] h-[250px] sm:h-[320px] lg:h-[388px]"
            />

            {/* Mentor Info */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-center md:justify-normal gap-2">
                <h2 className="text-main text-xl whitespace-nowrap sm:text-2xl lg:text-3xl font-medium">
                  {selectedMentor.name}
                </h2>
                <div className="w-[6px] h-[6px] bg-[#D9D9D9] rounded-full" />
                <p className="text-base md:text-lg  whitespace-nowrap font-medium text-main">
                  {selectedMentor.location}
                </p>
              </div>

              <div className="flex justify-center md:justify-normal flex-wrap gap-2">
                {selectedMentor.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-[#EDEDED] rounded-[20px] px-4 py-1 text-[#666666] font-normal text-xs sm:text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <p className="text-[#484848]  text-center md:text-left max-w-[482px] font-normal text-sm sm:text-base">
                {selectedMentor.bio}
              </p>

              {/* Socials */}
              <div className="flex justify-center md:justify-normal items-center mt-5 gap-4">
                <a
                  href={selectedMentor.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="w-[22px] h-[22px] cursor-pointer text-[#0076B2]" />
                </a>
                <a
                  href={selectedMentor.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="w-[22px] h-[22px] cursor-pointer" />
                </a>
                <a
                  href={selectedMentor.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="w-[22px] h-[22px] cursor-pointer" />
                </a>
                <a href={selectedMentor.socials.email}>
                  <FaEnvelope className="w-[22px] h-[22px] cursor-pointer" />
                </a>
              </div>
            </div>

            {/* Right Button */}
            <FaChevronRight
              className="w-10 h-10 hidden md:block cursor-pointer text-[#2FBC8D]"
              onClick={goNext}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OurMentors;
