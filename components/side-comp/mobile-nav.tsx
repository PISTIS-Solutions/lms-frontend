"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import logo from "@/public/assets/full-logo.png";
import {
  ArrowLeftCircle,
  ArrowRightCircle,
  Award,
  BookOpenText,
  GraduationCap,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Menu,
  MoreVertical,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useFetchStudentSessionStore from "@/store/fetch-student-session";
import CountDownText from "./CountDownText";
import UpcomingModal from "./modal/upcoming-modal";

const MobileNav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
  const navTexts = [
    {
      icon: <LayoutDashboard />,
      title: "Dashboard",
      link: "dashboard",
    },
    {
      icon: <BookOpenText />,
      title: "Course Content",
      link: "courses",
      // otherLink: "courses/add-course/add-modules"
    },
    // {
    //   icon: <GraduationCap />,
    //   title: "Students",
    //   link: "students",
    // },
    {
      icon: <ListTodo />,
      title: "Projects",
      link: "project",
    },
    {
      icon: <Award />,
      title: "Grading",
      link: "grading",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);
  const { fetchSession, loading, data } = useFetchStudentSessionStore();

  useEffect(() => {
    fetchSession();
  }, []);

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
          className={`w-full bg-main h-[100vh] absolute top-0 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Image className=" m-auto py-5 px-5" src={logo} priority alt="logo" />
          <div className="flex justify-between flex-col h-[88%]">
            <div>
              {navTexts.map((nav, index) => {
                return (
                  <Link href={`/${nav.link}`} key={index} className="">
                    <div
                      className={`link ${
                        pathname === `/${nav.link}`
                          ? "bg-sub text-black border-r-[#6E6EF7] border-r-2"
                          : "text-white"
                      } flex items-center pl-1 gap-1 text-center duration-150 ease-in-out cursor-pointer my-1 py-4`}
                    >
                      <span className=""> {nav.icon} </span>
                      <span className="text-sm">{nav.title}</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* countdown */}
            {!loading && data && (
              <>
                <div className=" p-3 rounded-lg max-w-sm">
                  <div className="space-y-4 p-4 bg-main backdrop-blur-sm bg-white/10">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-16 font-sfProDisplay">
                      <h2 className="text-white text-base font-medium">
                        Upcoming Section
                      </h2>
                      <button className="text-white">
                        <MoreVertical size={20} />
                      </button>
                    </div>

                    <CountDownText isSmall />

                    <button
                      className="w-full h-[46px] justify-center items-center font-sfProDisplay bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors rounded-[6px] text-[#FF0000] text-xs lg:text-base cancel-button"
                      onClick={toggleModal}
                    >
                      Cancel Private Session
                    </button>
                  </div>
                </div>
              </>
            )}

            <div>
              <div className="text-white text-center duration-150 ease-in-out cursor-pointer my-1 py-1">
                <Link href={"/settings"} className="">
                  <div
                    className={`link ${
                      pathname === "/settings"
                        ? "bg-sub text-black border-r-[#6E6EF7] border-r-2"
                        : "text-white"
                    } flex items-center pl-1 gap-1 text-center duration-150 ease-in-out cursor-pointer my-1 py-4`}
                  >
                    {" "}
                    <Settings />
                    <span className="text-sm">Settings</span>
                  </div>
                </Link>
              </div>
              <Link href={"/log-out"} className="">
                <div
                  className={`link ${
                    pathname === "/log-out"
                      ? "bg-sub text-black border-r-[#6E6EF7] border-r-2"
                      : "text-white"
                  } flex items-center pl-1 gap-1 text-center duration-150 ease-in-out cursor-pointer my-1 py-4`}
                >
                  {" "}
                  <LogOut />
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
