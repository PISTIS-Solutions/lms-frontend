"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import img from "@/src/assets/course/ansible.png";
import {
  BookText,
  Hourglass,
  LucideLoader2,
  LucideLockKeyhole,
} from "lucide-react";
// import axios from "axios";
import { urls } from "@/utils/config";
import Cookies from "js-cookie";
import refreshAdminToken from "@/utils/refreshToken";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCourseRead from "@/store/course-read";
import { motion } from "framer-motion";
import { createAxiosInstance } from "@/lib/axios";

interface cardProps {
  id: string;
  index: number;
  title: string;
  paragraph: string;
  duration: number;
  handleCardClick: any;
  isEnrolled: any;
  img: any;
  // cardLoad: boolean;
}

const CoursesCard = ({
  id,
  index,
  title,
  paragraph,
  duration,
  handleCardClick,
  isEnrolled,
  img,
}: // cardLoad,
cardProps) => {
  const [moduleCount, setModuleCount] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const { fetchCourseRead } = useCourseRead();
  const axios = createAxiosInstance();

  useEffect(() => {
    const getModuleCount = async () => {
      setLoading(true);
      try {
        const authToken = Cookies.get("authToken");
        const response = await axios.get(`${urls.courses}${id}/modules/`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.status === 200) {
          setModuleCount(response.data.length);
        } else {
          console.error(`Error fetching modules for course ${index}`);
          setModuleCount(0);
        }
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
        
        setModuleCount(0);
      } finally {
        setLoading(false);
      }
    };

    getModuleCount();
  }, []);

  const subscriptionStatus = Cookies.get("status");
  const isFreeSubscription = subscriptionStatus === "Free";

  const isLocked = isFreeSubscription && index > 3;
  const isLockedDisabled = isLocked;

  const handleEnroll = async (id: string) => {
    try {
      setEnrolling(true);
      const authToken = Cookies.get("authToken");
      const enrollmentEndpoint = `${urls.enrollCourses}`;

      const response = await axios.post(
        enrollmentEndpoint,
        {
          course: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        window.location.reload();
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      }
    } catch (error: any) {
      // console.log(error.response.data.message, "error")
      if (error.response && error.response.status === 401) {
        const refreshed = await refreshAdminToken();
        if (refreshed) {
          await handleEnroll(id);
        }
        return;
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
      } else if (
        error?.response?.data?.message ===
        "User already enrolled in this course."
      ) {
        toast.error(error?.response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      } else if (
        error?.response?.data?.message ===
        "Please complete previous course before enrolling in another."
      ) {
        toast.error(error?.response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      } else if (
        error.response.data.message ===
        "User currently enrolled in another course."
      ) {
        toast.error(
          "Complete present course before you can enroll on another!",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          }
        );
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
      setEnrolling(false);
    }
  };

  // const imageUrl = img?.replace("image/upload/", "");
  // console.log(img)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <ToastContainer />
      <div
        aria-disabled={isLockedDisabled || !isEnrolled}
        className={`w-full h-[374px] shadow-md rounded-[8px]  bg-[#FFF] ${
          isLockedDisabled || !isEnrolled
            ? "cursor-not-allowed "
            : "cursor-pointer"
        }`}
        onClick={
          isLockedDisabled || !isEnrolled
            ? undefined
            : () => {
                fetchCourseRead(id);
                handleCardClick(id);
              }
        }
      >
        <Image
          src={img}
          width={100}
          height={100}
          alt={title}
          unoptimized
          priority
          className={`rounded-tr-[4px] h-[191px] object-cover w-full rounded-tl-[4px] ${
            isEnrolled ? " " : " blur-sm"
          }`}
        />
        <div className="p-2">
          <div className="md:mb-10 mb-5">
            <h1 className="md:text-xl text-base font-medium">{title}</h1>
            <p className="md:text-lg text-xs text-[#3E3E3E]">{paragraph}</p>
          </div>
          <div className="flex items-center gap-x-4 mt-4">
            <div className="flex md:text-base text-xs items-center gap-x-1">
              <BookText className="text-main" />
              {loading ? (
                <LucideLoader2 className="animate-spin" />
              ) : (
                moduleCount
              )}{" "}
              module
            </div>
            <div className="flex md:text-base text-xs items-center gap-x-1">
              <Hourglass className="text-main" />
              {duration}
            </div>
          </div>
          <button
            onClick={() => {
              handleEnroll(id);
            }}
            disabled={isLockedDisabled || isEnrolled}
            className={`w-[95%] text-black absolute bottom-1 py-1 rounded-[4px] ${
              isLockedDisabled
                ? "cursor-not-allowed border text-white bg-[#DAE0E6]/50 text-sm md:text-lg my-2"
                : isEnrolled
                ? "bg-white cursor-pointer border border-sub hover:text-black text-sm md:text-lg my-2"
                : "bg-sub cursor-pointer hover:text-black text-sm md:text-lg my-2"
            }`}
          >
            {isEnrolled ? "Enrolled" : "Enroll"}
          </button>
        </div>
      </div>
      {isFreeSubscription && index > 3 && (
        <div className="p-2 bg-white cursor-pointer rounded-full w-[35px] h-[35px] flex justify-center items-center absolute top-2 right-2 hover:bg-red-500 duration-150 ease-in-out text-red-500 hover:text-white">
          <LucideLockKeyhole />
        </div>
      )}
    </motion.div>
  );
};

export default CoursesCard;
