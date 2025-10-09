"use client";
import React, { useState } from "react";
import Image from "next/image";

import landingBck from "@/src/assets/landingBck.png";
import boy from "@/src/assets/boy.png";
import guy from "@/src/assets/guy.png";

import { MdOutlineLaunch } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";

import Footer from "@/components/side-comp/landing/footer";
import NavigationBar from "@/components/side-comp/nav";
import { motion } from "framer-motion";
import LandingPayment from "@/components/side-comp/landing/payment";
import Benefits from "@/components/side-comp/landing/benefits";
import Slides from "@/components/side-comp/landing/slides";
import Learning from "@/components/side-comp/landing/learning";
import Link from "next/link";
import Sponsors from "@/components/side-comp/landing/Sponsors";
import OurMentors from "@/components/side-comp/landing/mentors";
import ScholarshipModal from "@/components/side-comp/modal/scholarship-modal";

const HomePage = () => {
  //faq
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleOpenFAQ = (index: any) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  const faqs = [
    {
      ques: "What is DevOps, and why is it important?",
      ans: "DevOps is a set of practices that combines software development (Dev) and IT operations (Ops) to improve collaboration, automate processes, and deliver software faster and more reliably. It’s important because it helps teams release better products more efficiently.",
    },
    {
      ques: "Do I need programming experience to take a DevOps course?",
      ans: "Some basic knowledge of programming is helpful but not required. We offer beginner courses that start from the basics, as well as advanced courses for more experienced developers.",
    },
    {
      ques: "What tools and technologies will I learn in these DevOps courses?",
      ans: "Our DevOps courses cover a wide range of tools such as Docker, Kubernetes, Jenkins, Ansible, Terraform, Git, and CI/CD pipelines. The tools you learn depend on the specific course you choose.",
    },
    {
      ques: "Are your DevOps courses hands-on?",
      ans: "Yes! We emphasize practical learning through hands-on projects and labs where you can apply DevOps tools and practices in real-world scenarios.",
    },
    {
      ques: "What career opportunities can I pursue after completing a DevOps course?",
      ans: "With DevOps skills, you can pursue roles like DevOps Engineer, Site Reliability Engineer (SRE), Automation Engineer, or Cloud Infrastructure Engineer, among others.",
    },
    {
      ques: "How long does it take to complete a DevOps course?",
      ans: "Course durations vary. Some can be completed in a few weeks, while others may take a few months, depending on the depth of the material and your pace.",
    },
    {
      ques: "Will I get a certification after completing a DevOps course?",
      ans: "Yes, you will receive a certificate upon successful completion of any DevOps course, which can be added to your resume or professional profile.",
    },
    {
      ques: "What if I have questions or need help during the course?",
      ans: "You’ll have access to our support team and instructor-led discussions, as well as peer forums where you can connect with other learners and get assistance. ",
    },
  ];

  const [openScholarshipModal, setOpenScholarshipModal] = useState(false);
  return (
    <div className="bg-white">
      <NavigationBar />
      <div className=" mx-3 md:bg-none h-[100vh] bg-cover md:rounded-none rounded-[32px] bg-landingBck md:mx-7 xl:mx-14 relative">
        <Image
          src={landingBck}
          alt="landing background"
          priority
          className="w-full h-full object-cover rounded-2xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute ml-0 xl:ml-6 my-0 xl:my-4 p-4 xl:p-5 left-0 top-0"
        >
          <div className="rounded-[6px] text-white bg-white/20 block text-center md:inline-block px-4 py-1 xl:py-2 font-medium text-xs md:text-sm xl:text-lg">
            🚀 Pistis Sprint & Slash DevOps Challenge
          </div>

          <h1 className="xl:text-5xl text-2xl md:text-4xl font-normal py-2 xl:py-4 text-white sm:text-left text-center">
            {/* DevOps Engineering <br />{" "} */}
            <span className="relative font-medium text-3xl md:text-5xl xl:text-7xl inline-block">
              {/* Your Hustle. Your Path. Your Discount. */}
              <p>Your Path</p>
              <p>Your Hustle</p>
              <p>Your discount</p>
              <svg
                className="absolute left-0 bottom-0 w-full h-2"
                viewBox="50 0 200 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none" // optional: helps with resizing
              >
                <path
                  d="M0 5 C50 10, 150 0, 200 5"
                  stroke="#EF476F"
                  strokeWidth="3"
                  fill="transparent"
                />
              </svg>
              <svg
                className="absolute left-2 bottom-1 w-[90%] h-2"
                viewBox="0 0 200 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none" // optional: helps with resizing
              >
                <path
                  d="M0 5 C50 10, 150 0, 200 5"
                  stroke="#EF476F"
                  strokeWidth="3"
                  fill="transparent"
                />
              </svg>
            </span>
          </h1>
          <p className="xl:text-base text-xs sm:text-left text-center md:text-sm font-normal max-w-[581px] pb-2 text-white">
            Are you eager to launch a career in DevOps but limited by cost? The
            Sprint & Slash Challenge is your shot to earn a massive discount on
            our premium DevOps training—by showing your consistency, curiosity,
            and commitment.
          </p>
          <div className="mb-2">
            <p className="text-white font-bold text-xs sm:text-sm">
              What's Included?
            </p>
            <div className="flex flex-wrap w-full sm:w-[60%] gap-2">
              {[
                "Hands-on projects",
                "Career mentorship",
                "Expert-led training",
                "Networking with industry leaders",
                "Community Support",
                "Certification",
              ].map((text, index) => (
                <div
                  key={index}
                  className="text-white text-[10px] sm:text-base font-medium bg-white/15 rounded-md py-2 px-4 text-center"
                >
                  {text}
                </div>
              ))}
            </div>
          </div>
          {/* <Link href="/create-account"> */}
          <button
            onClick={() => {
              setOpenScholarshipModal(true);
            }}
            className="bg-[#FF1456] rounded-[8px] hover:text-main hover:border hover:border-main transition-all ease-in duration-150 hover:bg-white font-medium text-xs md:text-sm xl:text-base py-2 lg:py-4 sm:w-auto w-full px-3 lg:px-6 text-white flex items-center justify-center sm:justify-between gap-2 cursor-pointer"
          >
            Join the Sprint & Slash Challenge{" "}
            <MdOutlineLaunch className="sm:w-6 w-4 h-4 sm:h-6" />
          </button>
          {/* </Link> */}
        </motion.div>
      </div>
      <Sponsors />
      <Benefits />
      <div className=" overflow-x-hidden block lg:flex items-center justify-center lg:justify-between gap-10 md:gap-20 p-4 md:p-20 bg-main bg-curve bg-bottom bg-contain bg-no-repeat">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 100 }}
          transition={{ duration: 0.5 }}
          className="hidden md:block w-[500px] max-w-[570px]"
        >
          <Image alt="boy" src={boy} />
        </motion.div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 100 }}
          transition={{ duration: 0.5 }}
          className="md:max-w-[550px] max-w-full py-0 md:py-4"
        >
          <p className="bg-transparent border border-white rounded-[6px] py-2 px-2 md:px-4 text-xs md:text-base font-medium inline-block text-white">
            Optimize Software Delivery
          </p>
          <h1 className="font-medium md:text-left text-center text-4xl md:text-5xl my-5 text-white">
            <span className="font-semibold relative underline-custom">
              Master the Future
            </span>{" "}
            of IT with DevOps
          </h1>
          <p className="text-sm md:text-base mb-5 text-white md:text-left text-center font-sfProDisplay">
            Join the next generation of DevOps engineers and acquire the
            expertise to revolutionize how businesses build, test, and deploy
            software. Whether you're just starting out or looking to advance
            your skills, our program will equip you with the tools to automate
            processes, enhance efficiency, and lead in a fast-paced, high-demand
            field.
          </p>
          <div className="flex flex-wrap md:justify-normal justify-center gap-2  md:gap-3">
            <p className="font-medium text-xs sm:text-sm text-white rounded-[6px] bg-[#FFFFFF29] inline-block py-2 px-4">
              Transform Your DevOps Skills
            </p>
            <p className="font-medium text-xs sm:text-sm text-white rounded-[6px] bg-[#FFFFFF29] inline-block py-2 px-4">
              Boost Your Career in Tech
            </p>
            <p className="font-medium text-xs sm:text-sm text-white rounded-[6px] bg-[#FFFFFF29] inline-block py-2 px-4">
              Hands-On DevOps Training
            </p>
            <p className="font-medium text-xs sm:text-sm text-white rounded-[6px] bg-[#FFFFFF29] inline-block py-2 px-4">
              Master CI/CD and Cloud
            </p>
            <p className="font-medium text-xs sm:text-sm text-white rounded-[6px] bg-[#FFFFFF29] inline-block py-2 px-4">
              Learn from DevOps Experts
            </p>
            <p className="font-medium text-xs sm:text-sm text-white rounded-[6px] bg-[#FFFFFF29] inline-block py-2 px-4">
              Real-World DevOps Projects
            </p>
          </div>
        </motion.div>
      </div>
      <Slides />
      <OurMentors />
      <Learning />
      <LandingPayment />
      <div
        id="faq"
        className="bg-white scroll-smooth md:p-[0_5rem_5rem_5rem] p-[0_6px_6px_6px] sm:p-[0_3rem_3rem_3rem]"
      >
        <div className="flex flex-col items-center gap-y-2">
          <motion.p
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 100 }}
            transition={{ duration: 0.5 }}
            className="rounded-[6px] py-2 px-6 bg-[#FF105314] font-sfProDisplay text-xs sm:text-base font-normal text-[#FF1053] inline-block text-center "
          >
            FAQ
          </motion.p>
          <motion.h1
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 100 }}
            transition={{ duration: 0.7 }}
            className="text-main font-semibold text-center text-[28px] md:text-[32px] "
          >
            Frequently Asked Questions
          </motion.h1>
        </div>
        <div className="flex flex-col justify-center items-center py-5">
          {faqs.map((faq, index) => (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 100 }}
              transition={{ duration: 0.5 }}
              key={index}
              onClick={() => handleOpenFAQ(index)}
              className={`cursor-pointer ${
                selectedIndex === index
                  ? "bg-[#FAFAFA] shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
                  : "border border-[#9F9F9F] bg-white"
              } rounded-[10px] my-2 md:my-4 w-full lg:w-3/5 transition-all duration-300`}
            >
              <div className="flex items-center justify-between gap-4 p-3 md:p-5">
                <p
                  className={`${
                    selectedIndex === index ? "text-main" : "text-[#9F9F9F]"
                  } text-base lg:text-lg font-semibold transition-colors duration-300`}
                >
                  {faq.ques}
                </p>
                {selectedIndex === index ? (
                  <CiCircleMinus className="w-6  h-6 flex-none text-base md:text-lg transition-transform duration-300" />
                ) : (
                  <CiCirclePlus className="w-6  h-6 flex-none text-base md:text-lg transition-transform duration-300" />
                )}
              </div>
              <div
                className={`transition-all duration-500 ease-in-out overflow-scroll ${
                  selectedIndex === index
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-[#484848] p-2 md:p-5 font-normal text-sm md:text-base font-sfProDisplay">
                  {faq.ans}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="bg-[#000066] md:p-0 p-4 sm:p-10 flex justify-center items-center h-[788px]  ">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className=" rounded-[40px] flex items-center justify-between bg-[#000066] p-10 md:p-20 relative max-w-[1200px] shadow-[0_0_160px_0_rgba(0,0,0,0.4)]"
        >
          <div className="flex flex-col w-full md:w-1/2 gap-10 mr-0 md:mr-10">
            <h1 className="text-white md:text-left z-10 text-center font-medium text-3xl md:text-5xl">
              Ready to Start Your DevOps Journey?
            </h1>
            <p className="md:text-base md:text-left text-center z-10 text-sm font-normal text-white">
              Join our vibrant community of aspiring engineers and embark on a
              transformative journey to unlock the skills needed for success in
              the ever-evolving world of DevOps. Together, we’ll equip you with
              the knowledge and practical experience to thrive in a dynamic
              industry!
            </p>
            <Link href="/pricing">
              <button className="rounded-[8px] z-10 bg-sub w-full md:w-1/2 py-3 font-sfProDisplay cursor-pointer text-white font-medium text-base ">
                Enroll Today
              </button>
            </Link>
          </div>
          <Image
            className="absolute right-0 max-h-[689px] max-w-[618px]"
            alt="guy"
            src={guy}
          />
        </motion.div>
      </div>
      <Footer />
      {openScholarshipModal && (
        <div
          onClick={() => {
            setOpenScholarshipModal(false);
          }}
          className="w-full h-full flex justify-center items-center fixed top-0 left-0 bg-[rgba(255,255,255,0.3)] backdrop-blur-lg z-50"
        >
          <ScholarshipModal setOpenScholarshipModal={setOpenScholarshipModal} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
