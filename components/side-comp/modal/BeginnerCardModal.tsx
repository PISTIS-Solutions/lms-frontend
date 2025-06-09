"use client";
import logo from "@/src/assets/pistis_logo.png";
// import { usePlanStore } from "@/store/plan-store";
import { urls } from "@/utils/config";
import axios from "axios";
import { Info } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";

const inputs = [
  {
    name: "first_name",
    label: "First Name",
  },
  {
    name: "last_name",
    label: "Last Name",
  },
  {
    name: "email",
    label: "Email Address",
  },
];

const BeginnerCardModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  //   const { plans } = usePlanStore();
  const router = useRouter();
  const modal = useRef<HTMLDivElement>(null);
  const toggleModal = () => setIsOpen(!isOpen);
  const authToken = Cookies.get("authToken");

  //   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     const formData = new FormData(e.currentTarget);
  //     const details = Object.fromEntries(formData);

  //     const plan = plans.find((itm) => itm.name.includes("Beginner"));
  //     const body = {
  //       user: { ...details, phone_number: `+234${details.phone_number}` },
  //       plan: plan?.id,
  //       amount_to_pay: "100000",
  //     };
  //     console.log(body);

  //     try {
  //       const response = await axios.post(urls.makeBeginnerPayment, body);
  //       router.push(response.data.authorization_url);
  //       toggleModal();
  //     } catch (error) {
  //       console.log(error);
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
        className="bg-main  disabled:cursor-not-allowed rounded-[10px] font-semibold mt-6 mb-2 h-[52px] flex items-center justify-center text-white"
        onClick={() => router.push("/create-account")}
      >
        {/* Join our upcoming bootcamp */}
        Register Now
      </button>
    </>
  );
};

export default BeginnerCardModal;
