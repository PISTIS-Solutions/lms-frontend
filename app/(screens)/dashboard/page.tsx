"use client";
import SideNav from "@/components/side-comp/side-nav";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  BookOpenText,
  BookText,
  ListChecks,
  Loader2,
  CalendarDays,
  X,
} from "lucide-react";
import Image from "next/image";

import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ProjectReview from "@/components/side-comp/project-review-table";

import { vectorb, vectorg } from "../../index";
import TopNav from "@/components/side-comp/topNav";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import useStudentStore from "@/store/dashboard-fetch";
import axios from "axios";
import { urls } from "@/utils/config";
import refreshAdminToken from "@/utils/refreshToken";
import { Button } from "@/components/ui/button";
import Pricing from "../pricing/page";
import PricingCard from "@/components/side-comp/pricing-card";
import PaidPricing from "@/components/side-comp/paid-pricing";

const formatDate = (isoDateString: any) => {
  const date = new Date(isoDateString);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  let day = date.getDate();
  let daySuffix;
  if (day === 1 || day === 21 || day === 31) {
    daySuffix = "st";
  } else if (day === 2 || day === 22) {
    daySuffix = "nd";
  } else if (day === 3 || day === 23) {
    daySuffix = "rd";
  } else {
    daySuffix = "th";
  }

  // Year in "2024" format
  const year = date.getFullYear();

  return `${month} ${day}${daySuffix}, ${year}`;
};

