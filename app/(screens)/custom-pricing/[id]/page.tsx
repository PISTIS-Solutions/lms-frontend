"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Check,
  ChevronLeft,
  Loader2Icon,
  Search,
  ShoppingCart,
} from "lucide-react";
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
import { useCartStoreInitial } from "@/store/cart/cartStore";
import { BsCartPlus } from "react-icons/bs";

interface courseReadType {
  id: string;
  title: string;
  slug: string;
  course_category: string;
  course_image: string | any;
  overview: string;
  course_url: string;
  course_duration: string;
  order?: number;
  modules: [];
  modules_count: number;
  price: string;
  owner: {
    id: string;
    user: {
      id: string;
      email: string;
      first_name: string;
      last_name: string;
      phone_number: string;
      location: string;
      profile_photo: string;
      is_onboarded: boolean;
      is_active: boolean;
      is_student: boolean;
      is_staff: boolean;
      date_joined: string;
      last_login: string;
      status: string;
    };
    role: string;
    position: string;
    bio: string;
  };
  review_count: number;
  average_rating: string | null;
}
const CourseDetails = () => {
  const router = useRouter();
  const params = useParams();
  const { selectedCourses, toggleCourse } = useCartStoreInitial();

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
        const refreshed = await refreshAdminToken();
        if (refreshed) {
          await getCustomCourses(id);
        }
        return;
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

  // const [cartId, setCartId] = useState<string | null>(null);
  // const [loadAdd, setLoadAdd] = useState(false);

  // const addToCart = async () => {
  //   try {
  //     setLoadAdd(true);

  //     const payload: any = {
  //       course_ids: [course?.id],
  //     };
  //     if (cartId) {
  //       payload.cart_id = cartId;
  //     }
  //     const response = await axios.post(`${baseURL}/cart/add/`, payload);
  //     console.log(response.data.id);
  //     if (response.status === 200) {
  //       toast.success(`${response.data.items[0].course.title} added to cart`, {
  //         position: "top-right",
  //         autoClose: 5000,
  //         theme: "dark",
  //       });
  //     } else {
  //       toast.error("Error adding to cart", {
  //         position: "top-right",
  //         autoClose: 5000,
  //         theme: "dark",
  //       });
  //     }
  //   } catch (error: any) {
  //     toast.error(`Error adding to cart: ${error.message}`, {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: false,
  //       draggable: false,
  //       theme: "dark",
  //     });
  //     if (error.response && error.response.status === 401) {
  //       await refreshAdminToken();
  //       await addToCart();
  //     } else if (error?.message === "Network Error") {
  //       toast.error("Check your network!", {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: false,
  //         draggable: false,
  //         theme: "dark",
  //       });
  //     } else {
  //       toast.error(error?.response?.data?.detail, {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: false,
  //         draggable: false,
  //         theme: "dark",
  //       });
  //     }
  //     setLoadAdd(false);
  //   } finally {
  //     setLoadAdd(false);
  //   }
  // };

  if (loading)
    return (
      <div className="bg-slate-50 h-[100%]">
        <div className="h-screen w-full flex justify-center items-center">
          <span className="text-main w-full flex items-center justify-center">
            <Loader2Icon className="animate-spin" />
            <p className="text-base sm:text-sm md:text-base">
              Loading course information...
            </p>
          </span>
        </div>
      </div>
    );

  return (
    <div className="bg-slate-50 h-[100%]">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div
            onClick={() => router.back()}
            className="flex items-center gap-0.5 sm:gap-1"
          >
            <ChevronLeft />
            <p className="text-[#2E2E2E] text-xs sm:text-sm md:text-base font-medium">{`Course Details / ${course?.title}`}</p>
          </div>
          <button
            // disabled={loadAdd}
            onClick={() => {
              toggleCourse({
                id: course!.id,
                title: course!.title,
                price: course!.price,
                module_count: course!.modules_count,
                course_duration: course!.course_duration,
              });
            }}
            className="bg-sub disabled:bg-sub/70 cursor-pointer rounded-[6px] flex items-center justify-between gap-2 p-[12px_10px] sm:p-[16px_14px]"
          >
            <p className="text-sm font-semibold hidden sm:block text-white">
              {/* {loadAdd ? "Adding to cart" : "Add to cart"} */}
              {selectedCourses.some((cart) => cart.id === course?.id) ? (
                <span className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-white" />
                  <span className="hidden sm:inline">Added</span>
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <BsCartPlus className="w-4 h-4 text-white" />
                  <span className="hidden sm:inline">Add to cart</span>
                </span>
              )}
            </p>
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-5 my-5">
          <div className="md:w-[60%] w-full bg-white shadow-lg p-2 rounded-[8px]">
            <Image
              // alt={course?.title}
              alt="courseDetailImage"
              className="w-full object-cover rounded-tl-[8px] rounded-tr-[8px] h-[328px] "
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
                      {course?.modules.length} module(s)
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
                    {course?.average_rating === null
                      ? "0"
                      : course?.average_rating}{" "}
                    ({course?.review_count})
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3">
                <p className="text-[#484848] font-medium text-xs sm:text-sm">
                  Price:
                </p>
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
                    width={96}
                    height={96}
                    alt={`${course?.owner?.user?.first_name} ${course?.owner?.user?.last_name}`}
                    src={course?.owner?.user?.profile_photo!}
                    className="w-24 h-24 rounded-full object-fill"
                  />
                  {/* <MdOpenInNew className="text-[#484848] h-5 w-5 cursor-pointer" /> */}
                </div>
                <h1 className="text-main font-semibold text-sm sm:text-lg mt-3">
                  {`${course?.owner?.user?.first_name} ${course?.owner?.user?.last_name}`}
                </h1>
                <p className="text-[#666666] font-normal text-xs sm:text-sm py-1">
                  {course?.owner?.position === "frontend_dev"
                    ? "Frontend Developer"
                    : course?.owner?.position === "backend_dev"
                    ? "Backend Developer"
                    : course?.owner?.position === "faculty_lead"
                    ? "Faculty Lead"
                    : course?.owner?.position}
                </p>
              </div>
              <p className="text-[#2E2E2E] text-xs sm:text-base font-normal py-3 leading-relaxed">
                {course?.owner?.bio}
              </p>
            </div>
            {/* <div className="my-3">
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
                <div className="flex flex-wrap items-center justify-between my-3">
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
                    <p className="text-[#484848] text-xs sm:text-sm font-normal">
                      4.5
                    </p>
                  </div>
                </div>
              </div>
            </div> */}
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
