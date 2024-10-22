"use client";
import Image from "next/image";
import React, { useState } from "react";

import pistis from "@/public/assets/full-logo.png";
import { Button } from "../ui/button";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import mainLogo from "@/public/assets/mainLogo.png";
import { usePathname } from "next/navigation";

const NavigationBar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  const navLinks = [
    {
      name: "home",
      link: "/",
    },
    {
      name: "courses",
      link: "/landing-courses",
    },
    {
      name: "About us",
      link: "/about-us",
    },
    {
      name: "Blog",
      link: "/blog",
    },
    {
      name: "FAQ",
      link: "#faq",
    },
  ];

  const pathname = usePathname()
  return (
    // <nav className="md:h-24 fixed w-full z-[1000] h-[37px] md:py-0 py-10 bg-main flex items-center justify-between px-5 md:px-10">
    //   <div>
    //     <Image src={pistis} className="md:w-auto w-5/6" alt="pistis" priority />
    //   </div>
    //   <div className=" md:flex hidden items-center gap-x-5">
    //     <Link href="/sign-in">
    //       <Button className="bg-sub py-[13px] hover:text-white px-[20px] text-lg text-black font-medium">
    //         Sign In
    //       </Button>
    //     </Link>

    //     <Link href="/pricing">
    //       <p className="text-lg hover:text-gray-200 text-white font-medium cursor-pointer">
    //         Create Account
    //       </p>
    //     </Link>
    //   </div>
    //   <div className="md:hidden block" onClick={handleOpen}>
    //     <Menu className="text-2xl text-white" />
    //   </div>

    //   {/* {open && (
    //     <div className="absolute right-0 bg-white p-2 h-[200px] top-20 w-full flex justify-center items-center gap-y-4">
    //       <div className="w-full ">
    //         <span onClick={handleOpen} className="flex justify-center pb-4">
    //           <X className="text-red-500 border border-main rounded-[8px]" />
    //         </span>
    //         <Link href="/sign-in">
    //           <Button className="bg-main text-sm w-full">Sign In</Button>
    //         </Link>

    //         <Link href="/pricing">
    //           <p className=" text-sm text-center font-medium py-4">
    //             Create Account
    //           </p>
    //         </Link>
    //       </div>
    //     </div>
    //   )} */}
    // </nav>
    <div className="flex items-center justify-between py-6 px-20">
      <Image src={mainLogo} alt="pistis-logo" />
      <div className="flex gap-6 items-center">
        {navLinks.map((nav, index) => {
          return (
            <Link
              key={index}
              className="capitalize font-sf-pro-display font-medium text-base"
              href={nav.link}
            >
              <p className={`cursor-pointer ${pathname === `${nav.link}`? "text-main" : "text-[#BDBDBD]"} `}>{nav.name}</p>
            </Link>
          );
        })}
      </div>
      <div className="flex items-center gap-x-2">
        <button className="rounded-[8px] py-3 cursor-pointer text-main hover:scale-105 transition-all duration-100 ease-in-out px-6 font-sf-pro-display text-base font-medium border border-main">
          Log In
        </button>
        <button className="rounded-[8px] py-3 cursor-pointer  px-6 font-sf-pro-display hover:scale-105 text-base font-medium transition-all duration-100 ease-in-out bg-main text-white">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default NavigationBar;
