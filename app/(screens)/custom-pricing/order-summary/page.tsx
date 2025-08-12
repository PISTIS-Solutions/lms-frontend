"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next-nprogress-bar";

import { ChevronLeft, Info, Loader2, Search } from "lucide-react";
import { FaLock } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { AiTwotoneDelete } from "react-icons/ai";

import note from "@/src/assets/svg/note.svg";
import timer from "@/src/assets/svg/timer.svg";

import useCartStore from "@/store/fetch-cart";
import { useCartStoreInitial } from "@/store/cart/cartStore";
import axios from "axios";
import { urls } from "@/utils/config";
import refreshAdminToken from "@/utils/refreshToken";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

const OrderSummary = () => {
  const router = useRouter();
  const { fetchCart, cart, loading } = useCartStore();

  // const inputs = [
  //   {
  //     name: "full_name",
  //     label: "Full Name",
  //   },
  //   {
  //     name: "email",
  //     label: "Email Address",
  //   },
  // ];

  const { selectedCourses, toggleCourse, clearCart } = useCartStoreInitial();
  const [coupon, setCoupon] = useState<string | null>(null);

  const [loadingCart, setLoadingCart] = useState(false);
  // const [cartId, setCartId] = useState("");

  const makeCoursePurchase = async (id: string) => {
    setLoadingCart(true);
    try {
      const accessToken = Cookies.get("authToken");
      const response = await axios.post(
        `${urls.cart}${id}/checkout/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response, "make course purchase");

      if (response.status === 201) {
        window.open(response.data.payment_url, "_blank");
        clearCart();
        setCoupon("");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        const refreshed = await refreshAdminToken();
        if (refreshed) {
          await makeCoursePurchase(id);
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
    } finally {
      setLoadingCart(false);
    }
  };

  // const makeCoursePurchaseII = async () => {
  //   setLoadingCart(true);
  //   try {
  //     const accessToken = Cookies.get("authToken");
  //     const response = await axios.post(
  //       `${urls.subs}make-payment-advanced/`,
  //       {
  //         course_ids: selectedCourses.map((course) => course.id),
  //         ...(coupon?.trim() && { coupon_code: coupon.trim() }),
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     console.log(response, "make course purchase II");

  //     if (response.status === 201) {
  //       window.open(response.data.payment_url, "_blank");
  //       clearCart();
  //     }
  //   } catch (error: any) {
  //     if (error.response && error.response.status === 401) {
  //       await refreshAdminToken();
  //       await makeCoursePurchaseII();
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
  //   } finally {
  //     setLoadingCart(false);
  //   }
  // };

  const addToBECart = async () => {
    setLoadingCart(true);
    try {
      const accessToken = Cookies.get("authToken");
      const response = await axios.post(
        `${urls.cart}add/`,
        {
          course_ids: selectedCourses.map((course) => course.id),
          ...(coupon?.trim() && { coupon_code: coupon.trim() }),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response, "add course to backend");
      if (response.status === 200) {
        // setCartId(response.data.id);
        await makeCoursePurchase(response.data.id);
      } else {
        toast.error("Failed to add to cart", {
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
      if (error.response && error.response.status === 401) {
        const refreshed = await refreshAdminToken();
        if (refreshed) {
          await addToBECart();
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
    }
  };

  return (
    <div className="bg-slate-50 h-[100%]">
      <ToastContainer />
      <div className="sm:p-5 p-2 flex md:flex-row flex-col  justify-between gap-1 lg:gap-5">
        <div className="bg-main rounded-[16px] w-full overflow-scroll  h-[100vh] p-10">
          <div
            onClick={() => router.back()}
            className="flex items-center gap-5 text-white"
          >
            <span className="cursor-pointer">
              <ChevronLeft className="w-6 h-6" />
            </span>
            <p className=" font-medium text-base md:text-2xl">
              Order Summary{" "}
              <span className="text-[#2FBC8D] font-semibold text-lg">
                ({selectedCourses?.length})
              </span>
            </p>
          </div>
          <div>
            <p className="font-medium text-sm sm:text-base text-white text-center pt-2">
              Total payment
            </p>
            <h1 className="font-semibold md:text-4xl text-2xl lg:text-5xl text-white text-center py-3">
              ₦
              {selectedCourses
                ?.reduce((acc, course) => acc + (Number(course.price) || 0), 0)
                .toLocaleString()}
            </h1>

            <div className="flex items-center gap-2 justify-center my-3">
              <FaLock className=" h-4 sm:w-6 w-4 sm:h-6 text-[#2FBC8D]" />
              <p className="font-medium text-sm sm:text-base text-white text-center">
                Secure Payment
              </p>
            </div>
          </div>
          <hr className="my-5" />
          {selectedCourses?.length === 0 ? (
            <div className="w-full h-[50vh] items-center flex justify-center overflow-y-scroll">
              <p className="text-white font-medium text-center">
                No courses added to cart!
              </p>
            </div>
          ) : (
            <div className="w-full flex justify-center overflow-y-scroll">
              <div className="bg-[#FFFFFF1A] rounded-[8px] w-full lg:w-[80%]">
                {selectedCourses?.map((cart: any, index) => {
                  // const id = 1;
                  return (
                    <div key={index}>
                      <div
                        onClick={() =>
                          router.push(`/custom-pricing/${cart?.course?.id}`)
                        }
                        className="flex flex-col gap-5 py-5 p-4 cursor-pointer"
                      >
                        <div className="flex justify-between">
                          <h1 className="font-medium text-xs sm:text-base text-white">
                            {cart?.title}
                          </h1>
                          <AiTwotoneDelete
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCourse({
                                id: cart.id,
                                title: cart.title,
                                price: cart.price,
                                module_count: cart.module_count,
                                course_duration: cart.course_duration,
                              });
                            }}
                            className="p-2 text-white cursor-pointer flex-none w-10 h-10"
                          />
                        </div>
                        <div className="">
                          <div className="flex w-full items-center gap-x-[8px] flex-wrap ">
                            <span className="bg-[#E6F6FF] rounded py-1 px-2 flex my-1 items-center w-full justify-center gap-2">
                              <Image
                                alt="note"
                                src={note}
                                className="w-4 h-4"
                              />
                              <p className="text-[#014873] font-normal text-xs whitespace-nowrap sm:text-sm">
                                {cart?.module_count}
                              </p>
                            </span>
                            <span className="bg-[#E6F6FF] rounded py-1 px-2 flex items-center w-full justify-center gap-2">
                              <Image
                                alt="note"
                                src={timer}
                                className="w-4 h-4"
                              />
                              <p className="text-[#014873] font-normal text-xs sm:text-sm">
                                {cart?.course_duration}
                              </p>
                            </span>
                          </div>
                          <h1 className="font-semibold my-2 text-xl w-full sm:text-center text-right sm:text-2xl text-white">
                            ₦{cart?.price}
                          </h1>
                        </div>
                      </div>
                      <hr />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="my-2 w-full lg:w-[80%] mx-auto">
            <label
              className="font-sfProDisplay font-normal py-0.5 text-sm sm:text-base text-white"
              htmlFor="discount_code"
            >
              Discount Code (optional)
            </label>{" "}
            <br />
            <input
              disabled={loadingCart}
              value={coupon!}
              onChange={(e) => setCoupon(e.target.value)}
              type="text"
              placeholder="Enter  your Discount Code"
              className="bg-[#FAFAFA] w-full text-sm sm:text-base p-4 border border-[#DADADA] rounded-[6px]"
            />
          </div>
          <button
            onClick={() => addToBECart()}
            className="bg-white w-full lg:w-[80%] h-[50px] border border-white text-sm sm:text-base flex items-center justify-center mx-auto text-main rounded-lg font-medium mt-10"
          >
            {loadingCart ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Proceed to Make Payment"
            )}
          </button>
          <div className="text-xs sm:text-xs font-normal flex items-center justify-center gap-2 sm:gap-5 mt-5 text-white">
            <p>© {new Date().getFullYear()} All rights reserved</p> .
            <p>Terms of Service</p> .<p>Privacy Policy</p>
          </div>
        </div>
        {/* <div className=" w-full lg:w-[40%] p-5 md:p-10">
          <div>
            <h1 className="text-main font-semibold text-xl sm:text-3xl">
              Personal Details
            </h1>
            <p className="text-[#666666] text-sm sm:text-base font-medium">
              Not team model seems turn per info.
            </p>
          </div>
          <div>
            <form
              className="w-full mt-5 space-y-2"
              // onSubmit={handleSubmit}
            >
              <div className="">
                {inputs.map((itm) => (
                  <div key={itm.label} className="mb-2">
                    <label
                      htmlFor={itm.label}
                      className="capitalize sm:text-base text-sm text-[#2E2E2E] mb-2"
                    >
                      {itm.label}
                    </label>
                    <input
                      type={itm.label === "Email Address" ? "email" : "text"}
                      className="outline-none border sm:text-base text-sm border-[#DADADA] bg-[#FAFAFA] placeholder:text-[#9F9F9F] py-2 sm:py-3 px-3 sm:px-[14px] w-full rounded-md"
                      placeholder={`Enter your ${itm.label.toLocaleLowerCase()}`}
                      id="Name"
                      required
                      name={itm.name}
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="Phone Number"
                    className="capitalize sm:text-base text-sm text-[#2E2E2E] mb-2"
                  >
                    Phone Number
                  </label>
                  <div className="border border-[#DADADA] bg-[#FAFAFA] flex items-center rounded-md py-2 sm:py-3 px-3 sm:px-[14px]">
                    <span className="border-r sm:text-base text-sm border-[#2E2E2E]">
                      +234
                    </span>
                    <input
                      type="number"
                      className="outline-none sm:text-base text-sm placeholder:text-[#9F9F9F]  w-full "
                      id="Name"
                      placeholder="123 456 7890"
                      required
                      name="phone_number"
                    />
                  </div>

                  <span className="flex gap-x-[6px] text-[#9F9F9F] text-xs items-center mt-2">
                    <Info className="text-[#9F9F9F] rotate-180" size={11.67} />
                    <span>This number should be active on WhatsApp</span>
                  </span>
                </div>

                <button className="bg-main h-[50px] text-sm sm:text-base flex items-center justify-center w-full text-white rounded-lg font-medium mt-10">
                  Proceed to Make Payment
                </button>
              </div>
            </form>
          </div>
        </div> */}
      </div>
      {/* 
      <div className="flex items-center justify-between my-5">
       
      </div>
      <div className="flex w-full justify-center flex-col items-center">
        <div className="bg-white rounded-[8px]  p-6 shadow-lg h-[339px] overflow-y-scroll w-1/2">
          {carts.map((cart, index) => {
            return (
              <div key={index} className="flex flex-col gap-5 py-5">
                <div className="flex justify-between">
                  <h1 className="font-medium text-base text-[#2E2E2E]">
                    {cart.title}
                  </h1>
                  <span className="p-2 bg-[#FF0000] text-white w-8 h-8 flex items-center justify-center rounded-[6px] cursor-pointer">
                    <AiTwotoneDelete />
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-[8px]">
                    <span className="bg-[#E6F6FF] rounded py-1 px-2 flex items-center justify-between">
                      <Image alt="note" src={note} className="w-4 h-4" />
                      <p className="text-[#014873] font-normal text-sm">
                        12 modules
                      </p>
                    </span>
                    <span className="bg-[#E6F6FF] rounded py-1 px-2 flex items-center justify-between">
                      <Image alt="note" src={timer} className="w-4 h-4" />
                      <p className="text-[#014873] font-normal text-sm">
                        85hr 43min
                      </p>
                    </span>
                  </div>
                  <h1 className="font-semibold text-xl text-[#484848]">
                    {cart.price}
                  </h1>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
       
        </div>
        <div className="flex pb-4 cursor-pointer justify-center">
          <button
            onClick={() => {
            //   router.push("/custom-pricing/order-summary");
            }}
            className="bg-sub rounded-[8px] py-4 text-[#2E2E2E] text-base font-medium w-full px-10"
          >
            Confirm Order
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default OrderSummary;
