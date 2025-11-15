"use client";
import SideNav from "@/components/side-comp/side-nav";
import React, { useEffect, useState } from "react";

import { Loader2Icon, Plus, Search } from "lucide-react";
import CoursesCard from "@/components/side-comp/courses-card";

import { useRouter } from "next-nprogress-bar";
import TopNav from "@/components/side-comp/topNav";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "@/utils/config";
import refreshAdminToken from "@/utils/refreshToken";
import useStudentStore from "@/store/dashboard-fetch";
import { createAxiosInstance } from "@/lib/axios";

const Courses = () => {
  const router = useRouter();
  const [courses, setCourses] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const { stuData, fetchStuData } = useStudentStore();
  const [courseType, setCourseType] = useState<"Intermediate" | "Advanced">(
    "Intermediate"
  );
  const axios = createAxiosInstance();
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const accessToken = Cookies.get("authToken");
        const response = await axios.get(
          `${urls.courses}?course_category=${courseType}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setCourses(response.data);
        // console.log(response.data, "cd")
      } catch (error: any) {
        toast.error(error?.response?.data?.detail, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [courseType]);

  const handleCardClick = (id: any) => {
    router.push(`/courses/${id}`);
  };

  useEffect(() => {
    fetchStuData();
  }, []);

  const isEnrolled = (courseId: string) =>
    stuData?.courses_enrolled?.some(
      (enrolledCourse: any) => enrolledCourse.id === courseId
    );

  return (
    <div className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <ToastContainer />
      <div className="lg:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[96px] h-[60px] flex justify-end items-center bg-white shadow-md p-4 w-full">
          <TopNav />
        </div>
        <div className="py-2 px-2 md:px-7">
          <div className="rounded-[6px] p-2 border border-[#DADADA] my-2 inline-flex items-center gap-5">
            <span
              onClick={() => setCourseType("Intermediate")}
              className={`"text-[#9F9F9F] cursor-pointer text-sm font-normal ${
                courseType === "Intermediate"
                  ? "bg-main rounded-[6px] p-2 text-white"
                  : "bg-white"
              } `}
            >
              <p>Intermediate Course</p>
            </span>
            <span
              onClick={() => setCourseType("Advanced")}
              className={`"text-[#9F9F9F] cursor-pointer text-sm font-normal ${
                courseType === "Advanced"
                  ? "bg-main rounded-[6px] p-2 text-white"
                  : "bg-white"
              } `}
            >
              <p>Advanced Course</p>
            </span>
          </div>
          <div className="my-5 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-2 md:gap-5">
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
                    img={course.course_image}
                    title={course.title}
                    paragraph={course.paragraph}
                    duration={course.course_duration}
                    isEnrolled={isEnrolled(course.id)}
                    module_count={course?.module_count}
                    course_category={course?.course_category}
                  />
                </div>
              ))
            ) : (
              <p className="text-center lg:text-base text-sm">
                No courses available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
