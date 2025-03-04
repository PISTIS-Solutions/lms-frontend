import { usePlanStore } from "@/store/plan-store";
import Image from "next/image";
import { useRouter } from "next-nprogress-bar";
import { useEffect, useRef, useState } from "react";
import logo from "@/public/assets/pistis_logo.png";
import Cookies from "js-cookie";
import axios from "axios";
import { urls } from "@/utils/config";
import refreshAdminToken from "@/utils/refreshToken";
import { toast } from "react-toastify";

const data = [
  "Layout layer comment union underline clip scrolling",
  "comment union main. Main hand arrange scale",
  "vertical image figma. Clip thumbnail star hand",
  "background font font device.",
  "Arrange bold inspect move bold",
  "ectangle selection comment. Image library",
  "figjam flows frame community text scale line.",
];

const IntermediateCardModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { plans } = usePlanStore();
  console.log(plans, "plans")
  const modal = useRef<HTMLDivElement>(null);
  const authToken = Cookies.get("authToken");

  const router = useRouter();

  const toggleModal = () => setIsOpen(!isOpen);

  const handleClick = async () => {
    const userId = Cookies.get("userId");
    const plan = plans.find((itm) => itm.name.includes("INTERMEDIATE"));

    const data = {
      user: userId,
      plan: plan?.id,
    };

    try {
      const accessToken = Cookies.get("authToken");
      const response = await axios.post(urls.makeIntermediatePayment, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      router.push(response.data.authorization_url);
      toggleModal();
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

  const handleOutsideClick = (e: MouseEvent) => {
    if (isOpen && modal.current && !modal.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
    console.log(e);
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
      <button
        className="bg-main rounded-[10px] font-semibold mt-6 mb-2 h-[52px] flex items-center justify-center text-white"
        onClick={() =>
          authToken ? toggleModal() : router.push("/create-account")
        }
      >
        Select Plan
      </button>

      <div
        className={
          "fixed inset-0 bg-white bg-opacity-30  transition-all ease-in-out duration-300 flex justify-center items-center z-50 " +
          (isOpen
            ? "opacity-100 backdrop-blur-sm"
            : "opacity-0 backdrop-blur-none pointer-events-none")
        }
      >
        <div
          className={
            "shadow-[0px_0px_45px_0px_#0000004D] bg-white rounded-[20px] flex items-center gap-y-6 w-full md:max-w-[692px] flex-col py-10 " +
            (isOpen ? "translate-y-0 scale-100" : "translate-y-full scale-50")
          }
          ref={modal}
        >
          <div className="flex flex-col items-center justify-center w-full">
            <Image src={logo} alt="Pistis logo" />

            <span className="max-w-[68%] text-center w-full">
              <h1 className="text-main text-[32px] font-bold">
                Intermediate Plan
              </h1>
              {/* TODO:change font */}
              <p className="text-[#828282]">
                Before proceeding to payment you are expected to have:
              </p>
            </span>
          </div>

          <div className="w-[80%] md:w-[532px]">
            <ul className=" list-disc list-inside text-[#2E2E2E] mv-10">
              {data.map((itm) => (
                <li key={itm}>{itm}</li>
              ))}
            </ul>

            <button
              className="bg-main h-[50px] flex items-center justify-center w-full text-white rounded-lg font-medium mt-10"
              onClick={handleClick}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default IntermediateCardModal;
