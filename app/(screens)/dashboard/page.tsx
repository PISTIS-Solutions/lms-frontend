"use client";
import SideNav from "@/components/side-comp/side-nav";
import React, { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

import { BookOpenText, BookText, ListChecks } from "lucide-react";
import PaginatedTable from "@/components/side-comp/pagination-table-students";
import PaginatedTableMentor from "@/components/side-comp/pagination-table mentor";

import { courseList } from "@/data/courses";
import Image from "next/image";

import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ProjectReview from "@/components/side-comp/project-review-table";

import { vectorb, vectorg } from "../../index";

const tags = [
  "Project submission by Femi Oyewale",
  "Project submission by Femi Oyewale",
  "Project submission by Femi Oyewale",
  "Project submission by Femi Oyewale",
  "Project submission by Femi Oyewale",
  "Project submission by Femi Oyewale",
  "Project submission by Femi Oyewale",
  "Project submission by Femi Oyewale",
  "Project submission by Femi Oyewale",
  "Project submission by Femi Oyewale",
];

const Dashboard = () => {
  const [table, setTable] = useState("students");

  const changeTableMentors = () => {
    setTable("mentors");
  };
  const changeTableStudents = () => {
    setTable("students");
  };

  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: ["Completed", "Not Started"],
    datasets: [
      {
        label: "Completed",
        data: [80, 19],
        backgroundColor: ["#C36", "#3C9"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <main className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <div className="md:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[96px] h-[60px] flex justify-end items-center bg-white shadow-md p-4 w-full">
          <div className="flex items-center gap-1 md:gap-2">
            <Avatar>
              {/* <AvatarImage src={avatar} /> */}
              <AvatarFallback>JN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="md:text-base text-sm font-medium">John Mark</h1>
              <p className="md:text-sm text-xs text-[#5D5B5B]">Student</p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-10 p-4">
            <div className=" col-span-1 lg:col-span-7">
              <div className="w-[98%] rounded-[8px] bg-white md:h-[133px] h-[128px] flex justify-between pl-5 shadow-md mr-5 mb-2">
                <div className="md:mt-[38px] mt-[30px]">
                  <h1 className="text-xl md:text-2xl font-semibold">
                    Welcome Beatrice
                  </h1>
                  <p className="md:text-base text-sm">
                    Complete your course and take a step further💪
                  </p>
                </div>
                <div className="">
                  <Image src={vectorg} alt="" priority className="z-10 relative" />
                  <Image src={vectorb} alt="" priority className="relative md:bottom-[101px] bottom-[65px] md:left-[23px]" />
                </div>
              </div>
              <div className="lg:flex block justify-between gap-0 md:gap-5 pr-4">
                <div className="w-full h-[128px] rounded-[8px] border-t-4 bg-white border-t-sub flex items-center justify-between px-5">
                  <div>
                    <h1 className="text-2xl text-[#5D5B5B] font-medium">15</h1>
                    <p className="text-base text-[#00173A]">Total Courses</p>
                  </div>
                  <span className="bg-[#F8F9FF] rounded-full p-3">
                    <BookOpenText className="text-main" />
                  </span>
                </div>
                <div className="w-full h-[128px] rounded-[8px] border-t-4 bg-white border-t-main flex items-center justify-between px-5">
                  <div>
                    <h1 className="text-2xl text-[#5D5B5B] font-medium">60</h1>
                    <p className="text-base text-[#00173A]">Completed Courses</p>
                  </div>
                  <span className="bg-[#F8F9FF] rounded-full p-3">
                    <BookText className="text-main" />
                  </span>
                </div>
                <div className="w-full h-[128px] rounded-[8px] border-t-4 bg-white border-t-[#CC3366] flex items-center justify-between px-5">
                  <div>
                    <h1 className="text-2xl text-[#5D5B5B] font-medium">6</h1>
                    <p className="text-base text-[#00173A]">Completed project</p>
                  </div>
                  <span className="bg-[#F8F9FF] rounded-full p-3">
                    <ListChecks className="text-main" />
                  </span>
                </div>
              </div>
              <div className="w-[98%] bg-white shadow-md rounded-[8px] p-5 mr-5 my-3">
                <div className="flex justify-between items-end">
                  <h1 className="text-md md:text-xl font-semibold">
                    My Courses
                  </h1>
                  <p className="underline text-main text-xs md:text-sm">
                    View all
                  </p>
                </div>
                <div className="md:flex justify-between my-5">
                  {courseList.map((course, index) => {
                    return (
                      <div
                        key={index}
                        className="rounded-[8px] mr-[12px] my-2 md:my-0 relative bg-[#F8F9FF] w-[242px] h-[234px]"
                      >
                        <div>
                          <Image src={course.image} alt={course.courseTitle} />
                        </div>
                        <div className="p-2">
                          <h3 className="text-xl font-medium">
                            {course.courseTitle}
                          </h3>
                          <p className="absolute bottom-0 cursor-pointer right-2 capitalize text-[#3E3E3E] font-medium flex items-center gap-1">
                            {course.condition}{" "}
                            {course.condition === "completed" ? (
                              <span className="text-main">
                                <IoIosCheckmarkCircleOutline />
                              </span>
                            ) : (
                              <span className="text-main">
                                <FaArrowRight />
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="col-span-3">
              <div className="bg-white h-[370px] md:h-[275px] rounded-[8px] p-2 shadow-sm ">
                <h1 className="md:text-2xl text-lg font-medium mb-4">
                  Your Activity
                </h1>
                <div>
                  <ScrollArea className="w-full h-[300px] md:h-[200px] rounded-md">
                    <div>
                      {tags.map((tag, index) => (
                        <>
                          <div
                            key={index}
                            className="flex items-center gap-3 md:gap-4 py-2 md:py-3 px-1 md:px-2 cursor-pointer hover:bg-main hover:text-white duration-150 ease-in-out bg-[#FBFBFB] my-2 rounded-[8px]"
                          >
                            <Avatar className="md:w-[61px] w-[40px] md:h-[61px] h-[40px] hover:text-black">
                              {/* <AvatarImage src={avatar} /> */}
                              <AvatarFallback>JN</AvatarFallback>
                            </Avatar>
                            <p className="md:text-lg text-sm">{tag}</p>
                          </div>
                        </>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
              <div className="border-md bg-white rounded-[8px] p-2 h-[53.5%] shadow-xl w-auto mt-2">
                <h1 className="text-xl">Progress Report</h1>
                <Doughnut data={data} />
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="bg-white rounded-[8px] p-2">
              <span className="flex justify-between items-center">
                <h1 className="text-2xl font-medium my-4">Project Review</h1>
                <p className="text-sm text-main underline cursor-pointer">
                  view all
                </p>
              </span>
              <ProjectReview />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
