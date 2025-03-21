"use client";
import logo from "@/src/assets/pistis_logo.png";
import { usePlanStore } from "@/store/plan-store";
import { urls } from "@/utils/config";
import axios from "axios";
import { Info, Loader, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next-nprogress-bar";
import { FormEvent, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const details = Object.fromEntries(formData);

    const plan = plans.find((itm) => itm.name.includes("BEGINNER"));
    const body = {
      user: { ...details, phone_number: `+234${details.phone_number}` },
      plan: plan?.id,
    };

    try {
      const response = await axios.post(urls.makeBeginnerPayment, body);
      console.log(response, "begginr")
      if (response.status === 200) {
        window.open(response.data.payments[0].authorization_url, "_blank");
       
        toast.success("Complete payment in the next tab!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
        setLoading(false);
        toggleModal();
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
        setLoading(false);
      }
    } catch (error) {
      toast.error(`Payment Failed; ${error}!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
      });
      setLoading(false);
    }
  };

  const [waitListStatus, setWaitListStatus] = useState("");
  const [waitListRegSta, setWaitListRegSta] = useState("");
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");
  const checkStatus = async () => {
    try {
      setChecking(true);
      const response = await axios.get(`${urls.cohorts}latest_status`);
      if (response.status === 200) {
        setWaitListStatus(response?.data?.status);
        setWaitListRegSta(response?.data?.registration_status);
        setChecking(false);
        // setIsOpen(false);
      }
    } catch (error: any) {
      if (error?.message === "Network Error") {
        toast.error("Check your network!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
        setError(error?.message);
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
        setError(error?.response?.data?.detail);
      }
    } finally {
      setChecking(false);
    }
  };

  const [joining, setJoining] = useState(false);
  const [email, setEmail] = useState("");
  const joinWaitlist = async () => {
    try {
      setJoining(true);
      const response = await axios.post(`${urls.waitlist}`, {
        email: email,
      });
      if (response.status === 201) {
        // setIsOpen(false);
        setJoining(false);
        toast.success("Added to waitlist", {
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
      // console.log(error)
      if (error?.message === "Network Error") {
        toast.error("Check your network!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
        setError(error?.message);
      } else {
        toast.error(error?.response?.data?.email[0], {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
        setError(error?.response?.data?.detail);
      }
      setJoining(false);
    } finally {
      setJoining(false);
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (isOpen && modal.current && !modal.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    checkStatus();
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  if (checking)
    return (
      <div className="flex flex-col justify-center items-center ">
        <Loader className="text-main text-xs animate-spin mb-2" />
      </div>
    );

  return (
    <>
      <ToastContainer />
      <button
        className="bg-main rounded-[10px] font-semibold mt-6 mb-2 h-[52px] flex items-center justify-center text-white"
        onClick={() => setIsOpen(true)}
      >
        Select Plan
      </button>

      <div>
        {waitListStatus !== "open" && waitListRegSta !== "active" ? (
         <div
            className={
              "fixed inset-0 bg-white bg-opacity-30 transition-all ease-in-out duration-300 flex justify-center items-center z-[9999] " +
              (isOpen
                ? "opacity-100 backdrop-blur-sm"
                : "opacity-0 pointer-events-none backdrop-blur-none")
            }
          >
            <div
              className={
                "shadow-[0px_0px_45px_0px_#0000004D] bg-white rounded-[20px] flex h-[85vh] overflow-y-scroll items-center gap-y-6 w-full md:max-w-[692px] flex-col py-2 " +
                (isOpen
                  ? "translate-y-0 scale-100"
                  : "translate-y-full scale-50")
              }
              ref={modal}
            >
               <ToastContainer />
              <div className="flex flex-col items-center justify-center w-full">
                <Image src={logo} alt="Pistis logo" />

                <span className="max-w-[68%] text-center w-full">
                  <h1 className="text-main text-[32px] font-bold">
                    Join the next wave
                  </h1>
                  {/* <div className="border border-main rounded-[8px] text-center my-2 bg-white px-4 py-2">
                    <p className="text-base font-medium text-[#575757] ">
                      Batch B Starting Date:{" "}
                      <span className="text-[#FF1456]">
                        1st Fedurary, 2025.
                      </span>
                    </p>
                  </div> */}

                  <p className="text-[#828282]">
                    Become a participant in our upcoming devops bootcamp.
                  </p>
                </span>
              </div>
              

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
                      <span className="border-r mr-2 border-[#2E2E2E]">
                        +234
                      </span>
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
                      <Info
                        className="text-[#9F9F9F] rotate-180"
                        size={11.67}
                      />

                      <span>This number should be active on WhatsApp</span>
                    </span>
                  </div>

                  <button
                    disabled={loading}
                    className="bg-main h-[50px] flex items-center justify-center w-full text-white rounded-lg font-medium mt-10"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="animate-spin" />
                      </div>
                    ) : (
                      "Submit Details"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div
          className={
            "fixed inset-0 bg-white bg-opacity-30 transition-all ease-in-out duration-300 flex justify-center items-center z-[9999] " +
            (isOpen
              ? "opacity-100 backdrop-blur-sm"
              : "opacity-0 pointer-events-none backdrop-blur-none")
          }
        >
          <div
            className={
              "shadow-[0px_0px_45px_0px_#0000004D] bg-white rounded-[20px] flex h-[85vh] overflow-y-scroll items-center gap-y-6 w-full md:max-w-[692px] flex-col py-2 " +
              (isOpen
                ? "translate-y-0 scale-100"
                : "translate-y-full scale-50")
            }
            ref={modal}
          >
            <ToastContainer />
            
            <div className="flex flex-col items-center justify-center w-full">
              <Image src={logo} alt="Pistis logo" />

              <span className="max-w-[68%] text-center w-full">
                <h1 className="text-main text-[32px] font-bold">
                  Join waiting list
                </h1>

                <p className="text-[#828282]">
                  Watchout Dolor suspendisse accumsan quisque purus malesuada.
                  Pellentesque tincidunt tellus quisque amet odio vel nulla.
                  Pellentesque maifg.
                </p>
              </span>
            </div>
           

            <div className="w-[80%]">
              <label
                htmlFor="Email Address"
                className="capitalize text-[#2E2E2E] mb-2"
              >
                Email Address
              </label>
              <input
                type={"email"}
                className="outline-none border w-full border-[#DADADA] bg-[#FAFAFA] placeholder:text-[#9F9F9F] py-3 px-[14px] rounded-md"
                placeholder={`Enter your email address `}
                id="Name"
                required
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
            </div>

            <button
              disabled={joining}
              onClick={() => joinWaitlist()}
              className="bg-main h-[50px] disabled:bg-main/20 flex items-center justify-center w-[80%] text-white rounded-lg font-medium mt-10"
            >
              {joining ? "Joining..." : " Join Our Waiting List"}
            </button>
          </div>
        </div>
        )}
      </div>
    </>
  );
};

export default BeginnerCardModal;
