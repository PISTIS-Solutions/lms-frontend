import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { urls } from "@/utils/config";
import Cookies from "js-cookie";
import refreshAdminToken from "@/utils/refreshToken";

import { AiFillStar } from "react-icons/ai";

interface Componentprops {
  image: any;
  header: String;
  index: number;
  id: any;
  moduleCount: number;
  duration: any;
}

const Coursecard = ({
  image,
  header,
  index,
  id,
  moduleCount,
  duration,
}: Componentprops) => {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="!w-[373px] flex-none relative h-[309px] shadow-lg rounded-[8px] bg-white p-3"
    >
      <div>
        <Image
          src={image}
          alt="img"
          width={100}
          height={100}
          priority
          unoptimized
          className="w-full rounded-tl-[6px] rounded-tr-[6px] h-[180px] bg-cover"
        />
      </div>
      <div className="py-2 ">
        <div>
          <h3 className="md:text-base sm:text-lg text-[#2E2E2E] font-sfProDisplay text-sm font-medium">
            {header}
          </h3>
        </div>
        <div className="flex absolute bottom-3 items-center gap-2">
          <p className="flex items-center font-sfProDisplay text-sm font-normal rounded-[8px] py-1 px-2 bg-[#E6F6FF] gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="15"
              viewBox="0 0 11 15"
              fill="none"
            >
              <path
                d="M2.16797 3.66634C2.16797 3.39034 2.39064 3.16634 2.66597 3.16634H6.66997C6.9453 3.16634 7.16797 3.39034 7.16797 3.66634C7.16797 3.94234 6.9453 4.16634 6.66997 4.16634H2.66597C2.53371 4.16581 2.40704 4.1129 2.31371 4.01919C2.22037 3.92548 2.16797 3.7986 2.16797 3.66634ZM2.66597 9.16634C2.53371 9.16687 2.40704 9.21978 2.31371 9.31349C2.22037 9.4072 2.16797 9.53408 2.16797 9.66634C2.16797 9.94234 2.39064 10.1663 2.66597 10.1663H6.66997C6.80223 10.1658 6.92889 10.1129 7.02223 10.0192C7.11556 9.92548 7.16797 9.7986 7.16797 9.66634C7.16797 9.53408 7.11556 9.4072 7.02223 9.31349C6.92889 9.21978 6.80223 9.16687 6.66997 9.16634H2.66597ZM2.16797 6.66634C2.16797 6.39034 2.39064 6.16634 2.66597 6.16634H6.66997C6.9453 6.16634 7.16797 6.39034 7.16797 6.66634C7.16797 6.94234 6.9453 7.16634 6.66997 7.16634H2.66597C2.53371 7.16581 2.40704 7.1129 2.31371 7.01919C2.22037 6.92548 2.16797 6.7986 2.16797 6.66634ZM0.167969 2.33301C0.167969 1.93518 0.326004 1.55365 0.607309 1.27235C0.888613 0.991043 1.27014 0.833008 1.66797 0.833008H7.66797C8.06579 0.833008 8.44732 0.991043 8.72863 1.27235C9.00993 1.55365 9.16797 1.93518 9.16797 2.33301V10.9997C9.16797 11.3975 9.00993 11.779 8.72863 12.0603C8.44732 12.3416 8.06579 12.4997 7.66797 12.4997H1.66797C1.27014 12.4997 0.888613 12.3416 0.607309 12.0603C0.326004 11.779 0.167969 11.3975 0.167969 10.9997V2.33301ZM1.17064 2.28167L1.16797 2.33301V10.9997C1.16797 11.2757 1.39197 11.4997 1.66797 11.4997H7.66797C7.80058 11.4997 7.92775 11.447 8.02152 11.3532C8.11529 11.2595 8.16797 11.1323 8.16797 10.9997V2.33301C8.16797 2.2004 8.11529 2.07322 8.02152 1.97945C7.92775 1.88569 7.80058 1.83301 7.66797 1.83301H1.66797C1.54425 1.83301 1.42493 1.87889 1.33307 1.96176C1.24121 2.04463 1.18334 2.15861 1.17064 2.28167ZM3.33463 14.1663C3.02437 14.1664 2.7217 14.0703 2.46834 13.8912C2.21498 13.7121 2.02339 13.4589 1.91997 13.1663H7.66797C8.2426 13.1663 8.7937 12.9381 9.20003 12.5317C9.60636 12.1254 9.83463 11.5743 9.83463 10.9997V5.45767L10.3946 6.01767C10.6766 6.29967 10.8346 6.68101 10.8346 7.07901V10.9997C10.8346 11.4155 10.7527 11.8273 10.5936 12.2115C10.4344 12.5957 10.2012 12.9448 9.90714 13.2388C9.61309 13.5329 9.264 13.7662 8.8798 13.9253C8.4956 14.0844 8.08382 14.1663 7.66797 14.1663H3.33463Z"
                fill="#014873"
              />
            </svg>
            {moduleCount} modules
          </p>
          <p className="flex items-center font-sfProDisplay text-sm font-normal rounded-[8px] py-1 px-2 bg-[#E6F6FF] gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
            >
              <path
                d="M6.5013 8.83333V6.16667M12.5013 4.16667L11.168 2.83333M5.16797 1.5H7.83464M6.5013 14.1667C5.08681 14.1667 3.73026 13.6048 2.73007 12.6046C1.72987 11.6044 1.16797 10.2478 1.16797 8.83333C1.16797 7.41885 1.72987 6.06229 2.73007 5.0621C3.73026 4.0619 5.08681 3.5 6.5013 3.5C7.91579 3.5 9.27235 4.0619 10.2725 5.0621C11.2727 6.06229 11.8346 7.41885 11.8346 8.83333C11.8346 10.2478 11.2727 11.6044 10.2725 12.6046C9.27235 13.6048 7.91579 14.1667 6.5013 14.1667Z"
                stroke="#014873"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {duration}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Coursecard;
