"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import logo from "@/src/assets/sideLogo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNav from "./mobile-nav";
import useFetchStudentSessionStore from "@/store/fetch-student-session";
import CountDownText from "./CountDownText";
import UpcomingModal from "./modal/upcoming-modal";
import { MdAssignment, MdDashboard } from "react-icons/md";
import { IoHelpCircle } from "react-icons/io5";
import { IoIosLogOut, IoMdSettings } from "react-icons/io";
import grade from "@/src/assets/svg/grading.svg";
import bookGray from "@/src/assets/svg/book-gray.svg";
import axios from "axios";
import { urls } from "@/utils/config";

import Cookies from "js-cookie";
import { toast } from "react-toastify";
import refreshAdminToken from "@/utils/refreshToken";
import { useRouter } from "next-nprogress-bar";
import useCheckStatusStore from "@/store/checkStatus";

const SideNav = () => {
  const navTexts = [
    {
      icon: (isActive: boolean) => (
        <MdDashboard
          size={26}
          className={`transition duration-150 ${
            isActive
              ? "text-white brightness-[3]"
              : "text-gray-400 brightness-95 group-hover:brightness-[3]"
          }`}
        />
      ),
      title: "Dashboard",
      link: "dashboard",
    },
    {
      icon: (isActive: boolean) => (
        <Image
          src={bookGray}
          width={26}
          height={26}
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
    },
    {
      icon: (isActive: boolean) => (
        <MdAssignment
          size={26}
          className={`transition duration-150 ${
            isActive
              ? "text-white brightness-[3]"
              : "text-gray-400 brightness-95 group-hover:brightness-[3]"
          }`}
        />
      ),
      title: "Projects",
      link: "project",
    },
    {
      icon: (isActive: boolean) => (
        <Image
          src={grade}
          width={26}
          height={26}
          alt="grading"
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
      icon: (isActive: boolean) => (
        <IoMdSettings
          size={26}
          className={`transition duration-150 ${
            isActive
              ? "text-white brightness-[3]"
              : "text-gray-400 brightness-95 group-hover:brightness-[3]"
          }`}
        />
      ),
      title: "Settings",
      link: "settings",
    },
  ];

  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  const { fetchSession, loading, data } = useFetchStudentSessionStore();
  const { checkStatus, current_plan, time_left, loadSub } =
    useCheckStatusStore();

  useEffect(() => {
    fetchSession();
    checkStatus();
  }, []);

  const formatTimeLeft = (timeStr: string | null) => {
    const dayMatch = timeStr?.match(/(\d+)\s+day/);
    const hourMatch = timeStr?.match(/(\d+)\s+hour/);
    const minuteMatch = timeStr?.match(/(\d+)\s+minute/);

    const days = dayMatch ? dayMatch[1].padStart(2, "0") : "00";
    const hours = hourMatch ? hourMatch[1].padStart(2, "0") : "00";
    const minutes = minuteMatch ? minuteMatch[1].padStart(2, "0") : "00";

    return (
      <>
        {days}<span className="text-xs">Days</span> : {hours}
        <span className="text-xs">Hrs</span> : {minutes}
        <span className="text-xs">Mins</span>
      </>
    );
  };

  return (
    <div>
      <nav className="w-64 hidden lg:block bg-main h-screen absolute top-0 overflow-y-auto">
        <Image className="pt-5 pb-3 px-5" src={logo} priority alt="logo" />
        <div className="flex justify-between flex-col h-[81%]">
          <div>
            {navTexts.map((nav, index) => {
              const isActive = pathname.includes(`/${nav.link}`);
              return (
                <Link href={`/${nav.link}`} key={index} className="">
                  <div
                    className={`link flex items-center pl-5 gap-3 text-center transition duration-150 ease-in-out cursor-pointer my-1 py-3 
                      ${
                        isActive
                          ? "text-white border-l-white border-l-2"
                          : "text-gray-400 hover:text-white hover:border-l-2 hover:border-l-white"
                      }`}
                  >
                    <span>{nav.icon(isActive)}</span>
                    <span className="text-base font-medium">{nav.title}</span>
                  </div>
                </Link>
              );
            })}
          </div>
          {/* subscription countdown */}
          <div className="">
            {!loadSub && (
              <div>
                <div className="p-1 rounded-[8px] w-full mb-2 overflow-y-scroll">
                  <div className="space-y-2 2xl:space-y-6 p-2 flex flex-col h-auto justify-around  bg-main border border-white rounded-[8px] upcoming-modal-border_gradient">
                    <p className="text-white font-normal 2xl:text-2xl text-sm">
                      Current Plan{" "}
                      <span className="text-sub">
                        ({current_plan ? current_plan : "Free"})
                      </span>
                    </p>
                    <h2 className="text-white 2xl:text-3xl text-xl font-semibold mb-2">
                      {current_plan ? current_plan : "Free"}
                    </h2>
                    {current_plan === "Intermediate" ? (
                      <div>
                        <p className="text-white font-normal 2xl:text-xl text-xs">
                          Time left
                        </p>
                        <div className="text-white font-digital tracking-wider font-digitalNumbers 2xl:text-2xl text-xl font-normal">
                          {current_plan === "Intermediate"
                            ? formatTimeLeft(time_left)
                            : ""}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Countdown Section */}
            {!loading && data && (
              <>
                <div className="p-1 rounded-[8px] w-full mb-2 overflow-y-scroll">
                  <div className="space-y-4 p-4 bg-main backdrop-blur-sm bg-white/10 rounded-[8px] upcoming-modal-border_gradient">
                    <h2 className="text-white text-base font-medium mb-4">
                      Upcoming Section
                    </h2>
                    <CountDownText isSmall />
                    <button
                      className="w-full h-[46px] font-medium bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors rounded-[6px] text-[#FF0000] text-xs lg:text-base"
                      onClick={toggleModal}
                    >
                      Cancel Private Session
                    </button>
                  </div>
                </div>
                <UpcomingModal toggleModal={toggleModal} isOpen={isOpen} />
              </>
            )}
          </div>

          {/* Help & Logout */}
          <div>
            <Link href="#">
              <div
                className={`link flex items-center pl-5 gap-3 text-center transition duration-150 ease-in-out cursor-pointer my-1 py-3 
                  ${
                    pathname === "/help"
                      ? "text-white border-l-white border-l-4"
                      : "text-gray-400 hover:text-white hover:border-l-4 hover:border-l-white"
                  }`}
              >
                <IoHelpCircle size={26} />
                <span className="text-lg">Help & Information</span>
              </div>
            </Link>
            <Link href="/log-out">
              <div
                className={`link flex items-center pl-5 gap-3 text-center transition duration-150 ease-in-out cursor-pointer my-1 py-3 
                  ${
                    pathname.includes("/log-out")
                      ? "text-[#FF0000] border-l-white border-l-4"
                      : "text-[#FF0000] hover:text-white hover:border-l-4 hover:border-l-white"
                  }`}
              >
                <IoIosLogOut size={26} />
                <span className="text-base font-medium">Log out</span>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden block">
        <MobileNav
          loadSub={loadSub}
          current_plan={current_plan}
          time_left={time_left}
        />
      </div>
    </div>
  );
};

export default SideNav;
