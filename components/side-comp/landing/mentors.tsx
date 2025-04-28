"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ment1 from "@/src/assets/mentors/ment1.png";
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const mentors = [
  {
    image: ment1,
    name: "Amaka Johnson",
    location: "Lagos, Nigeria",
    techStack: ["React", "Next.js", "TypeScript"],
    bio: "Frontend engineer passionate about building accessible web applications. This guy too sabi, honestly but sapa dey deal with am, make he try work harder.",
    socials: {
      linkedin: "https://linkedin.com/in/amaka-johnson",
      github: "https://github.com/amaka-dev",
      twitter: "https://twitter.com/amaka_codes",
      email: "mailto:amaka@example.com",
    },
  },
  {
    image: ment1,
    name: "Tunde Bello",
    location: "Abuja, Nigeria",
    techStack: ["Node.js", "Express", "MongoDB"],
    bio: "Backend developer focused on building fast and scalable APIs.",
    socials: {
      linkedin: "https://linkedin.com/in/tunde-bello",
      github: "https://github.com/tundebello",
      twitter: "https://twitter.com/tundebuilds",
      email: "mailto:tunde@example.com",
    },
  },
  {
    image: ment1,
    name: "Chioma Adeyemi",
    location: "Port Harcourt, Nigeria",
    techStack: ["Flutter", "Dart", "Firebase"],
    bio: "Mobile developer crafting seamless cross-platform applications.",
    socials: {
      linkedin: "https://linkedin.com/in/chioma-adeyemi",
      github: "https://github.com/chiomadev",
      twitter: "https://twitter.com/chioma_apps",
      email: "mailto:chioma@example.com",
    },
  },
  {
    image: ment1,
    name: "David Ekene",
    location: "Ibadan, Nigeria",
    techStack: ["Python", "Django", "PostgreSQL"],
    bio: "Backend engineer and database specialist passionate about data-driven systems.",
    socials: {
      linkedin: "https://linkedin.com/in/david-ekene",
      github: "https://github.com/davidekene",
      twitter: "https://twitter.com/davidekene",
      email: "mailto:david@example.com",
    },
  },
  {
    image: ment1,
    name: "Fatima Yusuf",
    location: "Kano, Nigeria",
    techStack: ["AWS", "DevOps", "Docker"],
    bio: "Cloud engineer helping businesses scale infrastructure efficiently.",
    socials: {
      linkedin: "https://linkedin.com/in/fatima-yusuf",
      github: "https://github.com/fatimacloud",
      twitter: "https://twitter.com/fatimaclouds",
      email: "mailto:fatima@example.com",
    },
  },
  {
    image: ment1,
    name: "Emeka Ogbuehi",
    location: "Lagos, Nigeria",
    techStack: ["Java", "Spring Boot", "Kubernetes"],
    bio: "Software engineer specializing in enterprise backend systems.",
    socials: {
      linkedin: "https://linkedin.com/in/emeka-ogbuehi",
      github: "https://github.com/emekaog",
      twitter: "https://twitter.com/emekacodes",
      email: "mailto:emeka@example.com",
    },
  },
  {
    image: ment1,
    name: "Blessing Okoro",
    location: "Enugu, Nigeria",
    techStack: ["Figma", "UI/UX", "Design Systems"],
    bio: "Product designer passionate about creating user-centric experiences.",
    socials: {
      linkedin: "https://linkedin.com/in/blessing-okoro",
      github: "https://github.com/blessingdesigns",
      twitter: "https://twitter.com/blessux",
      email: "mailto:blessing@example.com",
    },
  },
  {
    image: ment1,
    name: "Samuel Adebayo",
    location: "Lagos, Nigeria",
    techStack: ["C#", ".NET", "Azure"],
    bio: "Software architect with experience in building enterprise cloud solutions.",
    socials: {
      linkedin: "https://linkedin.com/in/samuel-adebayo",
      github: "https://github.com/samadebayo",
      twitter: "https://twitter.com/samcloudbuilds",
      email: "mailto:samuel@example.com",
    },
  },
  {
    image: ment1,
    name: "Nneka Obi",
    location: "Awka, Nigeria",
    techStack: ["HTML", "CSS", "JavaScript"],
    bio: "Self-taught frontend developer with a passion for animations and interactivity.",
    socials: {
      linkedin: "https://linkedin.com/in/nneka-obi",
      github: "https://github.com/nnekaobi",
      twitter: "https://twitter.com/nnekadev",
      email: "mailto:nneka@example.com",
    },
  },
  {
    image: ment1,
    name: "Victor Umeh",
    location: "Lagos, Nigeria",
    techStack: ["Go", "Microservices", "Redis"],
    bio: "Backend engineer passionate about distributed systems and APIs.",
    socials: {
      linkedin: "https://linkedin.com/in/victor-umeh",
      github: "https://github.com/victorumeh",
      twitter: "https://twitter.com/victorapis",
      email: "mailto:victor@example.com",
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

      {/* Mentors List */}
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
                alt={mentor.name}
                className="md:w-[154px] h-[100px] w-[100px] md:h-[154px]  rounded-[8px]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mentor Details */}
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
              className="lg:w-[388px] w-[250px] sm:w-[320px] h-[250px] sm:h-[320px] lg:h-[388px]"
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
