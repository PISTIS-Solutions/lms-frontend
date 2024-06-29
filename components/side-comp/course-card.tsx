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
  moduleCount: number
}

const Coursecard = ({
  image,
  header,
  index,
  id,
  moduleCount,
}: Componentprops) => {
  // const [moduleCount, setModuleCount] = useState<number>();
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const getModuleCount = async () => {
  //     setLoading(true);
  //     try {
  //       const authToken = Cookies.get("authToken");
  //       const response = await axios.get(`${urls.courses}${id}/modules/`, {
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //       });
  //       if (response.status === 200) {
  //         setModuleCount(response.data.length);
  //       } else {
  //         console.error(`Error fetching modules for course ${index}`);
  //         setModuleCount(0);
  //       }
  //     } catch (error: any) {
  //       if (error.response && error.response.status === 401) {
  //         await refreshAdminToken();
  //         await getModuleCount();
  //       }
  //       // else if (error?.message === "Network Error") {
  //       //   toast.error("Check your network!", {
  //       //     position: "top-right",
  //       //     autoClose: 5000,
  //       //     hideProgressBar: false,
  //       //     closeOnClick: true,
  //       //     pauseOnHover: false,
  //       //     draggable: false,
  //       //     theme: "dark",
  //       //   });
  //       // } else {
  //       //   toast.error(error?.response?.data?.detail, {
  //       //     position: "top-right",
  //       //     autoClose: 5000,
  //       //     hideProgressBar: false,
  //       //     closeOnClick: true,
  //       //     pauseOnHover: false,
  //       //     draggable: false,
  //       //     theme: "dark",
  //       //   });
  //       // }
  //       setModuleCount(0);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getModuleCount();
  // }, []);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="md:w-[325px] w-auto max-w-[340px] cursor-pointer hover:scale-100 md:hover:scale-105 duration-75 ease-in-out shadow-md h-auto md:h-[351px] rounded-[16px] bg-white"
    >
      <div key={id}>
        <Image
          src={image}
          alt="img"
          width={100}
          height={100}
          priority
          className=" rounded-tl-[16px] w-full h-[200px] rounded-tr-[16px]"
        />
      </div>
      <div className="p-3 flex flex-col justify-between h-auto md:h-[160px]">
        <div>
          <h3 className="md:text-xl sm:text-lg text-sm font-semibold">
            {header}
          </h3>
          {/* <p className="md:text-lg text-xs py-5 sm:text-base font-medium text-[#3E3E3E]">
            {title}
          </p> */}
        </div>
        <div className="flex justify-between items-center">
          <div className="text-main flex gap-x-1">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </div>
          <p className="md:text-lg sm:text:sm text-xs text-[#3E3E3E]">
            {moduleCount} modules
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Coursecard;
