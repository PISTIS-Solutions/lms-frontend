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

  // const [modal, setModal] = useState(false);
  // const handleOpen = () => {
  //   setModal((prev) => !prev);
  // };

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
              courses.map((course: any) => (
                <div key={course.id}>
                  <CoursesCard
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
        {/* {modal && (
          <section className="absolute top-0 flex justify-center items-center left-0 bg-slate-100/50 h-screen w-full">
            <div className="bg-white md:py-14 py-3 px-2 md:px-7 h-[200px] rounded-[8px] w-1/2 md:w-[608px]">
              <h1 className="md:text-2xl text-lg font-medium">Delete Course</h1>
              <p className="md:text-xl text-sm text-[#3E3E3E] font-normal">
                Are you sure you want to delete this course? You will not be
                able to retrieve it later
              </p>
              <div className="flex md:gap-x-2 gap-x-1 justify-between my-2 md:my-0 md:justify-end items-center">
                <Button className="bg-red-500 text-white text-sm md:text-lg rounded-[8px]">
                  Delete
                </Button>
                <p
                  className="cursor-pointer text-sm md:text-lg"
                  onClick={handleOpen}
                >
                  Cancel
                </p>
              </div>
            </div>
          </section>
        )} */}
      </div>
    </div>
  );
};

export default Courses;
