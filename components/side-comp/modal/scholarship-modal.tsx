"use client";
import React from "react";
import { X } from "lucide-react";
import bgDots from "@/src/assets/bg-dots.png";
import { useRouter } from "next-nprogress-bar";

const ScholarshipModal = ({ setOpenScholarshipModal }: any) => {
  const tasks = [
    {
      title: "Complete Required Learning",
      small: "Finish all assigned video lessons and projects.",
    },
    {
      title: "Engage on Social Media",
      small: "Like, comment, and share our posts across platforms.",
    },
    {
      title: "Document Your Journey",
      small: "Share weekly updates and tag us on social media.",
    },
    {
      title: "Attend Live Sessions",
      small: "Be present for all webinars and live classes.",
    },
    {
      title: "Stay Active in the Community",
      small: "Participate on Slack and WhatsApp group discussions.",
    },
    {
      title: "Join Weekly Standups",
      small: "Show up for weekly check-ins and progress tracking.",
    },
    {
      title: "Collaborate with Peers",
      small: "Join a study group or partner up for peer reviews.",
    },
    {
      title: "Provide Feedback",
      small: "Share honest feedback through surveys and reviews.",
    },
    {
      title: "Complete Capstone Project",
      small: "Submit a final project to showcase your skills.",
    },
    {
      title: "Maintain Professionalism",
      small: "Stay committed, respectful, and open to learning.",
    },
  ];
  const router = useRouter();
  return (
    <div
      className="h-[90vh] w-[90%] sm:w-[80%] md:w-[70%] p-4 sm:p-6 rounded-[30px] bg-blend-overlay overflow-y-scroll bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgDots.src}), linear-gradient(#02A0FD, #02A0FD)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center justify-between">
        <span className="border border-white p-2 text-white rounded-[6px] text-sm sm:text-base md:text-lg font-medium">
          Scholarship Opportunities
        </span>
        <X
          className="text-white h-5 sm:w-7 w-5 sm:h-7"
          onClick={() => {
            setOpenScholarshipModal(false);
          }}
        />
      </div>
      <div>
        <h1 className="font-medium text-6xl sm:text-7xl md:text-[86px] text-white">
          DevOps{" "}
        </h1>
        <span className="lg:text-6xl text-3xl sm:text-5xl relative font-medium text-white">
          Scholarship Criteria
          <svg
            className="absolute left-0 bottom-0 w-full h-2"
            viewBox="50 0 200 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
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
            preserveAspectRatio="none"
          >
            <path
              d="M0 5 C50 10, 150 0, 200 5"
              stroke="#EF476F"
              strokeWidth="3"
              fill="transparent"
            />
          </svg>
        </span>
        <p className="text-white text-xs sm:text-sm md:text-base font-medium py-4">
          To be considered for this scholarship, you must strictly adhere to all
          the listed criteria. <br /> Only applicants who actively meet these
          requirements will be shortlisted and move forward in the selection
          process. Your consistency and commitment are key to qualifying.
        </p>
      </div>
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4">
        {tasks.map((task, index) => {
          return (
            <div
              key={index}
              className="w-full p-2 rounded-[6px] text-white bg-[#FFFFFF29] h-auto xl:h-[68px] relative"
            >
              <div className="bg-white rounded-tr-[4px] rounded-br-[4px] w-[4px] h-[40px] sm:h-[51px] absolute left-0 top-2 md:top-2.5" />
              <span className="flex flex-col gap-0.5 pl-3">
                <h3 className="sm:text-base text-sm font-medium">
                  {task.title}
                </h3>
                <p className="sm:text-sm text-[10px] font-medium">
                  {task.small}
                </p>
              </span>
            </div>
          );
        })}
      </div>
      <p className="my-3 text-white font-medium md:text-xs text-base">
        By clicking on enroll now I agree to the terms and conditions of the
        DevOps Scholarship, and I commit to fulfilling all the listed
        requirements to maintain my eligibility.
      </p>
      <div className="w-full mx-auto flex justify-center">
        <button
          onClick={() => {
            router.push("/create-scholarship-account");
          }}
          className="text-white bg-[#FF1456] rounded-[12px] p-4 font-medium md:text-xs text-base w-1/2"
        >
          Enroll now
        </button>
      </div>
    </div>
  );
};

export default ScholarshipModal;
