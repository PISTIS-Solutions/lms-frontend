import Image from "next/image";
import React, { useEffect, useState } from "react";

import customImg from "@/src/assets/customimg.png";
import note from "@/src/assets/svg/note.svg";
import timer from "@/src/assets/svg/timer.svg";
import rate from "@/src/assets/svg/rate.svg";

import { BsCartPlus } from "react-icons/bs";
import { useRouter } from "next-nprogress-bar";
import { CourseType } from "@/app/(screens)/custom-pricing/page";
import { motion } from "framer-motion";
import { useCartStoreInitial } from "@/store/cart/cartStore";
import { Check } from "lucide-react";

const CustomCard = (
  {
    id,
    title,
    slug,
    price,
    course_image,
    module_count,
    course_duration,
  }: CourseType,
  key: any
) => {
  const router = useRouter();
  const { selectedCourses, toggleCourse } = useCartStoreInitial();
  // const id = 1;
  // const [loading, setLoading] = useState(false);
  // const [cartId, setCartId] = useState<string | null>(null);

  // const addToCart = async () => {
  //   try {
  //     setLoading(true);

  //     const payload: any = {
  //       course_ids: [id],
  //     };
  //     if (cartId) {
  //       payload.cart_id = cartId;
  //     }
  //     const response = await axios.post(`${baseURL}/cart/add/`, payload);
  //     console.log(response.data.id);
  //     if (response.status === 200) {
  //       if (!cartId && response.data.id) {
  //         setCartId(response.data.id);
  //         localStorage.setItem("custom_cart_id", response.data.id);
  //       }
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
  //     setLoading(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <motion.div
      key={key}
      onClick={() => router.push(`custom-pricing/${id}`)}
      className="w-full shadow-md h-[370px] bg-white rounded-[8px] p-2"
    >
      <div className=" ">
        <Image
          src={course_image}
          className="w-full object-cover rounded-tl-[8px] rounded-tr-[8px] h-[200px]"
          alt={title}
          width={100}
          height={100}
        />
      </div>
      <div className="p-2 flex flex-col justify-between">
        <div>
          <h3 className=" text-sm sm:text-base font-semibold text-[#2E2E2E]">
            {title}
          </h3>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-x-[8px]">
              <span className="bg-[#E6F6FF] rounded py-1 px-2 flex items-center justify-between">
                <Image alt="note" src={note} className="w-4 h-4" />
                <p className="text-[#014873] font-normal text-xs sm:text-sm">
                  {module_count} module(s)
                </p>
              </span>
              <span className="bg-[#E6F6FF] rounded py-1 px-2 flex items-center justify-between">
                <Image alt="note" src={timer} className="w-4 h-4" />
                <p className="text-[#014873] font-normal text-xs sm:text-sm">
                  {course_duration}
                </p>
              </span>
            </div>
            {/* <div className="flex items-center gap-x-2">
              <Image alt="rate" src={rate} className="w-4 h-4" />
              <p className="text-[#484848] text-sm font-normal">4.5 (163)</p>
            </div> */}
          </div>
        </div>
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-[#484848] text-xs font-normal">Price</p>
            <p className=" font-semibold text-base sm:text-xl text-[#484848]">
              ₦{price}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCourse({ id, title, price, module_count, course_duration });
            }}
            // disabled={loading}
            className={` ${
              selectedCourses.some((course) => course.id === id)
                ? " border border-sub bg-white"
                : "bg-sub "
            } cursor-pointer rounded-[6px] flex items-center justify-between gap-2 p-[12px_10px] sm:p-[16px_14px]`}
          >
            {/* {loading ? (
              <Loader2 className="text-white w-4 h-4 animate-spin" />
            ) : (
              <BsCartPlus className=" text-white w-4 h-4" />
            )} */}
            <p className="text-sm hidden sm:block font-semibold text-white">
              {/* {loading ? "Adding to cart..." : "Add to cart"} */}
              {selectedCourses.some((course) => course.id === id) ? (
                <span className="flex text-sub items-center gap-1">
                  <Check className="w-4 h-4 text-sub" />
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
      </div>
    </motion.div>
  );
};

export default CustomCard;
