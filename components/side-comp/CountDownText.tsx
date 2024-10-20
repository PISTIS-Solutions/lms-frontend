import { Calendar, Users } from "lucide-react";
import Image from "next/image";
import teamSlice from "@/public/assets/svg/teamSlice.svg";
import { useEffect, useState } from "react";
import useFetchStudentSessionStore from "@/store/fetch-student-session";
import time from "@/public/assets/svg/time.svg";
import topicGray from "@/public/assets/svg/topic-gray.svg";
import timeGray from "@/public/assets/svg/time-gray.svg";

interface TimeRemaining {
  days: null | number;
  hours: null | number;
  minutes: null | number;
}

function formatDateTime(dateString: string) {
  const date = new Date(dateString);

  // Format time (12-hour format with am/pm)
  const timeString = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // Format date (with ordinal suffix)
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  // Add ordinal suffix (st, nd, rd, th)
  const ordinal = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return {
    time: timeString,
    date: `${day}${ordinal(day)} ${month} ${year}`,
  };
}

const CountDownText = ({ isSmall = false }) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: null,
    hours: null,
    minutes: null,
  });
  const { data } = useFetchStudentSessionStore();

  useEffect(() => {
    if (data && data.preferred_date) {
      const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const timeDifference = new Date(data.preferred_date).getTime() - now;

        if (timeDifference < 0) {
          clearInterval(countdownInterval);
          setTimeRemaining({
            days: null,
            hours: null,
            minutes: null,
          });
        } else {
          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
          );
          //   const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

          setTimeRemaining({ days, hours, minutes });
        }
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [data?.preferred_date]);

  const date = data && formatDateTime(data?.preferred_date);

  return (
    <>
      <div className="space-y-[6px] font-sfProDisplay text-sm mb-6">
        <div
          className={
            "flex items-center gap-2  " +
            (isSmall ? "text-white" : "text-[#666666]")
          }
        >
          <Users size={18} />
          <span
            className={`text-ellipsis overflow-hidden w-[inherit] whitespace-nowrap ${
              isSmall ? "text-sm" : "text-base"
            }`}
          >
            Adanna Oluwasun Adewale
          </span>
        </div>
        <div
          className={
            "flex items-center gap-2  " +
            (isSmall ? "text-white" : "text-[#666666]")
          }
        >
          <Image src={isSmall ? teamSlice : topicGray} alt="team slice" />

          <span
            className={`text-ellipsis overflow-hidden w-[inherit] whitespace-nowrap ${
              isSmall ? "text-sm" : "text-base"
            }`}
          >
            {data?.topic}
          </span>
        </div>
        <div
          className={
            "flex items-center gap-2  " +
            (isSmall ? "text-white" : "text-[#666666]")
          }
        >
          <Calendar size={18} />

          <span className={isSmall ? "text-sm" : "text-base"}>
            {date?.date} • {date?.time}
          </span>
        </div>
        <div
          className={
            "flex items-center gap-2  " +
            (isSmall ? "text-white" : "text-[#666666]")
          }
        >
          <Image src={isSmall ? time : timeGray} alt="duration" />
          <span className={isSmall ? "text-sm" : "text-base"}>
            {data?.duration} Min
          </span>
        </div>
      </div>

      <div
        className={
          "flex items-center  " +
          (isSmall ? "justify-between" : "mb-6 justify-center gap-2")
        }
      >
        {/* Days */}
        <div className="text-center">
          <div
            className={
              " font-digital tracking-wider font-digitalNumbers   " +
              (isSmall ? "text-3xl text-white" : "text-5xl text-[#484848]")
            }
          >
            {timeRemaining.days}
          </div>
          <div
            className={
              "text-sm font-sfProDisplay " +
              (isSmall ? "mt-1 text-white" : "mt-2 text-gray-600")
            }
          >
            Days
          </div>
        </div>

        {/* Separator */}
        <div
          className={
            "  relative  text-4xl " +
            (isSmall
              ? "top-[-0.675rem] text-white"
              : " top-[-0.275rem] text-[#484848]")
          }
        >
          :
        </div>

        {/* Hours */}
        <div className="text-center">
          <div
            className={
              "tracking-wider font-digitalNumbers  " +
              (isSmall ? "text-3xl text-white" : "text-5xl text-[#484848]")
            }
          >
            {timeRemaining.hours}
          </div>
          <div
            className={
              "text-sm font-sfProDisplay " +
              (isSmall ? "mt-1 text-white" : "mt-2 text-gray-600")
            }
          >
            Hours
          </div>
        </div>

        {/* Separator */}
        <div
          className={
            "text-4xl relative " +
            (isSmall
              ? "top-[-0.675rem] text-white"
              : " top-[-0.275rem] text-[#484848]")
          }
        >
          :
        </div>

        {/* Minutes */}
        <div className="text-center">
          <div
            className={
              "tracking-wider font-digitalNumbers " +
              (isSmall ? "text-3xl text-white" : "text-5xl text-[#484848]")
            }
          >
            {timeRemaining.minutes}
          </div>
          <div
            className={
              "text-sm font-sfProDisplay " +
              (isSmall ? "mt-1 text-white" : "mt-2 text-gray-600")
            }
          >
            Minutes
          </div>
        </div>
      </div>
    </>
  );
};

export default CountDownText;
