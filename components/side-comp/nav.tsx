"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import pistis from "@/public/assets/full-logo.png";
import { Button } from "../ui/button";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import mainLogo from "@/public/assets/mainLogo.png";
import { usePathname } from "next/navigation";
import { SlClose } from "react-icons/sl";
import { motion } from "framer-motion";

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

  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (open && !event.target.closest(".menu-container")) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="flex items-center justify-between gap-x-3 py-6 px-2 md:px-5 lg:px-20">
      <Image
        src={mainLogo}
        alt="pistis-logo"
        className=" sm:w-auto w-[100px] sm:h-auto"
      />
      <div className="md:flex hidden gap-6 items-center">
        {navLinks.map((nav, index) => {
          const isFaqLink = nav.name.toLowerCase() === "faq";
          const faqLink = pathname === "/" ? "#faq" : "/#faq";

          return (
            <Link
              key={index}
              className="capitalize font-sf-pro-display font-medium text-sm lg:text-base"
              href={isFaqLink ? faqLink : nav.link}
            >
              <p
                className={`cursor-pointer ${
                  pathname === `${nav.link}` ? "text-main" : "text-[#BDBDBD]"
                } `}
                onClick={() => {
                  if (isFaqLink && pathname === "/") {
                    document
                      .getElementById("faq")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {nav.name}
              </p>
            </Link>
          );
        })}
      </div>
      <div className="md:flex hidden items-center gap-x-2">
        <Link href="/sign-in">
          <button className="rounded-[8px] py-3 cursor-pointer text-main hover:scale-105 transition-all duration-100 ease-in-out px-6 font-sf-pro-display text-base font-medium border border-main">
            Log In
          </button>
        </Link>
        <Link href="/pricing">
          <button className="rounded-[8px] py-3 cursor-pointer  px-6 font-sf-pro-display hover:scale-105 text-base font-medium transition-all duration-100 ease-in-out bg-main text-white">
            Sign Up
          </button>
        </Link>
      </div>
      <div
        onClick={handleOpen}
        className="md:hidden block border border-main rounded-full p-1"
      >
        <Menu className="text-main text-base" />
      </div>
      {open && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="w-full h-screen overflow-y-scroll fixed inset-0 z-[100] bg-slate-200/50"
        >
          <motion.div
            className="menu-container w-1/2 h-screen bg-white flex flex-col justify-center relative gap-4 border-r-2 border-r-main p-2"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
          >
            <SlClose
              onClick={handleOpen}
              className="text-main text-3xl absolute top-5 right-5"
            />
            <div className="flex flex-col items-center gap-2">
              {navLinks.map((nav, index) => {
                const isFaqLink = nav.name.toLowerCase() === "faq";
                const faqLink = pathname === "/" ? "#faq" : "/#faq";
                return (
                  <Link
                    key={index}
                    className="capitalize font-sf-pro-display font-medium text-sm lg:text-base"
                    href={isFaqLink ? faqLink : nav.link}
                  >
                    <p
                      className={`cursor-pointer ${
                        pathname === `/${nav.link}`
                          ? "text-main"
                          : "text-[#BDBDBD]"
                      } `}
                      onClick={(e) => {
                        if (isFaqLink && pathname === "/") {
                          e.preventDefault();
                          document
                            .getElementById("faq")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                    >
                      {nav.name}
                    </p>
                  </Link>
                );
              })}
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/sign-in">
                <button className="rounded-[8px] py-3 cursor-pointer w-full text-main hover:scale-105 transition-all duration-100 ease-in-out px-6 font-sf-pro-display text-base font-medium border border-main">
                  Log In
                </button>
              </Link>
              <Link href="/pricing">
                <button className="rounded-[8px] py-3 cursor-pointer w-full  px-6 font-sf-pro-display hover:scale-105 text-base font-medium transition-all duration-100 ease-in-out bg-main text-white">
                  Sign Up
                </button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default NavigationBar;
