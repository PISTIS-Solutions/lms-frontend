"use client"
import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Cookies from "js-cookie";

const TopNav = () => {
  const userName = Cookies.get("fullName");
  const initials = userName ? userName.charAt(0).toUpperCase() : "";

  return (
    <div className="flex items-center gap-1 md:gap-2">
      <Avatar>
        {/* <AvatarImage src={avatar} /> */}
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div>
        <h1 className="md:text-base text-sm font-medium">{userName}</h1>
        <p className="md:text-sm text-xs text-[#5D5B5B]">Student</p>
      </div>
    </div>
  );
};

export default TopNav;
