import React from "react";
import Image from "next/image";

import whiteLogo from "@/public/assets/whiteLogo.png";

import { FaXTwitter } from "react-icons/fa6";
import { LuFacebook } from "react-icons/lu";
import { BiLogoInstagram } from "react-icons/bi";
import { SlSocialLinkedin } from "react-icons/sl";

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
  return (
    <div className="bg-main bg-backdrop h-[788px] p-20">
      <div className="flex flex-col items-center justify-center gap-[26px]">
        <h1 className="text-white font-medium text-7xl max-w-[838px] text-center">
          Subscribe to Our Newsletter
        </h1>
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="rounded-[8px] p-4 bg-white w-[440px] placeholder:text-[#666666] text-base font-normal font-sf-pro-display"
            placeholder="Enter your email address here to subscribe"
          />
          <button className="bg-sub rounded-[8px] p-4 text-white text-base font-normal font-sf-pro-display cursor-pointer">
            Subscribe
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-10 justify-center pt-24">
        <Image alt="logo" src={whiteLogo} />
        <div>
          <ul className="flex items-center gap-10 text-base font-normal font-sf-pro-display text-white">
            <li>Home</li>
            <li>Courses</li>
            <li>About Us</li>
            <li>Contact</li>
            <li>Blog</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div className="flex items-center gap-4">
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
      <hr className="my-16" />
      <div className="flex items-center justify-center">
        <ul className="flex items-center gap-10 text-base font-normal font-sf-pro-display text-white">
          <li className="cursor-pointer">Terms of Service</li>
          <li className="cursor-pointer">Privacy Policy</li>
          <li className="cursor-pointer">Cookies Policy</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
