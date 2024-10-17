import refreshAdminToken from "@/utils/refreshToken";
import { Check, Loader2, X } from "lucide-react";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { urls } from "@/utils/config";
import { toast } from "react-toastify";

const timeRangeData = [
  { name: "15 Min", value: 15 },
  { name: "30 Min", value: 30 },
  { name: "1 hr", value: 60 },
];

interface handleChangeProps {
  e: React.ChangeEvent<HTMLInputElement>;
  setValue: Dispatch<SetStateAction<string>>;
}

const handleDateChange = ({ e, setValue }: handleChangeProps) => {
  let value = e.target.value;

  // Remove non-digit characters
  value = value.replace(/\D/g, "");

  if (value.length > 5) {
    value = `${value.slice(0, 2)}-${value.slice(2, 4)}-${value.slice(4, 8)}`;
  } else if (value.length > 4) {
    value = `${value.slice(0, 2)}-${value.slice(2)}`;
  } else if (value.length > 2) {
    value = `${value.slice(0, 2)}-${
      Number(value[2]) > 1 ? "0" + value.slice(2) + "-" : value.slice(2)
    }`;
  } else if (value.length == 1 && Number(value) > 3) {
    value = `0${value}-`;
  }

  // Update state and parent component
  setValue(value);
};

const handleTimeChange = ({ e, setValue }: handleChangeProps) => {
  let value = e.target.value;

  // Remove non-digit and non-colon characters, but allow spaces for AM/PM
  value = value.replace(/[^0-9: amp]/gi, "");

  // Handle input for hour
  if (value.length === 1 && Number(value) > 1) {
    value = `0${value}:`;
  } else if (value.length === 2 && Number(value) > 12) {
    value = `12:${value}`;
  } else if (value.length > 2 && value[2] !== ":") {
    value = `${value.slice(0, 2)}:${value.slice(2)}`;
  }

  // Handle minutes
  if (value.length > 5) {
    const minutesPart = value.slice(3, 5);
    if (minutesPart.length === 2 && Number(minutesPart) > 59) {
      value = `${value.slice(0, 3)}59`;
    } else if (minutesPart.length < 2) {
      value = `${value.slice(0, 3)}0${minutesPart}`;
    }
  }

  // Trim AM/PM if present
  if (value.length > 8) {
    value = value.trim().slice(0, 8);
  }

  setValue(value);
};

const validateDate = (value: string): boolean => {
  return /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/.test(value);
};

const validateTime = (value: string): boolean => {
  return /^(0?[1-9]|1[0-2]):([0-5][0-9]) ([Aa][Mm]|[Pp][Mm])$/.test(value);
};

const getISODateTime = (date: string, time: string): string => {
  const [day, month, year] = date.split("-").map(Number);
  const [hourMinute, period] = time.split(" ");
  const [hour, minute] = hourMinute.split(":").map(Number);

  // Convert to 24-hour format if necessary
  const adjustedHour =
    period.toUpperCase() === "PM" && hour !== 12
      ? hour + 12
      : hour === 12 && period.toUpperCase() === "AM"
      ? 0
      : hour;

  const isoDate = new Date(
    Date.UTC(year, month - 1, day, adjustedHour, minute)
  ).toISOString();
  return isoDate;
};

