import refreshAdminToken from "@/utils/refreshToken";
import { Check, Loader2, X } from "lucide-react";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { urls } from "@/utils/config";
import { toast } from "react-toastify";
import useFetchStudentSessionStore from "@/store/fetch-student-session";
import CountDownText from "../CountDownText";

const timeRangeData = [
  { name: "15 Min", value: 15 },
  { name: "30 Min", value: 30 },
  { name: "1 hr", value: 60 },
];

const validateDate = (value: string): boolean => {
  return /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/.test(value);
};

const validateTime = (value: string): boolean => {
  return /^(0?[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/.test(value);
};

const getISODateTime = (date: string, time: string): string => {
  const [day, month, year] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);

  // Create a Date object in UTC
  const isoDate = new Date(
    Date.UTC(year, month - 1, day, hour, minute)
  ).toISOString();
  return isoDate;
};

interface RescheduleASessionModalProps {
  onClick: () => void;
}

const RescheduleASessionModal = ({ onClick }: RescheduleASessionModalProps) => {
  const [duration, setDuration] = useState(15);
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [note, setNote] = useState("");
  const [preferredDateStr, setPreferredDateStr] = useState("");
  const [preferredTimeStr, setPreferredTimeStr] = useState("");
  const [altDateStr, setAltDateStr] = useState("");
  const [altTimeStr, setAltTimeStr] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { fetchSession } = useFetchStudentSessionStore();

  const toggleModal = () => {
    setIsOpen((isOpen) => !isOpen);
    onClick();
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const preferred_date = getISODateTime(preferredDateStr, preferredTimeStr);
    const alternative_date = getISODateTime(altDateStr, altTimeStr);

    if (validateAllInputs()) {
      const data = {
        topic,

        new_preferred_date: preferred_date,
        duration,
      };

      const rescheduleSession = async () => {
        try {
          setLoading(true);
          const accessToken = Cookies.get("authToken");
          await axios.post(urls.rescheduleSession, data, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          toast.success("Your session has been successfully scheduled!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
        } catch (error: any) {
          console.log(error.response.data.error[0]);
          if (error.response && error.response.status === 401) {
            await refreshAdminToken();
            await rescheduleSession();
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
          } else if (
            error.response.data.error[0] ===
            "You have exhausted your booking limit"
          ) {
            toast.error("You have exhausted your booking limit!", {
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
          setLoading(false);
          setTopic("");
          setPreferredDateStr("");
          setPreferredTimeStr("");
          setDuration(15);

          toggleModal();
          fetchSession();
        }
      };

      rescheduleSession();
    }
  };

  const validateAllInputs = (): boolean => {
    if (!validateDate(preferredDateStr)) {
      setError("Invalid preferred date format. Use DD-MM-YYYY. e.g 01-12-2024");
      return false;
    }
    if (!validateTime(preferredTimeStr)) {
      setError("Invalid preferred time format. Use HH:MM AM/PM, e.g 09:01 AM");
      return false;
    }

    setError(""); // Clear error if all inputs are valid
    return true;
  };

  const handleBlur = (field: string) => {
    switch (field) {
      case "preferredDate":
        if (!validateDate(preferredDateStr)) {
          setError("Invalid preferred date format. Use DD-MM-YYYY.");
        } else {
          setError("");
        }
        break;
      case "preferredTime":
        if (!validateTime(preferredTimeStr)) {
          setError("Invalid preferred time format. Use HH:MM.");
        } else {
          setError("");
        }
        break;

      default:
        break;
    }
  };

  return (
    <>
      <button
        className="border border-[#9F9F9F] h-[50px] flex justify-center items-center rounded-[8px] w-full   text-xs lg:text-base"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        Reschedule Session
      </button>

      <div
        className={
          "bg-white/10 fixed flex justify-center items-center w-full min-h-screen inset-0 z-20 backdrop-blur-sm cursor-pointer " +
          (isOpen
            ? "opacity-100 animate-fade-in "
            : "opacity-0 hidden animate-fade-out")
        }
        onClick={toggleModal}
      >
        <div
          className="max-w-[522px] w-full p-6 bg-white rounded-[10px] shadow-[0px_0px_40px_0px_#00000033] h-fit mx-4 "
          onClick={(e) => e.stopPropagation()}
        >
          <span className="flex items-center justify-between">
            <p className="text-2xl text-[#2E2E2E] font-medium">
              Reschedule Session
            </p>
            <X
              color="#666666"
              size={24}
              strokeWidth={2}
              onClick={toggleModal}
              className="hover:scale-105 hover:cursor-pointer"
            />
          </span>
          <p className="h-6 text-red-600 text-xs font-semibold">
            {error && <strong className="text-sm">!</strong> && " " && error}
          </p>
          <form className="space-y-2 font-sfProDisplay" onSubmit={handleSubmit}>
            <CountDownText />
            <div>
              <label htmlFor="topic" className="text-[#666666]">
                Topic
              </label>
              <input
                type="text"
                placeholder="Enter your proposed session topic"
                className="p-3 border border-[#DADADA] bg-[#FAFAFA] placeholder:text-[#9F9F9F] rounded-md w-full mt-1"
                id="topic"
                required
                min={1}
                maxLength={10}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="preferred-date-time" className="text-[#666666]">
                Preferred Date & Time
              </label>
              <div className="flex justify-between mt-1">
                <input
                  type="text"
                  className="p-3 border border-[#DADADA] bg-[#FAFAFA] placeholder:text-[#9F9F9F] rounded-md outline-none w-[48%]"
                  id="preferred-date-time"
                  placeholder="DD-MM-YYY"
                  required
                  value={preferredDateStr}
                  onChange={(e) => setPreferredDateStr(e.target.value)}
                  pattern="^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$"
                  onBlur={() => handleBlur("preferredDate")}
                />
                <input
                  type="text"
                  className="p-3 border border-[#DADADA] bg-[#FAFAFA] placeholder:text-[#9F9F9F] rounded-md outline-none  w-[48%]"
                  id="preferred-time-input"
                  required
                  value={preferredTimeStr}
                  onChange={(e) => setPreferredTimeStr(e.target.value)}
                  placeholder="09:00 AM"
                  onBlur={() => handleBlur("preferredTime")}
                  pattern="^(0?[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$"
                />
              </div>
            </div>

            <div>
              <label htmlFor="date&time" className="text-[#666666] ">
                Reset Session Duration
              </label>
              <div className="flex gap-x-4 mt-2">
                {timeRangeData.map((itm) => (
                  <button
                    className={
                      "group rounded-[6px] flex gap-x-2 items-center py-1 px-2 border outline-none w-[96.92px] self-stretch transition-all duration-300 ease-in-out " +
                      (duration == itm.value
                        ? "border-[#2FBC8D] text-[#2FBC8D]"
                        : "border-[#9F9F9F] text-[#9F9F9F]")
                    }
                    type="button"
                    key={itm.name}
                    onClick={() => setDuration(itm.value)}
                  >
                    <button
                      className={
                        "w-4 h-4 border rounded-full flex items-center justify-center   " +
                        (duration == itm.value
                          ? "border-[#2FBC8D] bg-[#2FBC8D]"
                          : "border-[#9F9F9F]")
                      }
                      type="button"
                    >
                      <div
                        className={
                          "w-2 h-2 rounded-full bg-secondary transition-all duration-300 " +
                          (duration == itm.value
                            ? "opacity-100  "
                            : "opacity-0 ")
                        }
                      />
                    </button>
                    <p>{itm.name}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-x-2 items-center">
              <input
                type="checkbox"
                id="confirm-request"
                className="relative w-[16px] h-[16px] bg-white border-[1.23px] border-[#D0D5DD] rounded-[3px] appearance-none peer shrink-0 focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-blue-100 checked:bg-[#2FBC8D] checked:border-0 disabled:border-steel-400 disabled:bg-steel-400 hover:cursor-pointer"
                required
              />
              <Check
                size={7}
                className="absolute hidden w-[9px] h-[9px] mt-[1.3px] ml-[3.5px] outline-none pointer-events-none peer-checked:block stroke-white "
                strokeWidth={4}
              />
              <label
                htmlFor="confirm-request"
                className="text-xs text-[#666666] "
              >
                I understand that my session request will be confirmed based on
                mentor availability.
              </label>
            </div>
            <button
              className="bg-[#2FBC8D] disabled:bg-opacity-80 hover:bg-opacity-90 h-[50px] rounded-[8px] flex items-center justify-center text-[#C4C4C4] w-full font-medium !mt-6"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin text-white" />
              ) : (
                "Reschedule Session"
              )}
            </button>
          </form>
          <p className="text-xs text-center text-[#666666] mt-6 font-sfProDisplay">
            You’ll soon receive an email from your mentor with the confirmed
            date and time for your r|escheduled session. Stay tuned to ensure
            you don't miss any important details!
          </p>
        </div>
      </div>
    </>
  );
};

export default RescheduleASessionModal;
