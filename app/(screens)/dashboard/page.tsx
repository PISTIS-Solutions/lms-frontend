"use client";
import SideNav from "@/components/side-comp/side-nav";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import { X, ChevronsRight } from "lucide-react";
import Image from "next/image";
import ProjectReview from "@/components/side-comp/project-review-table";

// import { vectorb, vectorg } from "../../index";
import TopNav from "@/components/side-comp/topNav";
import { useRouter } from "next-nprogress-bar";
import useStudentStore from "@/store/fetch-students";

import Cookies from "js-cookie";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import useStudentDashStore from "@/store/dashboard-fetch";

import axios from "axios";
import { urls } from "@/utils/config";
import refreshAdminToken from "@/utils/refreshToken";

import totalCourseBg from "@/src/assets/svg/TotalCourse.svg";
import books from "@/src/assets/svg/books.svg";
import checkMark from "@/src/assets/svg/checkmarkDoneMarkCircle.svg";
import courseDecorator from "@/src/assets/svg/courseDecorator.svg";
import roundAssignment from "@/src/assets/svg/roundAssignment.svg";
import stepForward from "@/src/assets/svg/stepForward.svg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CourseOverviewCard from "@/components/side-comp/course-overview-card";
import PieChart from "@/components/side-comp/pie-chart";
import BookASessionCard from "@/components/side-comp/book-a-session-card";
import CourseEnrollMent from "@/src/assets/svg/courseEnrollment.svg";
import ProjectSubmitted from "@/src/assets/svg/projectSubmitted.svg";
import ProjectReviewNotification from "@/src/assets/svg/projectReview.svg";
import ProjectRejected from "@/src/assets/svg/projectRejected.svg";
import subscriptionRenewalReminder from "@/src/assets/svg/subscriptionRenewalReminder.svg";
import NotificationModal from "@/components/side-comp/modal/notification-modal";

