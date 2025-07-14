"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Loader,
  Loader2Icon,
  Search,
  ShoppingCart,
} from "lucide-react";

import pistis from "@/src/assets/full-logo.png";
import { useRouter } from "next-nprogress-bar";
import CustomCard from "@/components/side-comp/custom-card";
import axios from "axios";
import { baseURL } from "@/utils/config";
import { toast, ToastContainer } from "react-toastify";
import useCartStore from "@/store/fetch-cart";

export interface courseListType {
  id: string;
  title: string;
  slug: string;
  price: string;
  course_image: string;
  modules_count: number;
  course_duration: string;
}
const CustomPayment = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<courseListType[]>([]);
  const getCustomCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/courses/advanced-courses/`);
      console.log(response, "res");
      if (response.status === 200) {
        setCourses(response.data);
        setLoading(false);
      } else {
        toast.error(`Error fetching courses`, {
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
      toast.error(`Error fetching courses: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCustomCourses();
  }, []);

  const { fetchCart, cart } = useCartStore();

  useEffect(() => {
    const storedId = localStorage.getItem("custom_cart_id");
    if (storedId) {
      fetchCart(storedId);
    }
    // console.log(storedId, "stored");
  }, []);
  return (
    <div className="bg-slate-50 h-screen overflow-y-scroll">
      <ToastContainer />
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

      <div className="px-5 sm:px-10 md:px-20 ">
        <div className="flex py-5 items-center justify-between">
          <span
            onClick={() => router.back()}
            className="flex items-center gap-x-1 cursor-pointer"
          >
            <ChevronLeft className="sm:w-6 h-4 sm:h-6 w-4" />
            <p className=" font-medium text-sm sm:text-base md:text-lg text-[#2E2E2E]">
              Available Courses
            </p>
          </span>
          <span>
            <button
              onClick={() => {
                router.push("/custom-pricing/order-summary");
              }}
              className="bg-sub cursor-pointer rounded-[6px] flex items-center justify-between gap-2 p-[12px_10px] sm:p-[16px_14px]"
            >
              <span className="relative">
                <ShoppingCart className=" text-white sm:w-6 h-4 sm:h-6 w-4" />
                <p className="bg-[#FF0000] absolute top-0 -right-1 rounded-full flex items-center justify-center text-xs w-[12px] sm:w-[14px] h-[12px] sm:h-[14px] text-white font-medium">
                  {cart?.items?.length}
                </p>
              </span>
              <p className="sm:text-sm hidden sm:block text-xs font-semibold text-white">
                Check Out
              </p>
            </button>
          </span>
        </div>
        {loading ? (
          <span className="text-main w-full flex items-center justify-center">
            <Loader2Icon className="animate-spin" />
            <p className="sm:text-lg text-base md:text-xl">Loading...</p>
          </span>
        ) : courses && courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course: any) => (
              <CustomCard
                key={course.id}
                id={course.id}
                title={course.title}
                slug={course.slug}
                price={course.price}
                course_image={course.course_image}
                modules_count={course.modules_count}
                course_duration={course.course_duration}
              />
            ))}
          </div>
        ) : (
          <p className="text-center w-full lg:text-xl font-semibold text-main text-sm">
            No course available yet!
          </p>
        )}
      </div>

      <div className="flex py-10 cursor-pointer justify-center">
        <button
          onClick={() => {
            router.push("/custom-pricing/order-summary");
          }}
          className="bg-sub rounded-[8px] py-4 text-[#2E2E2E] text-base font-medium w-1/3"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CustomPayment;
