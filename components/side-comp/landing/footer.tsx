import React from "react";
import Image from "next/image";

import whiteLogo from "@/public/assets/whiteLogo.png";

import { FaXTwitter } from "react-icons/fa6";
import { LuFacebook } from "react-icons/lu";
import { BiLogoInstagram } from "react-icons/bi";
import { SlSocialLinkedin } from "react-icons/sl";
import Link from "next/link";

const Footer = () => {
  const socials = [
    {
      icon: <LuFacebook />,
      href: "https://www.facebook.com/share/iDufou6CkYC3KWL7/?mibextid=LQQJ4d",
    },
    {
      icon: <FaXTwitter />,
      href: "https://x.com/pististechub?s=21",
    },
    {
      icon: <BiLogoInstagram />,
      href: "https://www.instagram.com/pististechub?igsh=MW0zMDJ4dzg1emV5bA==",
    },
    {
      icon: <SlSocialLinkedin />,
      href: "https://www.linkedin.com/in/pistis-solutions-163049314/",
    },
  ];

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

  return (
    <div className="bg-main bg-backdrop h-[788px] p-4 sm:p-10 md:p-20">
      <div className="flex flex-col items-center justify-center gap-[26px]">
        <h1 className="text-white font-medium text-5xl md:text-7xl max-w-[838px] text-center">
          Subscribe to Our Newsletter
        </h1>
        <div className="flex md:flex-row flex-col md:w-auto w-full items-center gap-2">
          <input
            type="text"
            className="rounded-[8px] p-4 bg-white w-full md:w-[440px] placeholder:text-[#666666] text-sm sm:text-base font-normal font-sfProDisplay"
            placeholder="Enter your email address here to subscribe"
          />
          <button className="bg-sub rounded-[8px] md:w-auto w-full p-4 text-white text-sm sm:text-base font-normal font-sfProDisplay cursor-pointer">
            Subscribe
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-10 justify-center pt-24">
        <Image alt="logo" src={whiteLogo} />
        <div>
          <ul className="flex flex-wrap capitalize items-center gap-5 md:gap-10 text-sm sm:text-base font-normal font-sfProDisplay text-white">
            {navLinks.map((nav, index) => {
              return (
                <Link key={index} href={nav.link}>
                  <li>{nav.name}</li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          {socials.map((social, index) => {
            return (
              <a
                className="text-main w-10 h-10 rounded-full flex items-center justify-center bg-white cursor-pointer text-xl"
                key={index}
                href={social.href}
              >
                {social.icon}{" "}
              </a>
            );
          })}
        </div>
      </div>
      <hr className="md:my-16 my-10" />
      <div className="flex md:flex-row flex-col items-center justify-center">
        <ul className="flex items-center gap-10 text-xs sm:text-base font-normal font-sfProDisplay text-white">
          <li className="cursor-pointer">Terms of Service</li>
          <li className="cursor-pointer">Privacy Policy</li>
          <li className="cursor-pointer">Cookies Policy</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
