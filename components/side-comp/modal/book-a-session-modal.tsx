import refreshAdminToken from "@/utils/refreshToken";
import { Check, Loader2, X } from "lucide-react";
import React, { FormEvent, useState } from "react";
import Cookies from "js-cookie";
// import axios from "axios";
import { urls } from "@/utils/config";
import { toast } from "react-toastify";
import useFetchStudentSessionStore from "@/store/fetch-student-session";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { createAxiosInstance } from "@/lib/axios";

const timeRangeData = [
  { name: "30 Min", value: 30 },
  { name: "60 Min", value: 60 },
  { name: "1 hr 30Min", value: 90 },
];

const validateDate = (value: Date | null): boolean => {
  // console.log(value);
  if (value == null) return false;
  const day = String(value.getDate()).padStart(2, "0");
  const month = String(value.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = value.getFullYear();
  const axios = createAxiosInstance();

  const date = `${day}-${month}-${year}`;
  return /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/.test(date);
};
const normalizeInput = (value: any) => value.replace(/\s+/g, " ").trim();

const validateTime = (value: string): boolean => {
  return /^(0?[1-9]|1[0-2]):([0-5][0-9])\s?(AM|PM)$/i.test(value);
};

const getISODateTime = (date: Date | null, time: string): string | null => {
  if (!date) return null;

  const [timePart, meridian] = time.split(" ");
  const [hour, minute] = timePart.split(":").map(Number);

  let hourIn24 = hour;
  if (meridian.toUpperCase() === "PM" && hour !== 12) {
    hourIn24 += 12;
  } else if (meridian.toUpperCase() === "AM" && hour === 12) {
    hourIn24 = 0;
  }

  const isoDate = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      hourIn24,
      minute
    )
  ).toISOString();

  return isoDate;
};

const isDateTimeInPast = (date: Date | null, timeStr: string): boolean => {
  if (!date) {
    return false;
  }

  const [hour, minute] = timeStr.split(":").map(Number);

  const inputDate = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      hour,
      minute
    )
  );
  const currentDate = new Date();

  return inputDate < currentDate;
};

interface BookASessionModalProp {
  isDisabled: boolean;
}

interface NotDateErrorProps {
  preferredDateStr: boolean | null;
  preferredTimeStr: boolean | null;
  altDateStr: boolean | null;
  altTimeStr: boolean | null;
  topic: boolean | null;
}

const preferredDateError =
  "Invalid preferred date format. Use DD-MM-YYYY (e.g., 01-02-2024).";
const preferredTimeError =
  "Incomplete preferred time format. Select AM/PM (e.g., 05:01 PM).";
const altTimeError =
  "Incomplete alternative time format. Select AM/PM (e.g., 05:01 PM).";

