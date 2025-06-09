"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import logo from "@/src/assets/sideLogo.png";
import { ArrowLeftCircle, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useFetchStudentSessionStore from "@/store/fetch-student-session";
import CountDownText from "./CountDownText";
import UpcomingModal from "./modal/upcoming-modal";
import { IoIosLogOut, IoMdSettings } from "react-icons/io";
import { IoHelpCircle } from "react-icons/io5";
import { MdAssignment, MdDashboard } from "react-icons/md";
import grade from "@/src/assets/svg/grading.svg";
import bookGray from "@/src/assets/svg/book-gray.svg";
import { useRouter } from "next-nprogress-bar";

const MobileNav = ({ loadSub, current_plan, time_left }: any) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
  const navTexts = [
    {
      icon: <MdDashboard />,
      title: "Dashboard",
      link: "dashboard",
    },
    {
      icon: (isActive: boolean) => (
        <Image
          src={bookGray}
          width={16}
          height={16}
          alt="assignment"
          className={`transition duration-150 ${
            isActive
              ? "brightness-[3]"
              : "brightness-95 group-hover:brightness-[3]"
          }`}
        />
      ),
      title: "Courses",
      link: "courses",
      // otherLink: "courses/add-course/add-modules"
    },
    // {
    //   icon: <GraduationCap />,
    //   title: "Students",
    //   link: "students",
    // },
    {
      icon: <MdAssignment size={16} />,
      title: "Projects",
      link: "project",
    },
    {
      icon: (isActive: boolean) => (
        <Image
          src={grade}
          width={16}
          height={16}
          alt="assignment"
          className={`transition duration-150 ${
            isActive
              ? "brightness-[3]"
              : "brightness-95 group-hover:brightness-[3]"
          }`}
        />
      ),
      title: "Grading",
      link: "grading",
    },
    {
      icon: <IoMdSettings />,
      title: "Settings",
      link: "settings",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);
  const { fetchSession, loading, data } = useFetchStudentSessionStore();

  useEffect(() => {
    fetchSession();
  }, []);

  const formatTimeLeft = (timeStr?: string | null) => {
    if (!timeStr) {
      return (
        <>
          00 <span className="text-xs">Days</span> : 00{" "}
          <span className="text-xs">Hrs</span> : 00{" "}
          <span className="text-xs">Mins</span>
        </>
      );
    }

    const dayMatch = timeStr.match(/(\d+)\s+day/);
    const hourMatch = timeStr.match(/(\d+)\s+hour/);
    const minuteMatch = timeStr.match(/(\d+)\s+minute/);

    const days = dayMatch ? dayMatch[1].padStart(2, "0") : "00";
    const hours = hourMatch ? hourMatch[1].padStart(2, "0") : "00";
    const minutes = minuteMatch ? minuteMatch[1].padStart(2, "0") : "00";

    return (
      <>
        {days} <span className="text-xs">Days</span> : {hours}{" "}
        <span className="text-xs">Hrs</span> : {minutes}{" "}
        <span className="text-xs">Mins</span>
      </>
    );
  };

  return (
    <>
      <div className="relative w-1/2 z-[98]">
        <div
          className={`absolute bg-main rounded-full top-6 z-[99] ${
            sidebarOpen ? "-right-4" : "ml-2"
          }`}
        >
          <button className="p-2 text-white" onClick={toggleSidebar}>
            {sidebarOpen ? <ArrowLeftCircle /> : <Menu />}
          </button>
        </div>
        <nav
          className={`w-full bg-main h-[100vh] absolute top-0 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Image className=" m-auto py-5 px-5" src={logo} priority alt="logo" />
          <div className="flex justify-between flex-col h-[88%]">
            <div>
              {navTexts.map((nav, index) => {
                const isActive = pathname.includes(`/${nav.link}`);

                return (
                  <Link href={`/${nav.link}`} key={index} className="">
                    <div
                      className={`link ${
                        isActive
                          ? " text-white border-l-white border-l-4"
                          : "text-[#5E5E9F]"
                      } flex items-center pl-4 gap-2 text-center duration-150 ease-in-out cursor-pointer my-1 py-3 sm:py-6`}
                    >
                      <span className="">
                        {" "}
                        {typeof nav.icon === "function"
                          ? nav.icon(isActive)
                          : nav.icon}
                      </span>
                      <span className="text-sm">{nav.title}</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div>
              {!loadSub && current_plan === "Intermidiate" && (
                <div>
                  <div className="p-1 rounded-[8px] w-full mb-2 overflow-y-scroll">
                    <div className="space-y-2 p-2 bg-main border border-white rounded-[8px] upcoming-modal-border_gradient">
                      <p className="text-white font-normal text-xs sm:text-sm">
                        Current Plan{" "}
                        <span className="text-sub">({current_plan})</span>
                      </p>
                      <h2 className="text-white text-lg sm:text-2xl font-semibold mb-2">
                        {current_plan}
                      </h2>
                      <div>
                        <p className="text-white font-normal text-xs">
                          Time left
                        </p>
                        <div className="text-white font-digital tracking-wider font-digitalNumbers text-sm sm:text-xl font-normal">
                          {formatTimeLeft(time_left)}
                        </div>
                      </div>

                      {/* <button
                        className="w-full h-[36px] font-medium bg-sub hover:bg-opacity-20 transition-colors rounded-[6px] text-white text-xs lg:text-base"
                        onClick={() => router.push("/dashboard/pricing")}
                      >
                        Upgrade Plan
                      </button> */}
                    </div>
                  </div>
                </div>
              )}
              {/* countdown */}
              {!loading && data && (
                <>
                  <div className=" p-3 rounded-[8px] h-fit max-w-sm">
                    <div className="space-y-4 p-3 bg-main backdrop-blur-sm bg-white/10 rounded-[8px] upcoming-modal-border_gradient">
                      {/* Header */}
                      <div className="flex justify-between items-center mb-4 font-sfProDisplay">
                        <h2 className="text-white text-base font-medium">
                          Upcoming Session
                        </h2>
                      </div>

                      <CountDownText isSmall />

                      <button
                        className="w-full h-[36px] justify-center items-center font-sfProDisplay bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors rounded-[6px] text-[#FF0000] text-xs lg:text-base cancel-button"
                        onClick={toggleModal}
                      >
                        Cancel private session
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div>
              <div className="text-white text-center duration-150 ease-in-out cursor-pointer my-1 py-1">
                {/* <Link href={"/help"} className=""> */}
                <div
                  className={`link ${
                    pathname === "/help"
                      ? " text-white border-l-white border-l-4"
                      : "text-[#5E5E9F]"
                  } flex items-center pl-4 gap-2 text-center duration-150 ease-in-out cursor-pointer my-1 py-3`}
                >
                  {" "}
                  <IoHelpCircle />
                  <span className="text-sm">Help & Information</span>
                </div>
                {/* </Link> */}
              </div>
              <Link href={"/log-out"} className="">
                <div
                  className={`link ${
                    pathname === "/log-out"
                      ? " text-[#FF0000] border-l-white border-l-4"
                      : "text-[#FF0000]"
                  } flex items-center pl-4 gap-2 text-center duration-150 ease-in-out cursor-pointer mb-2 py-3`}
                >
                  {" "}
                  <IoIosLogOut />
                  <span className="text-sm">Log Out</span>
                </div>
              </Link>
            </div>
          </div>
        </nav>
      </div>
      <UpcomingModal toggleModal={toggleModal} isOpen={isOpen} />
    </>
  );
};

export default MobileNav;
