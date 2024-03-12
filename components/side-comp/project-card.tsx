import Image from "next/image";
import React, { useEffect, useState } from "react";

import img from "@/public/assets/course/ansible.png";
import {
  BookText,
  Hourglass,
  ListChecks,
  LockKeyhole,
  LucideLoader2,
} from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { urls } from "@/utils/config";
import Cookies from "js-cookie";
import refreshAdminToken from "@/utils/refreshToken";

interface cardProps {
  id: number;
  // img: any;
  title: string;
  paragraph: string;
  handleCardClick: any;
  // handleOpen: () => void;
}

const ProjectCard = ({
  id,
  // img,
  title,
  paragraph,
}: // handleOpen,
cardProps) => {
  const [projectCount, setProjectCount] = useState<number>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProjectCount = async () => {
      setLoading(true);
      try {
        const authToken = Cookies.get("authToken");
        const response = await axios.get(`${urls.courses}${id}/projects/`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.status === 200) {
          // Assuming the modules are an array in the response
          const count = response.data.length;
          setProjectCount(count);
          setLoading(false);
        } else {
          console.error(`Error fetching modules for course ${id}`);
          setProjectCount(0); // or handle the error as needed
        }
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          await refreshAdminToken();
          await getProjectCount();
        } else if (error?.message === "Network Error") {
          toast.error("Check your network!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
        } else {
          toast.error(error?.response?.data?.detail, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
        }
        setProjectCount(0); // or handle the error as needed
      } finally {
        setLoading(false);
      }
    };

    getProjectCount();
  }, []);

  return (
    <div className="relative">
      <ToastContainer />
      <div
        key={id}
        // onClick={() => {
        //   handleCardClick(id);
        // }}
        className=" w-full cursor-pointer h-auto shadow-md rounded-[8px] bg-[#FFF]"
      >
        <Image
          src={img}
          alt="img"
          className="rounded-tr-[4px] w-full rounded-tl-[4px]"
        />
        <div className="p-2">
          <div className="md:mb-14 mb-5">
            <h1 className="md:text-xl text-sm font-medium">{title}</h1>
            <p className="md:text-lg text-xs text-[#3E3E3E]">{paragraph}</p>
          </div>
          <div className="mt-4">
            <div className="flex md:text-base text-xs items-center gap-x-1">
              <ListChecks className="text-main" />{" "}
              {loading ? (
                <>
                  <LucideLoader2 className="animate-spin" />
                </>
              ) : (
                projectCount
              )}{" "}
              projects
            </div>
          </div>
        </div>
      </div>
      <div
        // onClick={handleOpen}
        className="p-2 bg-white cursor-pointer rounded-full w-[35px] h-[35px] flex justify-center items-center absolute top-2 right-2 hover:bg-red-500 duration-150 ease-in-out text-red-500 hover:text-white"
      >
        <LockKeyhole className="" />
      </div>
    </div>
  );
};

export default ProjectCard;