const BookASessionModal = ({ isDisabled }: BookASessionModalProp) => {
  const [duration, setDuration] = useState(15);
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [note, setNote] = useState("");
  const [preferredDateStr, setPreferredDateStr] = useState<Date | null>(null);
  const [preferredTimeStr, setPreferredTimeStr] = useState<any>({
    time: "",
    period: "",
  });
  const [altDateStr, setAltDateStr] = useState<Date | null>(null);
  // const [altTimeStr, setAltTimeStr] = useState("");
  const [altTimeStr, setAltTimeStr] = useState<any>({ time: "", period: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notDateError, setNotDateError] = useState<NotDateErrorProps>({
    preferredDateStr: null,
    preferredTimeStr: null,
    altDateStr: null,
    altTimeStr: null,
    topic: null,
  });

  const { fetchSession } = useFetchStudentSessionStore();

  const toggleModal = () => setIsOpen(!isOpen);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const preferred_date = getISODateTime(
      preferredDateStr,
      `${preferredTimeStr.time} ${preferredTimeStr.period}`
    );
    const alternative_date = getISODateTime(
      altDateStr,
      `${altTimeStr.time} ${altTimeStr.period}`
    );

    if (validateAllInputs()) {
      const data = {
        topic,
        note,
        preferred_date,
        duration,
      };
      const axios = createAxiosInstance();
      const createASession = async () => {
        try {
          setLoading(true);
          const accessToken = Cookies.get("authToken");
          await axios.post(urls.getAllSession, data, {
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
          console.log(error?.response?.data?.error?.[0]);
          if (
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
          setNote("");
          setPreferredDateStr(null);
          setPreferredTimeStr("");
          setAltDateStr(null);
          setAltTimeStr("");
          setDuration(15);

          toggleModal();
          fetchSession();
        }
      };

      createASession();
    }
  };

  const updateErrorState = (key: string, isValid: boolean) => {
    setNotDateError((prev) => ({ ...prev, [key]: isValid }));
  };

  const validateInput = (
    value: string | Date | null,
    errorMsg: string,
    key: string
  ) => {
    if (typeof value === "string") {
      if (!validateTime(value)) {
        setError(errorMsg);
        updateErrorState(key, false);
        return false;
      }
    } else if (!validateDate(value as Date | null)) {
      setError(errorMsg);
      updateErrorState(key, false);
      return false;
    }

    updateErrorState(key, true);
    return true;
  };

  const validateAllInputs = () => {
    if (
      !validateInput(preferredDateStr, preferredDateError, "preferredDateStr")
    )
      return false;
    if (
      !validateInput(
        `${preferredTimeStr.time} ${preferredTimeStr.period}`,
        preferredTimeError,
        "preferredTimeStr"
      )
    )
      return false;

    // Check for future dates
    if (
      isDateTimeInPast(
        preferredDateStr,
        `${preferredTimeStr.time} ${preferredTimeStr.period}`
      )
    ) {
      setError("Please select a future preferred date and time.");
      updateErrorState("preferredDateStr", false);
      updateErrorState("preferredTimeStr", false);
      return false;
    }

    if (!topic) {
      setError("Topic is required.");
      updateErrorState("topic", false);
      return false;
    } else {
      updateErrorState("topic", true);
    }

    setError("");
    return true;
  };

  return (
    <>
      <button
        className="z-[1] font-medium font-sfProDisplay text-main h-[46px] p-1 px-4 flex justify-center items-center bg-white self-stretch rounded-lg"
        onClick={toggleModal}
        // disabled={isDisabled}
      >
        Book a private session
      </button>

      <div
        className={
          "bg-white/10 fixed flex justify-center items-start w-full h-full inset-0 backdrop-blur-sm cursor-pointer overflow-y-auto z-[100000] " +
          (isOpen
            ? "opacity-100 animate-fade-in "
            : "opacity-0 hidden animate-fade-out")
        }
        onClick={toggleModal}
      >
        <div className="min-h-screen py-8 px-4 w-full flex items-center justify-center">
          <div
            className="md:max-w-[522px] w-fit sm:w-full p-6 bg-white rounded-lg shadow-[0px_0px_40px_0px_#00000033] h-fit mx-4 "
            onClick={(e) => e.stopPropagation()}
          >
            <span className="flex items-center justify-between">
              <p className="text-2xl text-[#2E2E2E] font-medium">
                Book a Private Session
              </p>
              <X
                color="#666666"
                size={24}
                strokeWidth={2}
                onClick={toggleModal}
                className="hover:scale-110 hover:cursor-pointer"
              />
            </span>
            <p className="h-8 md:h-6 text-red-600 text-xs md:text-sm font-medium">
              {error !== "" && error}
            </p>
            <form
              className="space-y-2 font-sfProDisplay"
              onSubmit={handleSubmit}
            >
              <div>
                <label htmlFor="topic" className="text-[#666666]">
                  Topic
                </label>
                <input
                  type="text"
                  placeholder="Enter your proposed session topic"
                  className={`p-3 border  bg-[#FAFAFA] placeholder:text-[#9F9F9F] rounded-md w-full mt-1 outline-none ${
                    notDateError.topic === false
                      ? "border-red-600"
                      : topic
                      ? "border-[#2FBC8D]"
                      : "border-[#DADADA]"
                  }`}
                  id="topic"
                  required
                  min={1}
                  maxLength={255}
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="additional_name" className="text-[#666666] ">
                  Additional Note
                </label>
                <textarea
                  placeholder="Enter your proposed session topic"
                  className={`p-3 border bg-[#FAFAFA] placeholder:text-[#9F9F9F] rounded-md w-full h-[104px] outline-none mt-1 ${
                    note ? "border-[#2FBC8D]" : "border-[#DADADA]"
                  }`}
                  id="additional_name"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              <div className="">
                <label htmlFor="preferred-date-time" className="text-[#666666]">
                  Preferred Date & Time
                </label>
                <div className="flex justify-between mt-1">
                  <div className=" w-[48%]">
                    <DatePicker
                      selected={preferredDateStr}
                      onChange={(date) => setPreferredDateStr(date)}
                      dateFormat="dd-MM-yyyy"
                      className={`p-3 border rounded-md outline-none w-full ${
                        notDateError.preferredDateStr === false
                          ? "border-red-600"
                          : notDateError.preferredDateStr == true
                          ? "border-[#2FBC8D]"
                          : "border-[#DADADA]"
                      } bg-[#FAFAFA] placeholder:text-[#9F9F9F]`}
                      id="preferred-date-time"
                      placeholderText="DD-MM-YYYY"
                      onBlur={() =>
                        validateInput(
                          preferredDateStr,
                          preferredDateError,
                          "preferredDateStr"
                        )
                      }
                      filterDate={(date) =>
                        date.getDay() !== 0 && date.getDay() !== 6
                      }
                    />
                  </div>
                  {/* <input
                    type="text"
                    className={`p-3 border rounded-md outline-none w-[48%] ${
                      notDateError.preferredTimeStr === false
                        ? "border-red-600"
                        : notDateError.preferredTimeStr === true
                        ? "border-[#2FBC8D]"
                        : "border-[#DADADA]"
                    } bg-[#FAFAFA] placeholder:text-[#9F9F9F]`}
                    id="preferred-time-input"
                    required
                    value={preferredTimeStr}
                    onChange={(e) =>
                      setPreferredTimeStr(normalizeInput(e.target.value))
                    }
                    placeholder="09:00 AM"
                    onBlur={() =>
                      validateInput(
                        preferredTimeStr,
                        preferredTimeError,
                        "preferredTimeStr"
                      )
                    }
                    pattern="^(0?[1-9]|1[0-2]):([0-5][0-9])( ?)(AM|PM|am|pm)$"
                  /> */}

                  <div className="flex items-center gap-2 w-full ml-2">
                    <input
                      type="text"
                      className={`p-3 border rounded-md outline-none w-[60%] ${
                        notDateError.preferredTimeStr === false
                          ? "border-red-600"
                          : notDateError.preferredTimeStr === true
                          ? "border-[#2FBC8D]"
                          : "border-[#DADADA]"
                      } bg-[#FAFAFA] placeholder:text-[#9F9F9F]`}
                      id="preferred-time-input"
                      required
                      value={preferredTimeStr.time}
                      onChange={(e) =>
                        setPreferredTimeStr({
                          ...preferredTimeStr,
                          time: e.target.value,
                        })
                      }
                      placeholder="09:00"
                      onBlur={() =>
                        validateInput(
                          `${preferredTimeStr.time} ${preferredTimeStr.period}`,
                          preferredTimeError,
                          "preferredTimeStr"
                        )
                      }
                      pattern="^(0?[1-9]|1[0-2]):([0-5][0-9])$"
                    />

                    <select
                      className={`p-3 border rounded-md outline-none w-[35%] ${
                        notDateError.preferredTimeStr === false
                          ? "border-red-600"
                          : notDateError.preferredTimeStr === true
                          ? "border-[#2FBC8D]"
                          : "border-[#DADADA]"
                      } bg-[#FAFAFA] text-[#9F9F9F]`}
                      value={preferredTimeStr.period}
                      onChange={(e) =>
                        setPreferredTimeStr({
                          ...preferredTimeStr,
                          period: e.target.value,
                        })
                      }
                      onBlur={() =>
                        validateInput(
                          `${preferredTimeStr.time} ${preferredTimeStr.period}`,
                          preferredTimeError,
                          "preferredTimeStr"
                        )
                      }
                      required
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="date&time" className="text-[#666666] ">
                  Session Duration
                </label>
                <div className="flex gap-x-4 mt-2">
                  {timeRangeData.map((itm) => (
                    <button
                      className={
                        "group rounded-[6px] flex gap-x-2 items-center py-1 px-2 border outline-none w-full self-stretch transition-all duration-300 ease-in-out " +
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
                  className="text-xs text-[#666666]  cursor-pointer"
                >
                  I understand that my session request will be confirmed based
                  on mentor availability.
                </label>
              </div>
              <button
                className="bg-[#2FBC8D] disabled:bg-opacity-80 hover:bg-opacity-90 h-[50px] rounded-[8px] flex items-center justify-center text-[#F8F9FF] w-full font-medium !mt-6"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin text-white" />
                ) : (
                  "Request Private Session"
                )}
              </button>
            </form>
            <p className="text-xs text-center text-[#666666] mt-6 font-sfProDisplay">
              You’ll soon receive an email from your mentor with the confirmed
              date and time for your private session. Stay tuned to ensure you
              don't miss any important details!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookASessionModal;
