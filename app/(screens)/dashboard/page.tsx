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
  StepForward,
  ChevronsRight,
} from "lucide-react";
import Image from "next/image";

import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaArrowRight, FaCheckDouble } from "react-icons/fa6";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  Chart,
  ChartData,
  ChartArea,
} from "chart.js";
import { Doughnut, Pie, PolarArea } from "react-chartjs-2";
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
import useCourseStore from "@/store/fetch-courses";

import totalCourseBg from "@/public/assets/svg/TotalCourse.svg";
import books from "@/public/assets/svg/books.svg";
import checkMark from "@/public/assets/svg/checkmarkDoneMarkCircle.svg";
import courseDecorator from "@/public/assets/svg/courseDecorator.svg";
import roundAssignment from "@/public/assets/svg/roundAssignment.svg";
import stepForward from "@/public/assets/svg/stepForward.svg";
import bookLight from "@/public/assets/svg/book-light.svg";
import olayinka from "@/public/assets/testimonial/Olayinka.jpeg";
import coin from "@/public/assets/svg/coin.svg";
import sessionBg from "@/public/assets/svg/sessionBg.svg";

// TODO: change the font for the activity header, activity tab, date
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

function calculateTimeAgo(dateString: string): string {
  const givenDate: Date = new Date(dateString);
  const currentDate: Date = new Date();

  if (isNaN(givenDate.getTime())) {
    throw new Error("Invalid date string provided");
  }

  const differenceInMs: number = currentDate.getTime() - givenDate.getTime();

  // Convert to minutes, hours, and days
  const minutes: number = Math.floor(differenceInMs / (1000 * 60));
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
}

function getCurrentDate() {
  const date = new Date();
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "short" });

  return `${day} ${month} ${year}`;
}

