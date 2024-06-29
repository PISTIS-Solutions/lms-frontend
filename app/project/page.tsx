"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CoursesCard from "@/components/side-comp/courses-card";
import ProjectCard from "@/components/side-comp/project-card";
import SideNav from "@/components/side-comp/side-nav";
import { Loader2, Loader2Icon, Plus, Search, X } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "@/utils/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopNav from "@/components/side-comp/topNav";
import refreshAdminToken from "@/utils/refreshToken";
import useStudentStore from "@/store/dashboard-fetch";

const Project = () => {
  const router = useRouter();
  const { stuData, fetchStuData } = useStudentStore();

  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const [projects, setCourses] = useState<any | null>(null);
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const accessToken = Cookies.get("authToken");
      const response = await axios.get(urls.courses, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCourses(response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await fetchCourses();
      } else if (error?.message === "Network Error") {
        toast.error("Check your network!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      } else {
        toast.error(error?.response?.data?.detail, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
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
  
  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCardClick = (id: any) => {
    router.push(`/project/${id}`);
  };

  useEffect(() => {
    fetchStuData();
  }, []);

  const isEnrolled = (courseId: string) =>
    stuData?.enrolled_courses.some(
      (enrolledCourse: any) => enrolledCourse.id === courseId
    );

  return (
    <main className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <div className="lg:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[96px] h-[60px] flex justify-end items-center bg-white shadow-md p-4 w-full">
          <TopNav />
        </div>
        <div className="py-2 px-2 md:px-7">
          <div className="flex justify-end">
          </div>
          <div className="my-5 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-2 md:gap-5">
            {loading ? (
              <div className="w-[100%] flex items-center justify-center h-screen">
                <Loader2 className=" w-8 h-8 animate-spin" />
                <p>Loading Projects</p>
              </div>
            ) : projects && projects.length > 0 ? (
              projects.map((project: any) => (
                <div key={project.id}>
                  <ProjectCard
                    id={project.id}
                    handleCardClick={handleCardClick}
                    img={project.course_image_url}
                    title={project.title}
                    paragraph={project.paragraph}
                    module={project.module}
                    duration={project.duration}
                    project={project.project}
                    isEnrolled={isEnrolled(project.id)}
                  />
                </div>
              ))
            ) : (
              <p className="text-center">No projects available.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Project;
