"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import logo from "@/public/assets/full-logo.png";
import {
  Award,
  BookOpenText,
  GraduationCap,
  LayoutDashboard,
  ListTodo,
  LogOut,
  MoreVertical,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import MobileNav from "./mobile-nav";
import useFetchStudentSessionStore from "@/store/fetch-student-session";
import CountDownText from "./CountDownText";
import UpcomingModal from "./modal/upcoming-modal";

const SideNav = () => {
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

  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);
  const { fetchSession, loading, data } = useFetchStudentSessionStore();

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <div>
      <nav className="w-64 hidden lg:block bg-main h-screen absolute top-0">
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
                    } flex items-center pl-5 gap-3 text-center hover:bg-sub hover:border-r-2 hover:border-r-[#6E6EF7] duration-150 ease-in-out cursor-pointer my-1 py-3`}
                  >
                    <span> {nav.icon} </span>
                    <span className="text-lg">{nav.title}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* countdown */}
          {!loading && data && (
            <>
              <div className=" p-3 rounded-lg max-w-sm ">
                <div className="space-y-4 p-4 bg-main backdrop-blur-sm bg-white/10 rounded-[8px]">
                  {/* Header */}
                  <h2 className="text-white text-base font-medium mb-4 font-sfProDisplay">
                    Upcoming Section
                  </h2>

                  <CountDownText isSmall />

                  <button
                    className="w-full h-[46px] justify-center items-center font-sfProDisplay bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors rounded-[6px] text-[#FF0000] text-xs lg:text-base cancel-button"
                    onClick={toggleModal}
                  >
                    Cancel Private Session
                  </button>
                </div>
              </div>
              <UpcomingModal toggleModal={toggleModal} isOpen={isOpen} />
            </>
          )}

          <div>
            <div className="">
              <Link href={"/settings"} className="">
                <div
                  className={`link ${
                    pathname === "/settings"
                      ? "bg-sub text-black border-r-[#6E6EF7] border-r-2"
                      : "text-white"
                  } flex items-center pl-5 gap-3 text-center hover:bg-sub hover:border-r-2 hover:border-r-[#6E6EF7] duration-150 ease-in-out cursor-pointer my-1 py-2`}
                >
                  {" "}
                  <Settings />
                  <span className="text-lg">Settings</span>
                </div>
              </Link>
            </div>
            <Link href={"/log-out"} className="">
              <div
                className={`link ${
                  pathname === "/log-out"
                    ? "bg-sub text-black border-r-[#6E6EF7] border-r-2"
                    : "text-white"
                } flex items-center pl-5 gap-3 text-center hover:bg-sub hover:border-r-2 hover:border-r-[#6E6EF7] duration-150 ease-in-out cursor-pointer my-1 py-2`}
              >
                {" "}
                <LogOut />
                <span className="text-lg">Log Out</span>
              </div>
            </Link>
          </div>
        </div>
      </nav>
      <div className="lg:hidden block">
        <MobileNav />
      </div>
    </div>
  );
};

export default SideNav;
