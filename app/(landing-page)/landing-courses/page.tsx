"use client";
import React, { useEffect } from "react";

import NavigationBar from "@/components/side-comp/nav";
import useStudentsStore from "@/store/fetch-students-landing";
import Coursecard from "@/components/side-comp/course-card";

import { Loader2Icon } from "lucide-react";
import LandingPayment from "@/components/side-comp/landing/payment";
import Footer from "@/components/side-comp/landing/footer";

const LandingCourses = () => {
  const { students, fetchStudents, loading } = useStudentsStore();

  useEffect(() => {
    fetchStudents();
  }, []);
  return (
    <div className="bg-white">
      <div className="bg-whtcurve bg-top bg-no-repeat h-[100%]">
        <NavigationBar />

        <div className="flex flex-col items-center gap-6 py-10 md:py-16">
          <div className="rounded-[30px] text-center bg-[#CDEFE4] px-5 py-2 text-[#15553F] font-normal text-sm md:text-base inline-block">
            <p>Advance Your Career with</p>
          </div>
          <h1 className="text-main text-5xl md:text-7xl text-center max-w-full md:max-w-[1138px] font-light">
            Expert-Led Courses and{" "}
            <span className="font-semibold italic">
              Master In-Demand Skills
            </span>
          </h1>
          <p className="text-[#484848] text-base md:text-lg text-center max-w-[836px] font-normal">
            Explore expertly designed courses that empower you to grow, learn,
            and excel in your career. Join thousands of learners taking the next
            step towards professional success today.
          </p>
        </div>
        <div className="relative py-6 md:py-10">
          <div className="absolute left-0 top-0 h-full w-14 md:w-20 pointer-events-none bg-gradient-to-r from-white" />
          <div className="flex gap-6 overflow-x-scroll py-10">
            {loading ? (
              <span className="text-main w-full flex items-center justify-center">
                <Loader2Icon className="animate-spin" />
                <p className="text-lg md:text-xl">Loading...</p>
              </span>
            ) : students?.course_details &&
              students?.course_details.length > 0 ? (
              students?.course_details.map((course: any, index: number) => {
                return (
                  <Coursecard
                    key={course.id}
                    id={course.id}
                    index={index}
                    image={course.course_image}
                    header={course.title}
                    moduleCount={course.module_count}
                    duration={course.course_duration}
                  />
                );
              })
            ) : (
              <p className="text-center w-full lg:text-xl font-semibold absolute text-main text-sm">
                No course available yet!
              </p>
            )}
          </div>
          <div className="absolute right-0 top-0 h-full w-14 md:w-20 pointer-events-none bg-gradient-to-l from-white" />
        </div>
        <LandingPayment />
        <Footer />
      </div>
    </div>
  );
};

export default LandingCourses;
