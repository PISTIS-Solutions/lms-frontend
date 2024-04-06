"use client";
import SideNav from "@/components/side-comp/side-nav";
import React, { useEffect, useState } from "react";

import { Loader2Icon, Plus, Search } from "lucide-react";
import CoursesCard from "@/components/side-comp/courses-card";

import { useRouter } from "next/navigation";
import TopNav from "@/components/side-comp/topNav";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useStudentStore from "@/store/dashboard-fetch";
import useCourseStore from "@/store/fetch-courses";

const Courses = () => {
  const router = useRouter();
  const handleCardClick = (id: any) => {
    router.push(`/courses/${id}`);
  };

  const { stuData, enrolled_courses, fetchStuData } = useStudentStore();
  const { courses, loading, fetchStuCourses } = useCourseStore();

  useEffect(() => {
    fetchStuCourses();
    fetchStuData();
  }, []);

  const isEnrolled = (courseId: string) =>
    stuData?.enrolled_courses.some(
      (enrolledCourse: any) => enrolledCourse.id === courseId
    );

  return (
    <div className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <ToastContainer />
      <div className="md:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[96px] h-[60px] flex justify-end items-center bg-white shadow-md p-4 w-full">
          <TopNav />
        </div>
        <div className="py-2 px-2 md:px-7">
          <div className="my-5 grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5">
            {loading ? (
              <span className="flex text-center justify-center items-center">
                <Loader2Icon className=" animate-spin" />
                Loading...
              </span>
            ) : courses && courses.length > 0 ? (
              courses.map((course: any, index: any) => (
                <div key={course.id}>
                  <CoursesCard
                    index={index}
                    id={course.id}
                    handleCardClick={handleCardClick}
                    // handleOpen={handleOpen}
                    // img={fake.img}
                    title={course.title}
                    paragraph={course.paragraph}
                    duration={course.course_duration}
                    isEnrolled={isEnrolled(course.id)}
                  />
                </div>
              ))
            ) : (
              <p className="text-center">No courses available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
