import { usePlanStore } from "@/store/plan-store";
import Image from "next/image";
import { useRouter } from "next-nprogress-bar";
import { useEffect, useRef, useState } from "react";
import logo from "@/src/assets/pistis_logo.png";
import Cookies from "js-cookie";
import axios from "axios";
import { urls } from "@/utils/config";
import refreshAdminToken from "@/utils/refreshToken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2 } from "lucide-react";

const data = [
  "4 one-on-one mentorship sessions per month",
  "6 months of unlimited access",
  "15 courses",
  "15 projects",
  "Group Blocker Sessions",
];

const IntermediateCardModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { plans } = usePlanStore();
  const modal = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [coupon, setCoupon] = useState<string | null>(null);

  const [selectedPlan, setSelectedPlan] = useState<{
    price: number;
    duration: string;
  }>({
    price: 400000,
    duration: "6months",
  });

  const toggleModal = () => setIsOpen(!isOpen);

  const [paying, setPaying] = useState(false);
  const handleClick = async () => {
    const userId = Cookies.get("userId");
    const plan = plans.find((itm) => itm.name.includes("INTERMEDIATE"));

    const data = {
      user: userId,
      plan: plan?.id,
      duration: selectedPlan.duration,
      ...(coupon?.trim() && { coupon_code: coupon.trim() }),
    };

    try {
      setPaying(true);
      const accessToken = Cookies.get("authToken");
      const response = await axios.post(urls.makeIntermediatePayment, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response, "intermediate payment");
      if (response.status === 200) {
        window.open(response.data.payment_data.authorization_url, "_blank");
        toast.success(response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
        toggleModal();
        setPaying(false);
      } else {
        toast.error("Payment Failed!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
        setPaying(false);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await handleClick();
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
        toast.error(`Payment Failed; ${error.response.data.user.email[0]}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      }
    } finally {
      setPaying(false);
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (isOpen && modal.current && !modal.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <>
      <ToastContainer />
      <button
        className="bg-main rounded-[10px] font-semibold mt-6 mb-2 h-[52px] flex items-center justify-center text-white"
        onClick={() => setIsOpen(true)}
      >
        Select Plan
      </button>

      <div
        className={
          "fixed inset-0  bg-white bg-opacity-30 transition-all ease-in-out duration-300 flex justify-center items-center z-50 " +
          (isOpen
            ? "opacity-100 backdrop-blur-sm"
            : "opacity-0 backdrop-blur-none pointer-events-none")
        }
      >
        <div
          className={
            "shadow-[0px_0px_45px_0px_#0000004D] bg-white  rounded-[20px] flex items-center gap-y-3 sm:gap-y-6 w-[90vw] md:max-w-[692px] h-[95vh] overflow-y-scroll flex-col py-2 sm:py-10 " +
            (isOpen ? "translate-y-0 scale-100" : "translate-y-full scale-50")
          }
          ref={modal}
        >
          <ToastContainer />
          <div className="flex flex-col items-center justify-center w-full">
            <Image src={logo} alt="Pistis logo" />

            <span className=" max-w-full sm:max-w-[68%] text-center w-full">
              <h1 className="text-main text-xl sm:text-[32px] font-bold">
                Intermediate Plan
              </h1>
              <p className="text-[#828282] sm:text-base text-sm">
                Before proceeding to payment you are expected to have:
              </p>
            </span>
          </div>

          <div className="w-[90%] sm:w-[80%] md:w-[532px]">
            <ul className="list-disc list-inside text-[#2E2E2E] sm:text-base text-sm mb-10">
              {data.map((itm) => (
                <li key={itm}>{itm}</li>
              ))}
            </ul>

            <hr className="mt-5" />

            <div className="my-5">
              <p className="font-normal sm:text-left text-center text-xs sm:text-sm font-sfProDisplay text-[#666666]">
                Select a payment schedule:
              </p>
              <div className="flex items-center justify-between gap-2 flex-col mt-2.5">
                <div
                  className={`w-full border cursor-pointer h-auto rounded-[8px] p-2 sm:p-1.5 transition duration-200 ${
                    selectedPlan.duration === "6months"
                      ? "border-sub"
                      : "border-[#DADADA]"
                  }`}
                  onClick={() =>
                    setSelectedPlan({ price: 400000, duration: "6months" })
                  }
                >
                  <h1
                    className={`font-medium text-2xl sm:text-3xl flex items-center gap-1.5 pb-3 transition duration-200 ${
                      selectedPlan.duration === "6months"
                        ? "text-main"
                        : "text-[#DADADA]"
                    }`}
                  >
                    ₦400,000{" "}
                    <span className="font-normal text-sm text-[#484848]">
                      + (VAT 4.6%){" "}
                      <span className="text-medium text-[#484848]">
                        ₦6,328.92
                      </span>
                    </span>
                  </h1>
                  <p className="font-normal text-xs sm:text-sm font-sfProDisplay text-[#666666]">
                    One-time payment{" "}
                    <span className="text-sub">(Save up to 12%)</span>
                  </p>
                </div>
                <div
                  className={`w-full border cursor-pointer h-auto rounded-[8px] p-2 sm:p-3 transition duration-200 ${
                    selectedPlan.duration === "30days"
                      ? "border-sub"
                      : "border-[#DADADA]"
                  }`}
                  onClick={() =>
                    setSelectedPlan({ price: 73000, duration: "30days" })
                  }
                >
                  <h1
                    className={`font-medium text-2xl flex items-center gap-1.5 sm:text-3xl pb-3 transition duration-200 ${
                      selectedPlan.duration === "30days"
                        ? "text-main"
                        : "text-[#DADADA]"
                    }`}
                  >
                    ₦73,000{" "}
                    <span className="font-normal text-sm text-[#484848]">
                      + (VAT 4.6%){" "}
                      <span className="text-medium text-[#484848]">
                        ₦4,228.92
                      </span>
                    </span>
                  </h1>
                  <p className="font-normal text-xs sm:text-sm font-sfProDisplay text-[#666666]">
                    Billed Monthly for 6 Months
                  </p>
                </div>
              </div>
            </div>

            <div className="my-2 w-full mx-auto">
              <label
                className="font-sfProDisplay font-normal py-0.5 text-sm sm:text-base text-[#2E2E2E"
                htmlFor="discount_code"
              >
                Discount Code (optional)
              </label>{" "}
              <br />
              <input
                value={coupon!}
                onChange={(e) => setCoupon(e.target.value)}
                type="text"
                placeholder="Enter  your Discount Code"
                className="bg-[#FAFAFA] w-full text-sm sm:text-base p-4 border border-[#DADADA] rounded-[6px]"
              />
            </div>

            <button
              disabled={paying}
              className="bg-main disabled:bg-main/20 disabled:cursor-not-allowed h-[50px] flex items-center justify-center w-full font-sfProDisplay text-white rounded-lg font-medium mt-10"
              onClick={handleClick}
            >
              {paying ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="text-white animate-spin" />
                </span>
              ) : (
                <p>
                  {" "}
                  Proceed to Payment{" "}
                  <span className="font-semibold text-sub text-lg">
                    ₦{selectedPlan.price}
                  </span>
                </p>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default IntermediateCardModal;