const responsive = {
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const getActivityIconLink = (activityType: any) => {
  switch (activityType) {
    case "Course Enrollment Confirmation":
      return { img: CourseEnrollMent, link: "/courses" };
    case "Project Submitted":
      return { img: ProjectSubmitted, link: "/grading" };
    case "Project Review Notification":
      return { img: ProjectReviewNotification, link: "/grading" };
    case "Project Rejected":
      return { img: ProjectRejected, link: "/grading" };
    default:
      return { img: subscriptionRenewalReminder, link: "/pricing" };
  }
};

const Dashboard = () => {
  const route = useRouter();
  //fetch dashboard data with acceess token and use refresh token to refresh expired token
  const { stuData, loading, fetchStuData, enrolled_courses } =
    useStudentDashStore();

  const { studentData, loading: fetchStudentData } = useStudentStore();

  //activities endpoint
  const [activity, setActivities] = useState<any>();
  // const [unread, setUnread] = useState<any>()
  const userActivity = async () => {
    try {
      const accessToken = Cookies.get("authToken");
      const response = await axios.get(urls.activities, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response, "activity");
      if (response.status === 200) {
        setActivities(response?.data?.activities);
      }
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
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

  // const [authToken, setAuthToken] = useState<string | null>(null);

  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");

  //   if (!token) {
  //     route.push("/create-account");
  //   } else {
  //     setAuthToken(token);
  //   }
  // }, [route]);

  const navigation = useRouter();

  const markAsRead = async (link: string, id: string) => {
    try {
      const accessToken = Cookies.get("authToken");
      axios.put(
        `${urls.activities}${id}/mark-as-read/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      await navigation.push(link);
    } catch (error: any) {
      // console.log(error.response.data.error[0]);
      if (error?.response && error?.response?.status === 401) {
        await refreshAdminToken();
        await markAsRead(link, id);
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

  const userName = studentData?.full_name;

  useEffect(() => {
    fetchStuData();
    userActivity();
  }, []);

  const firstName = Cookies.get("firstName") || "";
  const lastName = Cookies.get("lastName") || "";

  const subscriptionStatus = Cookies.get("status");

  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleModal = () => {
    setOpenModal((prev) => !prev);
  };

  // if (!authToken) {
  //   return <p>Loading...</p>;
  // }

  const [loadSub, setLoadSub] = useState(true);
  const [subStatus, setSubStatus] = useState<any>({});
  const getSubscription = async () => {
    try {
      setLoadSub(true);
      const accessToken = Cookies.get("authToken");
      const response = await axios.get(`${urls.subStatus}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        setLoadSub(false);
        setSubStatus(response?.data);
      }
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        await refreshAdminToken();
        await getSubscription();
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
        toast.error(error.response?.data?.detail, {
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
      setLoadSub(false);
    }
  };

  return (
    <main className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <ToastContainer />
      <div className="lg:ml-64 ml-0 overflow-y-scroll h-screen">
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-10 min-[1440px]:grid-cols-12 pt-16 lg:pt-10 p-4 pb-0">
            <div className=" col-span-1 lg:col-span-7 min-[1440px]:col-span-9">
              <div className=" mb-6 md:flex  justify-between items-center  px-4 w-full">
                <div className="md:max-w-[70%]">
                  <h2 className="text-3xl text-main font-semibold">
                    Hello, {userName}
                  </h2>
                  <p className="text-[#666666] font-sfProDisplay">
                    Track your learning progress here. You almost achieved your
                    learning goal!{" "}
                  </p>
                </div>

                {subStatus?.current_plan === "Intermediate" ? (
                  <button
                    className="bg-[#2FBC8D] rounded-[8px] px-8 text-white font-sfProDisplay font-medium h-[50px] mt-2 md:mt-0"
                    onClick={() => route.push("/dashboard/payment-plan")}
                  >
                    Buy Custom Plan
                  </button>
                ) : (
                  <button
                    // disabled
                    className="bg-[#2FBC8D] rounded-[8px] px-8 text-white font-sfProDisplay font-medium h-[50px] mt-2 md:mt-0"
                    onClick={() => route.push("/dashboard/payment-plan")}
                  >
                    Upgrade Plan
                  </button>
                )}
              </div>

              <section className="md:flex flex-wrap items-center self-stretch gap-0 md:gap-5 pr-0 md:pr-4 space-y-4 md:space-y-0 hidden">
                <CourseOverviewCard
                  bgImage={totalCourseBg}
                  title="Total Courses"
                  loading={loading}
                  icon={books}
                  value={stuData?.total_courses}
                  isBgBlue
                />

                <CourseOverviewCard
                  bgImage={courseDecorator}
                  title="Completed Courses"
                  loading={loading}
                  icon={checkMark}
                  value={stuData?.courses_completed}
                />

                <CourseOverviewCard
                  bgImage={courseDecorator}
                  title="Completed Projects"
                  loading={loading}
                  icon={roundAssignment}
                  value={stuData?.projects_completed}
                />
              </section>

              {/* Use carousel layout for mobile devices to improve accessibility and usability */}
              <section className="md:hidden">
                <Carousel
                  containerClass="py-7"
                  className="peek-carousel"
                  arrows={false}
                  responsive={responsive}
                  infinite={true}
                  showDots={true}
                  swipeable={true}
                >
                  <CourseOverviewCard
                    bgImage={totalCourseBg}
                    title="Total Courses"
                    loading={loading}
                    icon={books}
                    value={stuData?.total_courses}
                    isBgBlue
                  />
                  <CourseOverviewCard
                    bgImage={courseDecorator}
                    title="Completed Courses"
                    loading={loading}
                    icon={checkMark}
                    value={stuData?.courses_completed}
                  />
                  <CourseOverviewCard
                    bgImage={courseDecorator}
                    title="Completed Projects"
                    loading={loading}
                    icon={roundAssignment}
                    value={stuData?.projects_completed}
                  />
                </Carousel>
              </section>

              <section className="mt-6 lg:hidden">
                <BookASessionCard />
              </section>

              <section className="w-[98%]  rounded-[8px] px-5 md:px-0 mt-6">
                <div className="flex justify-between items-end mb-5">
                  <h1 className="text-md md:text-xl font-semibold">
                    My Courses
                  </h1>
                  <p className="text-[#00173A] text-xs md:text-sm flex capitalize">
                    <Link href="/courses">View all</Link>
                    <ChevronsRight color="#00173A" size={20} />
                  </p>
                </div>

                {/* Display courses in a horizontal layout for larger screens (tablet and above)  */}
                <section className="md:flex gap-4 flex-wrap hidden lg:flex-nowrap lg:justify-between">
                  {enrolled_courses && enrolled_courses?.length > 0 ? (
                    enrolled_courses?.slice(0, 3).map((data: any) => {
                      return (
                        <div
                          key={data?.id}
                          className="rounded-[8px]  my-2 lg:my-0 relative bg-white shadow-md sm:w-[242px] lg:w-[calc(33.333%-16px)] w-full min-h-[218px] p-1 font-sfProDisplay"
                        >
                          <div className="rounded-[8px] overflow-hidden h-[120px] relative w-full">
                            <Image
                              className=" object-cover w-full h-full"
                              src={data?.course_image}
                              alt={data?.title}
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                          <Link
                            href={`/courses/${data?.id}`}
                            className="p-2 flex flex-col min-h-[87px] justify-between"
                          >
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
                              </p>
                            </div>
                          </Link>
                        </div>
                      );
                    })
                  ) : (
                    <p>No enrolled courses yet</p>
                  )}
                </section>

                {/* Use carousel layout for mobile devices to improve accessibility and usability */}
                <section className="md:hidden">
                  <Carousel
                    containerClass="py-7"
                    className="peek-carousel"
                    arrows={false}
                    responsive={responsive}
                    infinite={true}
                    showDots={true}
                    swipeable={true}
                  >
                    {enrolled_courses && enrolled_courses?.length > 0 ? (
                      enrolled_courses?.slice(0, 3).map((data: any) => {
                        return (
                          <div
                            key={data.id}
                            className="rounded-[8px]  my-2 lg:my-0 relative bg-white shadow-md sm:w-[242px] lg:w-[calc(33.333%-16px)] w-full h-[218px] p-1 font-sfProDisplay"
                          >
                            <div className="rounded-[8px] overflow-hidden h-[120px] relative w-full">
                              <Image
                                className=" object-cover w-full h-full"
                                src={data?.course_image}
                                alt={data?.title}
                                layout="fill"
                                objectFit="cover"
                              />
                            </div>
                            <div
                              className="p-2 flex flex-col h-[87px] justify-between"
                              onClick={() => route.push(`courses/${data.id}`)}
                            >
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
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p>No enrolled courses yet</p>
                    )}
                  </Carousel>
                </section>
              </section>
            </div>

            <div className="col-span-3 space-y-4 ">
              <div className="hidden lg:block">
                <BookASessionCard />
              </div>

              <div className="bg-white font-sfProDisplay rounded-[8px] text-[#014873] py-2 pb-3 px-4 shadow-[0px_0px_20px_0px_rgba(0,0,0,0.10)] h-fit">
                <span className="flex justify-between items-center">
                  <h1 className=" font-medium  leading-[160%]">
                    Notifications
                  </h1>

                  <NotificationModal activities={activity} />
                </span>
                <hr className="mt-2" />
                <div>
                  <ScrollArea className="w-full rounded-md h-[155px] ">
                    <div className="divide-y-[0.5px] divide-slate-200">
                      {activity === undefined || activity?.length == 0 ? (
                        <p className="text-center leading-[160%]">
                          No activity yet
                        </p>
                      ) : (
                        activity.map((tag: any, index: any) => {
                          const activityItemLink = getActivityIconLink(
                            tag?.activity_type
                          );
                          return (
                            <div
                              key={index}
                              className="flex items-center gap-3 md:gap-4 px-1 md:px-2 cursor-pointer py-2 last-of-type:pb-0 hover:bg-gray-100"
                              onClick={() =>
                                markAsRead(activityItemLink?.link, tag?.id)
                              }
                            >
                              <div className="flex items-center gap-x-2">
                                <Image
                                  src={activityItemLink?.img}
                                  alt="activity icon"
                                  className="w-7 h-7 "
                                />

                                <div className="w-full">
                                  <p className="text-sm  text-ellipsis whitespace-nowrap max-w-[71vw] lg:w-[15vw] xl:w-[17vw]  overflow-hidden font-medium">
                                    {`${tag?.activity_type}:   ${
                                      tag?.message?.activity_message ??
                                      tag?.message
                                    }`}
                                  </p>
                                  <span className="text-[#999999] text-xs flex items-center gap-x-1 ">
                                    <p>{tag?.time_since}</p>
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </div>

              <div className="border-md min-h-[198px] bg-white rounded-[8px] p-4 px-4 h-auto shadow-xl md:w-full w-auto mt-2">
                <h1 className=" font-medium">Progress Report</h1>
                {loading ? (
                  ""
                ) : (
                  <PieChart
                    courses_completed={stuData?.courses_completed}
                    total_courses={stuData?.total_courses}
                    enrolled_courses={stuData?.courses_enrolled?.length}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white shadow-[0px_0px_20px_0px_rgba(0,0,0,0.10)]  mx-4 rounded-[8px] mt-4">
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
      {/* {openModal && (
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
                <span className="font-semibold">
                  learning.pististechub@gmail.com
                </span>{" "}
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
              <BeginnerCard />
              <IntermediateCard />
            </div>
          </div>
        </div>
      )} */}
    </main>
  );
};

export default Dashboard;
