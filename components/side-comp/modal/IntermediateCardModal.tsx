// import { usePlanStore } from "@/store/plan-store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import logo from "@/src/assets/pistis_logo.png";
import Cookies from "js-cookie";
// import axios from "axios";
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
  //   const { plans } = usePlanStore();
  const modal = useRef<HTMLDivElement>(null);
  const authToken = Cookies.get("authToken");

  const router = useRouter();

  const toggleModal = () => setIsOpen(!isOpen);

  //   const handleClick = async () => {
  //     const userId = Cookies.get("userId");
  //     const plan = plans.find((itm) => itm.name.includes("Intermidiate"));

  //     const data = {
  //       user: userId,
  //       plan: plan?.id,
  //       amount_to_pay: "400000",
  //       payment_type: "one_time",
  //     };

  //     try {
  //       const accessToken = Cookies.get("authToken");
  //       const response = await axios.post(urls.makeIntermediatePayment, data, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       });
  //       router.push(response.data.authorization_url);
  //       toggleModal();
  //     } catch (error: any) {
  //       if (error.response && error.response.status === 401) {
  //         await refreshAdminToken();
  //         await handleClick();
  //       } else if (error?.message === "Network Error") {
  //         toast.error("Check your network!", {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: false,
  //           draggable: false,
  //           theme: "dark",
  //         });
  //       } else {
  //         toast.error(error?.response?.data?.detail, {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: false,
  //           draggable: false,
  //           theme: "dark",
  //         });
  //       }
  //     }
  //   };

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
        // disabled
        className="bg-main cursor-pointer rounded-[10px] font-semibold mt-6 mb-2 h-[52px] flex items-center justify-center text-white"
        // onClick={() => (authToken ? toggleModal() : router.push("/pricing"))}
        onClick={() => router.push("/create-account")}
      >
        Register Now
      </button>
    </>
  );
};

export default IntermediateCardModal;
