"use client";
import logo from "@/public/assets/pistis_logo.png";
import { usePlanStore } from "@/store/plan-store";
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
  const { plans } = usePlanStore();
  const router = useRouter();
  const modal = useRef<HTMLDivElement>(null);
  const toggleModal = () => setIsOpen(!isOpen);
  const authToken = Cookies.get("authToken");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const details = Object.fromEntries(formData);

    const plan = plans.find((itm) => itm.name.includes("Beginner"));
    const body = {
      user: { ...details, phone_number: `+234${details.phone_number}` },
      plan: plan?.id,
      amount_to_pay: "100000",
    };
    console.log(body);

    try {
      const response = await axios.post(urls.makeBeginnerPayment, body);
      router.push(response.data.authorization_url);
      toggleModal();
    } catch (error) {
      console.log(error);
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
          authToken ? setIsOpen(true) : router.push("/create-account")
        }
      >
        Join our upcoming bootcamp
      </button>
      <div
        className={
          "fixed inset-0 bg-white bg-opacity-30 transition-all ease-in-out duration-300 flex justify-center items-center z-50 " +
          (isOpen
            ? "opacity-100 backdrop-blur-sm"
            : "opacity-0 pointer-events-none backdrop-blur-none")
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
                Join the next wave
              </h1>
              {/* TODO:change font */}
              <p className="text-[#828282]">
                Become a participant in our upcoming devops bootcamp.
              </p>
            </span>
          </div>

          {/* TODO:change font */}
          <form className="w-[80%]  md:w-[532px]" onSubmit={handleSubmit}>
            <div className="">
              {inputs.map((itm) => (
                <div key={itm.label} className="mb-2">
                  <label
                    htmlFor={itm.label}
                    className="capitalize text-[#2E2E2E] mb-2"
                  >
                    {itm.label}
                  </label>
                  <input
                    type={itm.label === "Email Address" ? "email" : "text"}
                    className="outline-none border border-[#DADADA] bg-[#FAFAFA] placeholder:text-[#9F9F9F] py-3 px-[14px] w-full rounded-md"
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
                  className="capitalize text-[#2E2E2E] mb-2"
                >
                  Phone Number
                </label>
                <div className="border border-[#DADADA] bg-[#FAFAFA] flex items-center rounded-md py-3 px-[14px]">
                  <span className="border-r border-[#2E2E2E]">+234</span>
                  <input
                    type="number"
                    className="outline-none  placeholder:text-[#9F9F9F]  w-full "
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

              <button className="bg-main h-[50px] flex items-center justify-center w-full text-white rounded-lg font-medium mt-10">
                Submit Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BeginnerCardModal;