const Dashboard = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const route = useRouter();
  //fetch dashboard data with acceess token and use refresh token to refresh expired token
  const { stuData, loading, fetchStuData, enrolled_courses } =
    useStudentStore();

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
        // console.log(response.data);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await userActivity();
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
    }
  };

  useEffect(() => {
    fetchStuData();
    userActivity();
  }, []);

  const notStarted = stuData?.total_courses - stuData?.courses_completed;
  const doughnutData = [
    {
      label: "completed",
      data: 70,
      color: "rgba(182, 229, 255, 0.9)",
    },
    {
      label: "Not started",
      data: 15,
      color: "#FF1053",
    },
    {
      label: "In progress",
      data: 28,
      color: "#2FBC8D",
    },
  ];
  const data = {
    label: doughnutData.map((itm) => itm.label),
    datasets: [
      {
        data: doughnutData.map((itm) => itm.data),
        backgroundColor: doughnutData.map((itm) => itm.color),
        borderWidth: 0,
        dataVisibility: new Array(doughnutData.length).fill(true),
      },
    ],
  };

  const options: any = {
    plugins: {
      responsive: true,
      layout: {
        padding: 100,
      },
      legend: {
        display: false,
      },
      htmlLegend: { containerID: "legend-container" },
    },
    maintainAspectRatio: false,
    aspectRatio: 2,
  };

  const sliceThicknessPlugin = {
    id: "sliceThickness",
    beforeDraw(chart: any) {
      chart.getDatasetMeta(0).data[1].outerRadius =
        (chart.chartArea.width / (chart.chartArea.width * 2)) * 100;
      chart.getDatasetMeta(0).data[2].outerRadius =
        (chart.chartArea.width / (chart.chartArea.width * 1.5)) * 100;
    },
  };

  // const segmentTextPlugins = {
  //   id: "segmentTextCloud",
  //   afterDatasetDraw(chart: any) {
  //     const { ctx } = chart;

  //     const xCenter = chart.getDatasetMeta(0).data[0].x;
  //     const yCenter = chart.getDatasetMeta(0).data[0].y;

  //     const radius = chart.getDatasetMeta(0).data[0].innerRadius + 50;
  //     chart.getDatasetMeta(0).data.forEach((_: any, idx: number) => {
  //       const startAngle = chart.getDatasetMeta(0).data[idx].startAngle;
  //       const endAngle = chart.getDatasetMeta(0).data[idx].endAngle;
  //       const centerAngle = (startAngle + endAngle) / 2;
  //       const xCoordinate = xCenter + radius * Math.cos(centerAngle);
  //       const yCoordinate = yCenter + radius * Math.sin(centerAngle);

  //       ctx.save();

  //       ctx.translate(xCenter + 10, yCoordinate);

  //       if (xCoordinate > xCenter - 5) {
  //         ctx.rotate(centerAngle);
  //         ctx.font = "bold 18px sans-serif";
  //         ctx.fillStyle = "white";
  //         ctx.textAlign = "left";
  //         ctx.fillText(doughnutData[idx].data, 0, 0);
  //       } else {
  //         ctx.rotate(centerAngle + Math.PI);

  //         ctx.font = `bold 24px sans-serif`;
  //         ctx.fillStyle = "white";
  //         ctx.textAlign = "right";
  //         ctx.fillText(doughnutData[idx].data, 0, 0);
  //       }
  //       ctx.restore();
  //     });
  //   },
  // };

  interface chartProps {
    chart: ChartJS;
    id: string;
  }
  /**
   *checks if there is an existing list (i.e list of label for each segment of the doughnut chart)
   *
   * @param {chartProps} data
   * @return {*}  {HTMLUListElement}
   */

  const getOrCreateList = (data: chartProps): HTMLUListElement => {
    const legendContainer = document.getElementById(data.id);
    let listContainer = legendContainer?.querySelector("ul");
    if (!listContainer) {
      listContainer = document.createElement("ul");
      listContainer.className = "listContainer";
      legendContainer?.appendChild(listContainer);
      console.log(legendContainer);
    }

    return listContainer;
  };

  const userName = Cookies.get("fullName");
  const plan = Cookies.get("plan");

  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleModal = () => {
    setOpenModal((prev) => !prev);
  };

  console.log(activity);
  return (
    <main className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <ToastContainer />
      <div className="lg:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-10 p-4 pb-0">
            <div className=" col-span-1 lg:col-span-7">
              <div className="md:h-[96px] md:flex  justify-between items-center  p-4 w-full mt-10">
                <div className="md:max-w-[70%]">
                  <h2 className="text-3xl text-main font-semibold">
                    Hello, {userName}
                  </h2>
                  <p className="text-[#666666]">
                    Track your learning progress here. You almost achieved your
                    learning goal!{" "}
                  </p>
                </div>
                <div className="flex items-center gap-x-2 w-fit">
                  <p className="font-medium text-[#014873]">
                    {getCurrentDate()}
                  </p>
                  <div className="bg-[#C2E8FF] p-3 w-fit rounded-full">
                    <Image src={bookLight} alt="opened book" />
                  </div>
                </div>
                {/* <TopNav /> */}
              </div>

              {/* <div className="md:w-[98%] w-full rounded-[8px] relative bg-white h-auto md:h-[133px] flex justify-between lg:pl-5 pl-2 lg:p-0 p-2 shadow-md lg:mr-5 mr-2 lg:mb-2 mb-4">
                <div className="md:mt-[38px] mt-[30px]">
                  <h1 className="z-20 relative text-lg md:text-2xl font-medium">
                    Welcome, {userName}
                  </h1>
                  <p className="md:text-base text-sm pr-0 md:pr-4 z-20 relative">
                    {plan === "Free"
                      ? "You are using the free version, upgrade now to complete more courses"
                      : "Complete your course and take a step further💪"}
                  </p>
                </div>
                {plan === "Free" ? (
                  <></>
                ) : (
                  <div className="hidden md:block">
                    <Image
                      src={vectorg}
                      alt=""
                      priority
                      className="absolute z-10 top-0 right-0"
                    />
                    <Image
                      src={vectorb}
                      alt=""
                      priority
                      className="bottom-0 absolute right-0"
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
              </div> */}

              <div className="md:flex flex-wrap block items-center self-stretch gap-0 md:gap-5 pr-0 md:pr-4 space-y-4 md:space-y-0">
                <div className="shadow-[0_0_20px_0_rgba(0,0,0,0.10)] bg-white rounded-[10px] border-2  border-[#02A1FF]  flex items-start p-6 flex-col gap-4 flex-[1_0_0] self-stretch w-full relative overflow-hidden">
                  <div className="bg-[#02A1FF] p-2 w-fit rounded-[8px]">
                    <Image src={books} alt="book icon" />
                  </div>
                  <div>
                    {loading ? (
                      <Loader2 className="animate-spin text-xl" />
                    ) : (
                      stuData && (
                        <h1 className="text-[56px] text-[#5D5B5B] font-medium !leading-[120%]">
                          {stuData?.total_courses}
                        </h1>
                      )
                    )}
                    <p className="lg:text-lg !leading-[120%] text-xs md:text-sm text-[#484848] font-medium text-wrap w-min">
                      Total Courses
                    </p>
                  </div>
                  <div className="absolute top-0 right-0 md:right-[-20%]   2xl:right-0">
                    <Image
                      src={totalCourseBg}
                      alt="background image"
                      className=" h-72"
                    />
                  </div>
                </div>

                <div className="shadow-[0_0_20px_0_rgba(0,0,0,0.10)] bg-white rounded-[10px] border-2  border-[#2FBC8D]  flex items-start p-6 flex-col gap-4 flex-[1_0_0] self-stretch w-full relative overflow-hidden">
                  <div className="bg-[#2FBC8D] p-2 w-fit rounded-[8px]">
                    <Image src={checkMark} alt="book icon" />
                  </div>
                  <div>
                    {loading ? (
                      <Loader2 className="animate-spin text-xl" />
                    ) : (
                      stuData && (
                        <h1 className="text-[56px] text-[#5D5B5B] font-medium !leading-[120%]">
                          {stuData?.courses_completed}
                        </h1>
                      )
                    )}
                    <p className="lg:text-lg !leading-[120%] text-xs md:text-sm text-[#484848] font-medium text-wrap w-min">
                      Completed Courses
                    </p>
                  </div>
                  <div className="absolute top-0 right-0 md:right-[-20%]   2xl:right-0">
                    <Image
                      src={courseDecorator}
                      alt="background image"
                      className="h-72"
                    />
                  </div>
                </div>

                <div className="shadow-[0_0_20px_0_rgba(0,0,0,0.10)] bg-white rounded-[10px] border-2  border-[#2FBC8D]  flex items-start p-6 flex-col gap-4 flex-[1_0_0] self-stretch w-full relative overflow-hidden">
                  <div className="bg-[#2FBC8D] p-2 w-fit rounded-[8px]">
                    <Image src={roundAssignment} alt="book icon" />
                  </div>
                  <div>
                    {loading ? (
                      <Loader2 className="animate-spin text-xl" />
                    ) : (
                      stuData && (
                        <h1 className="text-[56px] text-[#5D5B5B] font-medium !leading-[120%]">
                          {stuData?.projects_completed}
                        </h1>
                      )
                    )}
                    <p className="lg:text-lg !leading-[120%] text-xs md:text-sm text-[#484848] font-medium text-wrap w-min">
                      Completed Projects
                    </p>
                  </div>
                  <div className="absolute top-0 right-0 md:right-[-20%]  2xl:right-0">
                    <Image
                      src={courseDecorator}
                      alt="background image"
                      className=" h-72"
                    />
                  </div>
                </div>
                {/* <div className="w-full h-[128px] rounded-[8px] border-t-4 bg-white border-t-main flex items-center justify-between px-5">
                  <div>
                    {loading ? (
                      <Loader2 className="animate-spin text-xl" />
                    ) : (
                      stuData && (
                        <h1 className="text-[56px] text-[#5D5B5B] font-medium">
                          {stuData?.courses_completed}
                        </h1>
                      )
                    )}
                    <p className="lg:text-lg text-xs md:text-sm text-[#484848] font-medium">
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
                        <h1 className="text-[56px] text-[#5D5B5B] font-medium">
                          {stuData?.projects_completed}
                        </h1>
                      )
                    )}
                    <p className="lg:text-lg text-xs md:text-sm text-[#484848] font-medium">
                      Completed Projects
                    </p>
                  </div>
                  <span className="bg-[#F8F9FF] rounded-full p-3">
                    <ListChecks className="text-main" />
                  </span>
                </div> */}
              </div>

              <div className="w-[98%]  rounded-[8px] p-5 mr-5 my-3">
                <div className="flex justify-between items-end mb-5">
                  <h1 className="text-md md:text-xl font-semibold">
                    My Courses
                  </h1>
                  <p className="text-[#00173A] text-xs md:text-sm flex capitalize">
                    <Link href="/courses">View all</Link>
                    <ChevronsRight color="#00173A" size={20} />
                  </p>
                </div>
                <div className="flex gap-4 flex-wrap">
                  {enrolled_courses && enrolled_courses?.length > 0 ? (
                    enrolled_courses.slice(0, 3).map((data: any) => {
                      return (
                        <div
                          key={data.id}
                          className="rounded-[8px] mr-[12px] my-2 lg:my-0 relative bg-white shadow-md sm:w-[242px] w-full h-[218px] p-1"
                        >
                          <div className="rounded-[8px] overflow-hidden h-[120px]">
                            <Image
                              className=" object-cover w-full h-[140px]"
                              src={data?.course_image_url}
                              width={100}
                              height={100}
                              alt={data?.title}
                            />
                          </div>
                          <div className="p-2 flex flex-col h-[87px] justify-between">
                            <h3 className="text-base leading-[160%]">
                              {data?.title}
                            </h3>

                            <div className="flex justify-between self-stretch">
                              <small className="text-[#666666]">
                                Module {data?.module_count} &#x2022;{"  "}
                                {data?.course_duration}
                              </small>

                              <p className=" cursor-pointer right-2 capitalize text-[#02A1FF] font-medium flex items-center gap-1 text-xs">
                                continue
                                <Image
                                  src={stepForward}
                                  alt="step forward icon"
                                  className="ml-1"
                                />
                                {/* {data?.condition}{" "}
                                {data?.condition === "completed" ? (
                                  <span className="text-main">
                                    <IoIosCheckmarkCircleOutline />
                                  </span>
                                ) : (
                                  <span className="text-main">
                                    <FaArrowRight />
                                  </span>
                                )} */}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p>No enrolled courses yet</p>
                  )}
                </div>
              </div>
            </div>

            <div className="col-span-3 space-y-6">
              <div className="p-3 bg-[#006] rounded-[8px] flex flex-col items-center gap-4 overflow-hidden relative self-stretch">
                <Image src={sessionBg} className="absolute z-[1]" alt="" />

                <div className="flex gap-x-[10px] items-center z-[1] self-stretch">
                  <div className="rounded-full border-white border-2 w-16 h-16 overflow-hidden ">
                    <Image src={olayinka} alt="" className="bg-cover " />
                  </div>

                  <div className="text-white">
                    <p className="text-lg  font-medium">Dr. Gwen Noir</p>
                    <div className="flex p-[2px_6px] justify-center items-center gap-[6px]">
                      <Image src={coin} alt="" className="bg-cover " />
                      <p className=" font-bold text-sm">
                        4 Session credits left
                      </p>
                    </div>
                  </div>
                </div>

                <button className="z-[1] font-medium text-main h-[46px] p-1 px-4 flex justify-center items-center bg-white self-stretch rounded-lg">
                  Book a private session
                </button>
              </div>

              <div className="bg-white h-[243px] md:h-[243px] rounded-[8px] text-[#014873] py-2  px-4 shadow-sm ">
                <span className="flex justify-between items-center">
                  <h1 className=" font-medium  leading-[160%]">
                    Your Activity
                  </h1>
                  <p className="text-[#9F9F9F] text-xs md:text-sm flex capitalize leading-[160%]">
                    <Link href="/courses">View all</Link>
                    <ChevronsRight color="#9F9F9F" size={20} />
                  </p>
                </span>
                <hr className="mt-2" />
                <div>
                  <ScrollArea className="w-full h-[300px] md:h-[200px] rounded-md">
                    <div className="divide-y divide-slate-200">
                      {activity?.length == 0 ? (
                        <p className="text-center leading-[160%]">
                          No activity yet
                        </p>
                      ) : (
                        activity?.map((tag: any, index: any) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 md:gap-4 md:py-3 px-1 md:px-2 cursor-pointer py-2"
                          >
                            <div className="flex items-center gap-x-2">
                              <div className="bg-[#2FBC8D] p-1 rounded-lg h-fit">
                                <Image src={checkMark} alt="status icon" />
                              </div>
                              <div>
                                <p className="text-sm leading-[160%] text-ellipsis overflow-hidden">
                                  {tag?.message}
                                </p>
                                <span className="text-[#999999] text-xs flex items-center gap-x-1 leading-[160%]">
                                  <p>{calculateTimeAgo(tag?.activity_date)}</p>
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

              <div className="border-md bg-white rounded-[8px] p-4 px-4 h-auto shadow-xl md:w-full w-auto mt-2">
                <h1 className=" font-medium">Progress Report</h1>
                <div className="flex justify-center">
                  <ul id="legend-container" className="self-end ">
                    {doughnutData.map((itm, idx) => (
                      <li
                        className={
                          "text-sm  before:absolute before:left-0 before:top-[3px] font-medium relative pl-4 text-[#666]  before:w-2 before:h-2 before: rounded-full before:rounded-full " +
                          (idx == 0
                            ? `before:bg-[#B6E5FFE6]`
                            : idx == 1
                            ? "before:bg-[#FF1053]"
                            : "before:bg-[#2FBC8D]")
                        }
                        key={idx}
                      >
                        {itm.label}
                      </li>
                    ))}
                  </ul>
                  <div className="max-w-[70%] flex justify-end">
                    <Pie
                      data={data}
                      // options={options}
                      plugins={[sliceThicknessPlugin]}
                      // width={300}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white shadow-[0px_0px_20px_0px_rgba(0,0,0,0.10)] mx-4 rounded-[8px]">
          <div className=" ">
            <span className="flex justify-between items-center">
              <h1 className=" text-base md:text-lg font-medium">
                Project Review
              </h1>
              <p className="text-[#9F9F9F] text-xs flex capitalize">
                <Link href="/courses">View all</Link>
                <ChevronsRight color="#9F9F9F" size={15} />
              </p>
            </span>
            <ProjectReview />
          </div>
        </div>
      </div>
      {openModal && (
        <div className="w-full h-screen bg-black/25 absolute top-0 flex justify-center items-center left-0">
          <div className="rounded-[8px] relative bg-white border-t-2 overflow-y-scroll w-[95vw] md:w-3/4 h-[85vh] z-[99] md:auto border-t-main ">
            <div className="text-center text-black flex justify-center items-center flex-col py-5">
              <h1 className="font-semibold pb-2 md:pb-5 text-xl sm:text-xl md:text-4xl">
                Find the right plan for you
              </h1>
              <p className="md:max-w-[60vw] max-w-full md:text-base sm:text-sm text-xs ">
                Make payment into{" "}
                <span className="font-semibold">
                  THE PISTIS TECH HUB (6366146872, MONIEPOINT MFB)
                </span>
                , send an email with payment receipt, full name and registered
                email address to{" "}
                <span className="font-semibold">learning@pististechub.io</span>{" "}
                for payment confirmation. Upon confirmation, your account will
                be upgraded in 10 minutes.
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