const BookASessionModal = ({ isDisabled }: { isDisabled: boolean }) => {
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

  const toggleModal = () => setIsOpen(!isOpen);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const preferred_date = getISODateTime(preferredDateStr, preferredTimeStr);
    const alternative_date = getISODateTime(altDateStr, altTimeStr);

    if (validateAllInputs()) {
      const data = {
        topic,
        note,
        preferred_date,
        alternative_date,
        duration,
      };

      const createASession = async () => {
        try {
          setLoading(true);
          const accessToken = Cookies.get("authToken");
          await axios.post(urls.bookings, data, {
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
            await createASession();
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
          setNote("");
          setPreferredDateStr("");
          setPreferredTimeStr("");
          setAltDateStr("");
          setAltTimeStr("");
          setDuration(15);

          toggleModal();
        }
      };

      createASession();
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
    if (!validateDate(altDateStr)) {
      setError(
        "Invalid alternative date format. Use DD-MM-YYYY. e.g 01-12-2024"
      );
      return false;
    }
    if (!validateTime(altTimeStr)) {
      setError(
        "Invalid alternative time format. Use HH:MM AM/PM, e.g 09:01 AM"
      );
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
          setError("Invalid preferred time format. Use HH:MM AM/PM.");
        } else {
          setError("");
        }
        break;
      case "altDate":
        if (!validateDate(altDateStr)) {
          setError("Invalid alternative date format. Use DD-MM-YYYY.");
        } else {
          setError("");
        }
        break;
      case "altTime":
        if (!validateTime(altTimeStr)) {
          setError("Invalid alternative time format. Use HH:MM AM/PM.");
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
        className="z-[1] font-medium font-sfProDisplay text-main h-[46px] p-1 px-4 flex justify-center items-center bg-white self-stretch rounded-lg"
        onClick={toggleModal}
        disabled={isDisabled}
      >
        Book a private session
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
          className="max-w-[522px] w-full p-6 bg-white rounded-lg shadow-[0px_0px_40px_0px_#00000033] h-fit mx-4 "
          onClick={(e) => e.stopPropagation()}
        >
          <span className="flex items-center justify-between">
            <p className="text-2xl text-[#2E2E2E] font-medium">
              Book a Private Session
            </p>
            <X
              color="#666666"
              size={14}
              strokeWidth={3}
              onClick={toggleModal}
              className="hover:scale-105 hover:cursor-pointer"
            />
          </span>
          <p className="h-6 text-red-600 text-xs font-semibold">
            {error && <strong className="text-sm">!</strong> && " " && error}
          </p>
          <form className="space-y-2 font-sfProDisplay" onSubmit={handleSubmit}>
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
              <label htmlFor="additional_name" className="text-[#666666] ">
                Additional Note
              </label>
              <textarea
                placeholder="Enter your proposed session topic"
                className="p-3 border border-[#DADADA] bg-[#FAFAFA] placeholder:text-[#9F9F9F] rounded-md w-full h-[104px] outline-none mt-1"
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
                <input
                  type="text"
                  className="p-3 border border-[#DADADA] bg-[#FAFAFA] placeholder:text-[#9F9F9F] rounded-md outline-none w-[48%]"
                  id="preferred-date-time"
                  placeholder="DD-MM-YYY"
                  required
                  value={preferredDateStr}
                  onChange={(e) =>
                    handleDateChange({ e, setValue: setPreferredDateStr })
                  }
                  pattern="^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$"
                  onBlur={() => handleBlur("preferredDate")}
                />
                <input
                  type="text"
                  className="p-3 border border-[#DADADA] bg-[#FAFAFA] placeholder:text-[#9F9F9F] rounded-md outline-none  w-[48%]"
                  id="preferred-time-input"
                  required
                  value={preferredTimeStr}
                  onChange={(e) =>
                    handleTimeChange({ e, setValue: setPreferredTimeStr })
                  }
                  placeholder="09:00 AM"
                  onBlur={() => handleBlur("preferredTime")}
                  pattern="^(0?[1-9]|1[0-2]):([0-5][0-9]) ([Aa][Mm]|[Pp][Mm])$"
                />
              </div>
            </div>
            <div>
              <label htmlFor="alt-date-time" className="text-[#666666]">
                Alternative Date & Time
              </label>
              <div className="flex justify-between mt-1">
                <input
                  type="text"
                  className="p-3 border border-[#DADADA] bg-[#FAFAFA] placeholder:text-[#9F9F9F] rounded-md outline-none w-[48%]"
                  id="alt-date-time"
                  placeholder="DD-MM-YYY"
                  value={altDateStr}
                  onChange={(e) =>
                    handleDateChange({ e, setValue: setAltDateStr })
                  }
                  pattern="^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$"
                  onBlur={() => handleBlur("altDate")}
                />
                <input
                  type="text"
                  className="p-3 border border-[#DADADA] bg-[#FAFAFA] placeholder:text-[#9F9F9F] rounded-md outline-none  w-[48%] "
                  id="alt-time-input"
                  onChange={(e) =>
                    handleTimeChange({ e, setValue: setAltTimeStr })
                  }
                  value={altTimeStr}
                  placeholder="09:00 AM"
                  onBlur={() => handleBlur("altTime")}
                  pattern="^(0?[1-9]|1[0-2]):([0-5][0-9]) ([Aa][Mm]|[Pp][Mm])$"
                />
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
    </>
  );
};

export default BookASessionModal;