const Dashboard = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const route = useRouter();
  //fetch dashboard data with acceess token and use refresh token to refresh expired token
  const { stuData, loading, fetchStuData } = useStudentStore();

  //activities endpoint
  const [activity, setActivities] = useState<any>([]);
  const userActivity = async () => {
    try {
      const accessToken = Cookies.get("authToken");
      const response = await axios.get(urls.activities, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        setActivities(response.data);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await userActivity();
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
    }
  };

  useEffect(() => {
    fetchStuData();
    userActivity();
  }, []);
  
  const notStarted = stuData?.total_courses - stuData?.courses_completed;
  const data = {
    labels: ["Completed", "Not Completed"],
    datasets: [
      {
        label: "Courses",
        data: [stuData?.courses_completed, notStarted],
        backgroundColor: ["#C36", "#3C9"],
        borderWidth: 1,
      },
    ],
  };

  const userName = Cookies.get("fullName");
  const plan = Cookies.get("plan");

  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleModal = () => {
    setOpenModal((prev) => !prev);
  };

  return (
    <main className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <ToastContainer />
      <div className="lg:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[96px] h-[60px] flex justify-end items-center bg-white shadow-md p-4 w-full">
          <TopNav />
        </div>
        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-10 p-4">
            <div className=" col-span-1 lg:col-span-7">
              <div className="w-[98%] rounded-[8px] relative bg-white lg:h-[133px] h-auto flex justify-between lg:pl-5 pl-2 lg:p-0 p-2 shadow-md lg:mr-5 mr-2 lg:mb-2 mb-4">
                <div className="md:mt-[38px] mt-[30px]">
                  <h1 className="text-xl md:text-2xl font-semibold">
                    Welcome, {userName}
                  </h1>
                  <p className="md:text-base text-sm pr-4">
                    {plan === "Free"
                      ? "You are using the free version, upgrade now to complete more courses"
                      : "Complete your course and take a step further💪"}
                  </p>
                </div>
                {plan === "Free" ? (
                  <></>
                ) : (
                  <div className="">
                    <Image
                      src={vectorg}
                      alt=""
                      priority
                      className="z-10 relative"
                    />
                    <Image
                      src={vectorb}
                      alt=""
                      priority
                      className="relative md:bottom-[101px] bottom-[65px] md:left-[23px]"
                    />
                  </div>
                )}
                {plan === "Free" ? (
                  <Button
                    onClick={handleModal}
                    className="bg-sub rounded-[8px] text-black w-full md:w-auto hover:text-white hover:bg-main font-medium m-4"
                  >
                    Upgrade Plan
                  </Button>
                ) : (
                  <></>
                )}
              </div>
              <div className="lg:flex block justify-between gap-0 md:gap-5 pr-4">
                <div className="w-full h-[128px] rounded-[8px] border-t-4 bg-white border-t-sub flex items-center justify-between px-5">
                  <div>
                    {loading ? (
                      <Loader2 className="animate-spin text-xl" />
                    ) : (
                      stuData && (
                        <h1 className="text-2xl text-[#5D5B5B] font-medium">
                          {stuData.total_courses}
                        </h1>
                      )
                    )}
                    <p className="text-base text-[#00173A]">Total Courses</p>
                  </div>
                  <span className="bg-[#F8F9FF] rounded-full p-3">
                    <BookOpenText className="text-main" />
                  </span>
                </div>
                <div className="w-full h-[128px] rounded-[8px] border-t-4 bg-white border-t-main flex items-center justify-between px-5">
                  <div>
                    {loading ? (
                      <Loader2 className="animate-spin text-xl" />
                    ) : (
                      stuData && (
                        <h1 className="text-2xl text-[#5D5B5B] font-medium">
                          {stuData.courses_completed}
                        </h1>
                      )
                    )}
                    <p className="text-base text-[#00173A]">
                      Completed Courses
                    </p>
                  </div>
                  <span className="bg-[#F8F9FF] rounded-full p-3">
                    <BookText className="text-main" />
                  </span>
                </div>
                <div className="w-full h-[128px] rounded-[8px] border-t-4 bg-white border-t-[#CC3366] flex items-center justify-between px-5">
                  <div>
                    {loading ? (
                      <Loader2 className="animate-spin text-xl" />
                    ) : (
                      stuData && (
                        <h1 className="text-2xl text-[#5D5B5B] font-medium">
                          {stuData.projects_completed}
                        </h1>
                      )
                    )}
                    <p className="text-base text-[#00173A]">
                      Completed Projects
                    </p>
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
                    <Link href="/courses">View all</Link>
                  </p>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-between my-5">
                  {stuData?.enrolled_courses &&
                  stuData.enrolled_courses.length > 0 ? (
                    stuData.enrolled_courses.slice(0, 3).map((data: any) => {
                      return (
                        <div
                          key={data.id}
                          className="rounded-[8px] mr-[12px] my-2 lg:my-0 relative bg-[#F8F9FF] lg:w-[242px] w-full h-[234px]"
                        >
                          <div>
                            <Image src={data.image} alt={data.title} />
                          </div>
                          <div className="p-2">
                            <h3 className="text-xl font-medium">
                              {data.title}
                            </h3>
                            <p className="absolute bottom-0 cursor-pointer right-2 capitalize text-[#3E3E3E] font-medium flex items-center gap-1">
                              {data.condition}{" "}
                              {data.condition === "completed" ? (
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
                    })
                  ) : (
                    <p>No enrolled courses yet</p>
                  )}

                  {/* {courseList.map((course, index) => {
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
                  })} */}
                </div>
              </div>
            </div>
            <div className="col-span-3">
              <div className="bg-white h-[370px] md:h-[275px] rounded-[8px] p-2 shadow-sm ">
                <h1 className="lg:text-2xl text-base md:text-lg font-medium  mt-4">
                  Your Activity
                </h1>
                <hr />
                <div>
                  <ScrollArea className="w-full h-[300px] md:h-[200px] rounded-md">
                    <div>
                      {activity?.results?.length == 0 ? (
                        <p className="text-center">No activity yet</p>
                      ) : (
                        activity?.results?.map((tag: any, index: any) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 md:gap-4 py-2 md:py-3 px-1 md:px-2 cursor-pointer"
                          >
                            <div className="flex items-top gap-x-2">
                              <div className="w-4 h-4 mt-1 bg-main flex justify-center items-center rounded-full">
                                <div className=" w-2 h-2 bg-white rounded-full"></div>
                              </div>
                              <div>
                                <p className="text-sm">{tag?.message}</p>
                                <span className="text-[#999999] text-xs flex items-center gap-x-1">
                                  <CalendarDays className="w-4 h-4" />{" "}
                                  <p>{formatDate(tag?.activity_date)}</p>
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </div>
              <div className="border-md bg-white rounded-[8px] p-2 h-auto shadow-xl w-auto mt-2">
                <h1 className="lg:text-2xl text-base md:text-lg font-medium  mt-4">
                  Progress Report
                </h1>
                <Doughnut data={data} />
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="bg-white rounded-[8px] p-2">
              <span className="flex justify-between items-center">
                <h1 className="lg:text-2xl text-base md:text-lg font-medium  mt-4">
                  Project Review
                </h1>
                <p className="text-sm text-main underline cursor-pointer">
                  view all
                </p>
              </span>
              <ProjectReview />
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <div className="w-full h-screen bg-black/25 absolute top-0 flex justify-center items-center left-0">
          <div className="rounded-[8px] relative bg-white border-t-2 overflow-y-scroll w-[95vw] md:w-3/4 h-[85vh] md:auto border-t-main ">
            <div className="text-center text-black flex justify-center items-center flex-col py-5">
            <h1 className="font-semibold pb-5 text-xl sm:text-xl md:text-4xl">
                Find the right plan for you
              </h1>
              <p className="md:max-w-[60vw] max-w-full md:text-base sm:text-sm text-xs ">
                Make payment into{" "}
                <span className="font-semibold">
                  THE PISTIS TECH HUB (6366146872, MONIEPOINT MFB)
                </span>
                , mail payment receipt to{" "}
                <span className="font-semibold">learning@pistis.solution</span>{" "}
                for payment confirmation.
              </p>
              <button
                onClick={handleModal}
                className=" bg-transparent absolute top-5 right-5 cursor-pointer"
              >
                <X className="text-main border border-main rounded-md " />
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-center pb-5 gap-2 md:gap-10 ">
              <PricingCard bool={false} />
              <PaidPricing bool={false} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
