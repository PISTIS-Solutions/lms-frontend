// "use client";

// import Image from "next/image";
// import React, { useEffect, useState } from "react";

// import logo from "@/src/assets/sideLogo.png";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import MobileNav from "./mobile-nav";
// import useFetchStudentSessionStore from "@/store/fetch-student-session";
// import CountDownText from "./CountDownText";
// import UpcomingModal from "./modal/upcoming-modal";
// import { MdAssignment, MdDashboard } from "react-icons/md";

// import { IoHelpCircle } from "react-icons/io5";
// import { IoIosLogOut, IoMdSettings } from "react-icons/io";
// import grade from "@/src/assets/svg/grading.svg";
// import bookGray from "@/src/assets/svg/book-gray.svg";

// const SideNav = () => {
//   const navTexts = [
//     {
//       icon: <MdDashboard size={26} />,
//       title: "Dashboard",
//       link: "dashboard",
//     },
//     {
//       icon: (isActive: boolean) => (
//         <Image
//           src={bookGray}
//           width={26}
//           height={26}
//           alt="assignment"
//           className={`transition duration-150 ${
//             isActive
//               ? "brightness-[3]"
//               : "brightness-95 group-hover:brightness-[3]"
//           }`}
//         />
//       ),
//       title: "Courses",
//       link: "courses",
//       // otherLink: "courses/add-course/add-modules"
//     },
//     // {
//     //   icon: <GraduationCap />,
//     //   title: "Students",
//     //   link: "students",
//     // },
//     {
//       icon: <MdAssignment size={26} />,
//       title: "Projects",
//       link: "project",
//     },
//     {
//       icon: (isActive: boolean) => (
//         <Image
//           src={grade}
//           width={26}
//           height={26}
//           alt="assignment"
//           className={`transition duration-150 ${
//             isActive
//               ? "brightness-[3]"
//               : "brightness-95 group-hover:brightness-[3]"
//           }`}
//         />
//       ),
//       title: "Grading",
//       link: "grading",
//     },
//     {
//       icon: <IoMdSettings size={26} />,
//       title: "Settings",
//       link: "settings",
//     },
//   ];

//   const pathname = usePathname();

//   const [isOpen, setIsOpen] = useState(false);

//   const toggleModal = () => setIsOpen(!isOpen);
//   const { fetchSession, loading, data } = useFetchStudentSessionStore();

//   useEffect(() => {
//     fetchSession();
//   }, []);

//   return (
//     <div>
//       <nav className="w-64 hidden lg:block bg-main h-screen absolute top-0 overflow-y-auto">
//         <Image className="py-14 px-5" src={logo} priority alt="logo" />
//         <div className="flex justify-between flex-col h-[81%]">
//           <div>
//             {navTexts.map((nav, index) => {
//               const isActive = pathname.includes(`/${nav.link}`);
//               return (
//                 <Link href={`/${nav.link}`} key={index} className="">
//                   <div
//                     className={`link ${
//                       pathname.includes(`/${nav.link}`)
//                         ? " text-white border-l-white border-l-2"
//                         : "text-white"
//                     } flex items-center pl-5 gap-3 text-center  hover:border-l-2 hover:border-l-white duration-150 ease-in-out cursor-pointer my-1 py-3`}
//                   >
//                     <span
//                       className={`transition duration-150 ${
//                         pathname.includes(`/${nav.link}`)
//                           ? "brightness-[3]"
//                           : "brightness-95 group-hover:brightness-[3]"
//                       }`}
//                     >
//                       {typeof nav.icon === "function"
//                         ? nav.icon(isActive)
//                         : nav.icon}
//                     </span>
//                     <span className=" text-base font-medium">{nav.title}</span>
//                   </div>
//                 </Link>
//               );
//             })}
//           </div>

//           {/* countdown */}
//           {!loading && data && (
//             <>
//               <div className=" p-3 rounded-[8px] max-w-sm  overflow-y-scroll ">
//                 <div className="space-y-4 p-4 bg-main backdrop-blur-sm bg-white/10 rounded-[8px] upcoming-modal-border_gradient">
//                   {/* Header */}
//                   <h2 className="text-white text-base font-medium mb-4 font-sfProDisplay">
//                     Upcoming Section
//                   </h2>

//                   <CountDownText isSmall />

//                   <button
//                     className="w-full h-[46px] justify-center items-center font-sfProDisplay bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors rounded-[6px] text-[#FF0000] text-xs lg:text-base cancel-button"
//                     onClick={toggleModal}
//                   >
//                     Cancel Private Session
//                   </button>
//                 </div>
//               </div>
//               <UpcomingModal toggleModal={toggleModal} isOpen={isOpen} />
//             </>
//           )}

//           <div>
//             <div>
//               {/* <Link href={"/help"} > */}
//               <div
//                 className={`link ${
//                   pathname === "/help"
//                     ? " text-white border-l-white border-l-4"
//                     : "text-[#5E5E9F]"
//                 } flex items-center pl-5 gap-3 text-center hover:text-white hover:border-l-4 hover:border-l-white duration-150 ease-in-out cursor-pointer my-1 py-3`}
//               >
//                 {" "}
//                 <IoHelpCircle size={26} />
//                 <span className="text-lg">Help & Information</span>
//               </div>
//               {/* </Link> */}
//             </div>
//             <div>
//               <Link href={"/log-out"} className="">
//                 <div
//                   className={`link ${
//                     pathname.includes("/log-out")
//                       ? " text-[#FF0000] border-l-white border-l-4"
//                       : "text-[#FF0000]"
//                   } flex items-center pl-5 gap-3 text-center hover:text-white hover:border-l-4 hover:border-l-white duration-150 ease-in-out cursor-pointer my-1 py-3`}
//                 >
//                   <IoIosLogOut size={26} />
//                   <span className=" text-base font-medium">Log out</span>
//                 </div>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>
//       <div className="lg:hidden block">
//         <MobileNav />
//       </div>
//     </div>
//   );
// };

// export default SideNav;


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

const SideNav = () => {
  const navTexts = [
    {
      icon: (isActive: boolean) => (
        <MdDashboard
          size={26}
          className={`transition duration-150 ${
            isActive ? "text-white brightness-[3]" : "text-gray-400 brightness-95 group-hover:brightness-[3]"
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
            isActive ? "brightness-[3]" : "brightness-95 group-hover:brightness-[3]"
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
            isActive ? "text-white brightness-[3]" : "text-gray-400 brightness-95 group-hover:brightness-[3]"
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
            isActive ? "brightness-[3]" : "brightness-95 group-hover:brightness-[3]"
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
            isActive ? "text-white brightness-[3]" : "text-gray-400 brightness-95 group-hover:brightness-[3]"
          }`}
        />
      ),
      title: "Settings",
      link: "settings",
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
      <nav className="w-64 hidden lg:block bg-main h-screen absolute top-0 overflow-y-auto">
        <Image className="py-14 px-5" src={logo} priority alt="logo" />
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

          {/* Countdown Section */}
          {!loading && data && (
            <>
              <div className="p-3 rounded-[8px] max-w-sm overflow-y-scroll">
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

          {/* Help & Logout */}
          <div>
            <Link href="/help">
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
        <MobileNav />
      </div>
    </div>
  );
};

export default SideNav;
