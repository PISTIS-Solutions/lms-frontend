"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next-nprogress-bar";
// import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import { Button } from "@/components/ui/button";
import CustomCard from "@/components/side-comp/custom-card";
import useCartStore from "@/store/fetch-cart";

import pistis from "@/src/assets/full-logo.png";
import { baseURL } from "@/utils/config";

import { ChevronLeft, Loader2Icon, ShoppingCart } from "lucide-react";
import { useCartStoreInitial } from "@/store/cart/cartStore";
import { createAxiosInstance } from "@/lib/axios";

export interface CourseType {
  id: string;
  title: string;
  slug: string;
  price: string;
  course_image: string;
  module_count: number;
  course_duration: string;
}

const CustomPayment = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<CourseType[]>([]);

  const { fetchCart, cart } = useCartStore();
  const axios = createAxiosInstance();

  const fetchCourses = async () => {
    try {
      const { data, status } = await axios.get(
        `${baseURL}/courses/advanced-courses/`
      );
      if (status === 200) {
        setCourses(data);
      } else {
        toast.error("Failed to fetch courses");
      }
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCheckout = () => router.push("/custom-pricing/order-summary");
  const { selectedCourses } = useCartStoreInitial();

  return (
    <div className="bg-slate-50 min-h-screen overflow-y-auto">
      <ToastContainer />

      <main className="px-5 sm:px-7 md:px-10">
        <div className="flex py-5 items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-x-1"
          >
            <ChevronLeft className="w-4 sm:w-6 h-4 sm:h-6" />
            <span className="text-sm sm:text-base md:text-lg font-medium text-[#2E2E2E]">
              Available Courses
            </span>
          </button>

          <button
            onClick={handleCheckout}
            className="bg-sub rounded-[6px] flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3"
          >
            <span className="relative">
              <ShoppingCart className="text-white w-4 sm:w-6 h-4 sm:h-6" />
              {selectedCourses?.length > 0 && (
                <span className="absolute top-0 -right-1 w-[12px] h-[12px] sm:w-[14px] sm:h-[14px] bg-[#FF0000] text-white text-xs flex items-center justify-center rounded-full">
                  {selectedCourses?.length}
                </span>
              )}
            </span>
            <span className="hidden sm:block text-xs sm:text-sm font-semibold text-white">
              Check Out
            </span>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center gap-2 text-main py-10">
            <Loader2Icon className="animate-spin w-5 h-5" />
            <p className="text-base sm:text-lg">Loading...</p>
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => (
              <CustomCard key={course.id} {...course} />
            ))}
          </div>
        ) : (
          <p className="text-center text-main font-semibold text-sm lg:text-xl py-10">
            No courses available yet!
          </p>
        )}

        <div className="flex justify-center py-10">
          <button
            onClick={handleCheckout}
            className="bg-sub w-1/2 sm:w-1/3 rounded-[8px] py-4 text-base font-medium text-[#2E2E2E]"
          >
            Proceed to Payment
          </button>
        </div>
      </main>
    </div>
  );
};

export default CustomPayment;
