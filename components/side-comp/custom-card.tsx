import Image from "next/image";
import React, { useEffect, useState } from "react";

import customImg from "@/src/assets/customimg.png";
import note from "@/src/assets/svg/note.svg";
import timer from "@/src/assets/svg/timer.svg";
import rate from "@/src/assets/svg/rate.svg";

import { BsCartPlus } from "react-icons/bs";
import { useRouter } from "next-nprogress-bar";
import { courseListType } from "@/app/(screens)/custom-pricing/page";
import { baseURL } from "@/utils/config";
import axios from "axios";
import { toast } from "react-toastify";
import refreshAdminToken from "@/utils/refreshToken";
import { Loader, Loader2 } from "lucide-react";

const CustomCard = (
  {
    id,
    title,
    slug,
    price,
    course_image,
    modules_count,
    course_duration,
  }: courseListType,
  key: any
) => {
  const router = useRouter();
  // const id = 1;
  const [loading, setLoading] = useState(false);
  const [cartId, setCartId] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("custom_cart_id");
    if (storedId) {
      setCartId(storedId);
    }
  }, []);

  const addToCart = async () => {
    try {
      setLoading(true);

      const payload: any = {
        course_ids: [id],
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
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      key={key}
      onClick={() => router.push(`custom-pricing/${id}`)}
      className="max-w-[416px] shadow-md h-[350px] bg-white rounded-[8px] p-2"
    >
      <div className=" rounded-tl-[8px] rounded-tr-[8px]">
        <Image
          src={course_image}
          className="w-full  h-[180px]"
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
                  {modules_count} modules
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
              addToCart();
            }}
            disabled={loading}
            className="bg-sub cursor-pointer disabled:bg-sub/70 rounded-[6px] flex items-center justify-between gap-2 p-[12px_10px] sm:p-[16px_14px]"
          >
            {loading ? (
              <Loader2 className="text-white w-4 h-4 animate-spin" />
            ) : (
              <BsCartPlus className=" text-white w-4 h-4" />
            )}
            <p className="text-sm hidden sm:block font-semibold text-white">
              {loading ? "Adding to cart..." : "Add to cart"}
            </p>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CustomCard;
