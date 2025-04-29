"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, Loader2Icon, Search, ShoppingCart } from "lucide-react";
import { MdOpenInNew } from "react-icons/md";
import { Button } from "@/components/ui/button";
import pistis from "@/src/assets/full-logo.png";
import Link from "next/link";
import { useRouter } from "next-nprogress-bar";
import customImg from "@/src/assets/customimg.png";
import note from "@/src/assets/svg/note.svg";
import timer from "@/src/assets/svg/timer.svg";
import rate from "@/src/assets/svg/rate.svg";
import { useParams } from "next/navigation";
import axios from "axios";
import { baseURL } from "@/utils/config";
import { toast } from "react-toastify";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  CustomH2,
  code,
  customH3,
  customOL,
  customP,
  customTD,
  customTH,
  customUL,
  strong,
  customLink,
} from "@/utils/markdown";
import refreshAdminToken from "@/utils/refreshToken";
import { BiAddToQueue } from "react-icons/bi";

interface courseReadType {
  id: string;
  title: string;
  slug: string;
  course_category: string;
  course_image: string | any;
  overview: string;
  course_url: string;
  course_duration: string;
  order: number;
  module_count: string;
  price: string;
}
const CourseDetails = () => {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<courseReadType>();
  const getCustomCourses = async (id: any) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${baseURL}/courses/${id}/advanced-courses/`
      );
      console.log(response, "res");
      if (response.status === 200) {
        setCourse(response.data);
        setLoading(false);
      } else {
        toast.error(`Error fetching course details`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      }
    } catch (error: any) {
      toast.error(`Error fetching course details: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
      });
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await getCustomCourses(id);
      } else if (error?.message === "Network Error") {
        toast.error("Check your network!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      } else {
        toast.error(error?.response?.data?.detail, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCustomCourses(params?.id);
  }, []);

  const [cartId, setCartId] = useState<string | null>(null);
  const [loadAdd, setLoadAdd] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem("custom_cart_id");
    if (storedId) {
      setCartId(storedId);
    }
  }, []);

  const addToCart = async () => {
    try {
      setLoadAdd(true);

      const payload: any = {
        course_ids: [course?.id],
      };
      if (cartId) {
        payload.cart_id = cartId;
      }
      const response = await axios.post(`${baseURL}/cart/add/`, payload);
      console.log(response.data.id);
      if (response.status === 200) {
        if (!cartId && response.data.id) {
          setCartId(response.data.id);
          localStorage.setItem("custom_cart_id", response.data.id);
        }
        toast.success(`${response.data.items[0].course.title} added to cart`, {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
      } else {
        toast.error("Error adding to cart", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
      }
    } catch (error: any) {
      toast.error(`Error adding to cart: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
      });
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await addToCart();
      } else if (error?.message === "Network Error") {
        toast.error("Check your network!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      } else {
        toast.error(error?.response?.data?.detail, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      }
      setLoadAdd(false);
    } finally {
      setLoadAdd(false);
    }
  };

  if (loading)
    return (
      <div className="bg-slate-50 h-[100%]">
        <div className="bg-main px-5 sm:px-10 md:px-20 h-[98px] flex gap-5 items-center justify-between">
          <Image
            src={pistis}
            className="md:w-auto w-1/3"
            alt="pistis"
            priority
          />
          {/* <span className="relative w-full md:w-1/3">
          <Search className="text-[#9F9F9F] absolute left-2 mt-3 w-5 h-5 font-normal" />
          <input
            type="text"
            className="bg-white rounded-[8px] py-3 w-full indent-8 placeholder:text-[#9F9F9F] text-xs sm:text-sm font-normal"
            placeholder="Search for a preferred course"
          />
        </span> */}
          <span className="flex items-center gap-x-2 sm:gap-x-5">
            <Link href="/sign-in">
              <Button className="bg-sub py-2 sm:py-[13px] hover:text-white px-3 whitespace-nowrap sm:px-[20px] text-sm sm:text-lg text-black font-medium">
                Sign In
              </Button>
            </Link>

            <Link href="/create-account">
              <p className="text-sm sm:text-lg hover:text-gray-200 text-white font-medium cursor-pointer">
                Create Account
              </p>
            </Link>
          </span>
        </div>
        <div className="h-screen w-full flex justify-center items-center">
          <span className="text-main w-full flex items-center justify-center">
            <Loader2Icon className="animate-spin" />
            <p className="text-base sm:text-lg md:text-xl">Loading course information...</p>
          </span>
        </div>
      </div>
    );

  return (
    <div className="bg-slate-50 h-[100%]">
      <div className="bg-main px-5 sm:px-10 md:px-20 h-[98px] flex gap-5 items-center justify-between">
        <Image src={pistis} className="md:w-auto w-1/3" alt="pistis" priority />
        {/* <span className="relative w-full md:w-1/3">
              <Search className="text-[#9F9F9F] absolute left-2 mt-3 w-5 h-5 font-normal" />
              <input
                type="text"
                className="bg-white rounded-[8px] py-3 w-full indent-8 placeholder:text-[#9F9F9F] text-xs sm:text-sm font-normal"
                placeholder="Search for a preferred course"
              />
            </span> */}
        <span className="flex items-center gap-x-2 sm:gap-x-5">
          <Link href="/sign-in">
            <Button className="bg-sub py-2 sm:py-[13px] hover:text-white px-3 whitespace-nowrap sm:px-[20px] text-sm sm:text-lg text-black font-medium">
              Sign In
            </Button>
          </Link>

          <Link href="/create-account">
            <p className="text-sm sm:text-lg hover:text-gray-200 text-white font-medium cursor-pointer">
              Create Account
            </p>
          </Link>
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0.5 sm:gap-2">
            <ChevronLeft onClick={() => router.back()} />
            <p className="text-[#2E2E2E] text-sm sm:text-base md:text-lg font-medium">{`Course Details / ${course?.title}`}</p>
          </div>
          <button
            disabled={loadAdd}
            onClick={addToCart}
            className="bg-sub disabled:bg-sub/70 cursor-pointer rounded-[6px] flex items-center justify-between gap-2 p-[12px_10px] sm:p-[16px_14px]"
          >
            <span className="relative">
              <BiAddToQueue className=" text-white  w-6 h-6" />
              {/* <p className="bg-[#FF0000] absolute top-0 -right-1 rounded-full flex items-center justify-center text-xs w-[14px] h-[14px] text-white font-medium">
                5
              </p> */}
            </span>
            <p className="text-sm font-semibold hidden sm:block text-white">
              {loadAdd ? "Adding to cart" : "Add to cart"}
            </p>
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-5 my-5">
          <div className="md:w-[60%] w-full bg-white shadow-lg p-2 rounded-[8px]">
            <Image
              // alt={course?.title}
              alt="courseDetailImage"
              className="w-full h-[328px] "
              src={course?.course_image}
              width={100}
              height={100}
            />
            <div>
              <h1 className="text-[#2E2E2E] font-semibold text-lg sm:text-2xl py-2">
                {course?.title}
              </h1>
              <p className="text-[#666666] font-normal text-xs sm:text-sm pt-1 sm:pt-3">
                In this essential course on mastering DevOps, you will delve
                into a comprehensive range of topics. From understanding the
                core principles to practical applications, you will learn how to
                streamline processes, enhance collaboration, and optimize
                workflows. Dive into automation, continuous integration, and
                deployment strategies to elevate your DevOps skills to the next
                level.
              </p>
              <div className="flex items-center justify-between py-5">
                <div className="flex items-center gap-x-[8px]">
                  <span className="bg-[#FAFAFA] rounded py-1 px-2 flex items-center justify-between">
                    <Image alt="note" src={note} className="w-4 h-4" />
                    <p className="text-[#484848] font-normal text-xs sm:text-sm">
                      {course?.module_count} modules
                    </p>
                  </span>
                  <span className="bg-[#FAFAFA] rounded py-1 px-2 flex items-center justify-between">
                    <Image alt="note" src={timer} className="w-4 h-4" />
                    <p className="text-[#484848] font-normal text-xs sm:text-sm">
                      {course?.course_duration}
                    </p>
                  </span>
                </div>
                <div className="flex items-center gap-x-2">
                  <Image alt="rate" src={rate} className="w-4 h-4" />
                  <p className="text-[#484848] text-xs sm:text-sm font-normal">
                    4.5 ({course?.order})
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3">
                <p className="text-[#484848] font-medium text-xs sm:text-sm">Price:</p>
                <h1 className="text-[#484848] font-semibold text-xl sm:text-3xl">
                  ₦{course?.price}
                </h1>
              </div>
            </div>
            <div>
              <h1 className="text-[#2E2E2E] font-semibold text-lg sm:text-2xl py-4">
                Course Overview
              </h1>
              <ReactMarkdown
                className="py-1 pl-2 text-xs sm:text-sm md:text-base text-[#3E3E3E]"
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: CustomH2,
                  h3: customH3,
                  ol: customOL,
                  p: customP,
                  ul: customUL,
                  th: customTH,
                  td: customTD,
                  strong: strong,
                  code: code,
                  a: customLink,
                }}
              >
                {course?.overview}
              </ReactMarkdown>
            </div>
          </div>
          <div className="md:w-[40%] w-full bg-white shadow-lg p-2 rounded-[8px]">
            <h1 className="sm:text-lg text-sm font-semibold text-[#2E2E2E] py-3">
              About Tutor
            </h1>
            <div className="bg-[#E6F6FF] rounded-[6px] p-3">
              <div>
                <div className="flex justify-between">
                  <Image
                    alt="tutorImg"
                    src={customImg}
                    className="w-24 h-24 rounded-full object-fill"
                  />
                  <MdOpenInNew className="text-[#484848] h-5 w-5 cursor-pointer" />
                </div>
                <h1 className="text-main font-semibold text-sm sm:text-lg mt-3">
                  Alex Thompson
                </h1>
                <p className="text-[#666666] font-normal text-xs sm:text-sm py-1">
                  Senior DevOps Engineer & Cloud Infrastructure Expert
                </p>
              </div>
              <p className="text-[#2E2E2E] text-xs sm:text-base font-normal py-3 leading-relaxed">
                Alex Thompson is a highly skilled DevOps engineer with over a
                decade of experience in automating and optimizing cloud
                infrastructures. He has led DevOps teams at top tech firms,
                focusing on improving deployment pipelines, enhancing system
                reliability, and implementing robust CI/CD practices. Alex is a
                dedicated mentor, known for his ability to simplify complex
                DevOps concepts and tools, empowering his students to excel in
                dynamic tech environments.
              </p>
            </div>
            <div className="my-3">
              <h1 className="text-[#2E2E2E] font-semibold text-sm sm:text-lg">
                Course Reviews
              </h1>
              <div>
                <p className="font-normal text-[#666666] text-xs sm:text-base leading-relaxed my-2">
                  Alex, a seasoned DevOps professional with over a decade of
                  experience in optimizing cloud infrastructures. Alex has led
                  DevOps teams at top tech firms, focusing on improving
                  deployment processes, enhancing system reliability, and
                  implementing robust{" "}
                </p>
                <div className="flex items-center justify-between my-3">
                  <div className="flex items-center gap-2">
                    <Image
                      alt=""
                      src={customImg}
                      className="w-8 h-8 rounded-full"
                    />
                    <p className="text-sm sm:text-base font-semibold text-[#484848]">
                      Alex Thompson
                    </p>
                    <div className=" h-1 w-1 rounded-full bg-[#2E2E2E]" />
                    <p className="text-[#666666] font-normal text-xs sm:text-sm">
                      4 months ago
                    </p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <Image alt="rate" src={rate} className="w-4 h-4" />
                    <p className="text-[#484848] text-xs sm:text-sm font-normal">4.5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex py-10 cursor-pointer justify-center">
          <button
            onClick={() => {
              router.push("/custom-pricing/order-summary");
            }}
            className="bg-sub rounded-[8px] py-4 text-[#2E2E2E] text-sm sm:text-base font-medium w-full sm:w-1/3"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
