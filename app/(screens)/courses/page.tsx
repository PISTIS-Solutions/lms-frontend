"use client";
import SideNav from "@/components/side-comp/side-nav";
import React, { useEffect, useState } from "react";

import { Loader2Icon, Plus, Search } from "lucide-react";
import CoursesCard from "@/components/side-comp/courses-card";

import { useRouter } from "next/navigation";
import TopNav from "@/components/side-comp/topNav";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "@/utils/config";
import refreshAdminToken from "@/utils/refreshToken";
import useStudentStore from "@/store/dashboard-fetch";

const Courses = () => {
  const router = useRouter();
  const [courses, setCourses] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const { stuData, fetchStuData } = useStudentStore();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const accessToken = Cookies.get('authToken');
        const response = await axios.get(urls.courses, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setCourses(response.data.results);
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          await refreshAdminToken();
          await fetchCourses();
        } else if (error?.message === "Network Error") {
          toast.error("Check your network!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
        } else {
          toast.error(error?.response?.data?.detail, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleCardClick = (id: any) => {
    router.push(`/courses/${id}`);
  };

  useEffect(() => {
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
      <div className="lg:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[96px] h-[60px] flex justify-end items-center bg-white shadow-md p-4 w-full">
          <TopNav />
        </div>
        <div className="py-2 px-2 md:px-7">
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
                    // img={fake.img}
                    title={course.title}
                    paragraph={course.paragraph}
                    duration={course.course_duration}
                    isEnrolled={isEnrolled(course.id)}
                  />
                </div>
              ))
            ) : (
              <p className="text-center lg:text-base text-sm">No courses available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
