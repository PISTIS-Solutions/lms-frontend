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
// import axios from "axios";
import { urls } from "@/utils/config";

import Cookies from "js-cookie";
import { toast } from "react-toastify";
import refreshAdminToken from "@/utils/refreshToken";
import { useRouter } from "next-nprogress-bar";
import useCheckStatusStore from "@/store/checkStatus";
import { MdDownload } from "react-icons/md";

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
      <div className="w-full whitespace-nowrap flex flex-wrap items-center">
        <div className="text-sm">{days}Days</div>:
        <div className="text-sm">{hours}Hrs</div>:
        <div className="text-sm">{minutes}Min</div>
      </div>
    );
  };

  const certificate = Cookies.get("cert") === "true";

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

          <div className="space-y-4">
            {!loadSub && (
              <div className="p-1 rounded-lg w-full mb-2 overflow-y-auto">
                <div className="flex flex-col justify-around p-2 h-auto space-y-2 2xl:space-y-6 bg-main border border-white rounded-lg upcoming-modal-border_gradient">
                  <p className="text-white font-normal text-sm 2xl:text-2xl">
                    Current Plan
                  </p>

                  <h2 className="text-white text-center text-xl 2xl:text-3xl font-semibold mb-2">
                    {current_plan === "Intermediate" ? current_plan : "Free"}
                  </h2>

                  {current_plan === "Intermediate" && (
                    <div>
                      <p className="text-white font-normal text-xs 2xl:text-xl">
                        Time Left
                      </p>
                      <div className="text-white font-digital font-digitalNumbers tracking-wider text-xl 2xl:text-2xl font-normal">
                        {formatTimeLeft(time_left)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!loading && data && (
              <>
                <div className="p-1 rounded-lg w-full mb-2 overflow-y-auto">
                  <div className="p-4 space-y-4 bg-main bg-white/10 backdrop-blur-sm rounded-lg upcoming-modal-border_gradient">
                    <h2 className="text-white text-base font-medium mb-4">
                      Upcoming Session
                    </h2>

                    <CountDownText isSmall />

                    <button
                      className="w-full h-[46px] text-xs lg:text-base font-medium rounded-md text-red-600 bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors"
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
            {certificate && (
              <Link href="/certificate">
                <div
                  className={`link flex items-center pl-3 gap-2 text-center transition duration-150 ease-in-out cursor-pointer my-1 py-3 
                  ${
                    pathname === "/certificate"
                      ? "text-white border-l-white border-l-2"
                      : "text-gray-400 hover:text-white hover:border-l-2 hover:border-l-white"
                  }`}
                >
                  <MdDownload size={26} />
                  <span className="text-sm">Download Certificate</span>
                </div>
              </Link>
            )}
            <Link href="/log-out">
              <div
                className={`link flex items-center pl-5 gap-3 text-center transition duration-150 ease-in-out cursor-pointer my-1 py-3 
                  ${
                    pathname.includes("/log-out")
                      ? "text-[#FF0000] border-l-white border-l-2"
                      : "text-[#FF0000] hover:text-white hover:border-l-2 hover:border-l-white"
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
