import { Calendar } from "lucide-react";
import Image from "next/image";
import teamSlice from "@/src/assets/svg/teamSlice.svg";
import { useEffect, useState } from "react";
import useFetchStudentSessionStore from "@/store/fetch-student-session";
import time from "@/src/assets/svg/time.svg";
import topicWhite from "@/src/assets/svg/topicWhite.svg";
import timeWhite from "@/src/assets/svg/timeWhite.svg";
import userCard from "@/src/assets/svg/userCard.svg";
import userCardWhite from "@/src/assets/svg/userCardWhite.svg";
import calendar from "@/src/assets/svg/calendar.svg";
import calendarWhite from "@/src/assets/svg/calendarWhite.svg";

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
    if (data && (data.preferred_date || data.alternative_date)) {
      const targetDate =
        new Date(data.preferred_date).getTime() > Date.now()
          ? new Date(data.preferred_date).getTime()
          : new Date(data.alternative_date).getTime();

      const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const timeDifference = targetDate - now;

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

          setTimeRemaining({ days, hours, minutes });
        }
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [data?.preferred_date, data?.alternative_date]);

  if (!data) return;

  const targetDate =
    new Date(data?.preferred_date).getTime() > Date.now()
      ? data?.preferred_date
      : data?.alternative_date;

  const date = formatDateTime(targetDate);

  return (
    <>
      <div className="space-y-[6px] font-sfProDisplay text-sm mb-6">
        <div
          className={
            "flex items-center gap-1 md:gap-2  " +
            (isSmall ? "text-white" : "text-[#666666]")
          }
        >
          <Image src={isSmall ? userCardWhite : userCard} alt="team slice" />

          <span
            className={`text-ellipsis overflow-hidden w-[inherit] whitespace-nowrap ${
              isSmall ? "text-xs md:text-sm" : "text-base"
            }`}
          >
            Pistis TechHub faculty
          </span>
        </div>
        <div
          className={
            "flex items-center gap-1 md:gap-2  " +
            (isSmall ? "text-white" : "text-[#666666]")
          }
        >
          <Image src={isSmall ? teamSlice : topicWhite} alt="topic" />

          <span
            className={`text-ellipsis overflow-hidden w-[inherit] whitespace-nowrap ${
              isSmall ? "text-xs md:text-sm" : "text-base"
            }`}
          >
            {data?.topic}
          </span>
        </div>
        <div
          className={
            "flex items-center gap-1 md:gap-2  " +
            (isSmall ? "text-white" : "text-[#666666]")
          }
        >
          <Image src={isSmall ? calendarWhite : calendar} alt="date" />

          <span className={isSmall ? "text-xs md:text-sm" : "text-base"}>
            {date?.date} • {date?.time}
          </span>
        </div>
        <div
          className={
            "flex items-center gap-1 md:gap-2  " +
            (isSmall ? "text-white" : "text-[#666666]")
          }
        >
          <Image src={isSmall ? time : timeWhite} alt="duration" />
          <span className={isSmall ? "text-xs md:text-sm" : "text-base"}>
            {data?.duration} Min
          </span>
        </div>
      </div>

      <div
        className={
          "flex items-center  " +
          (isSmall ? "justify-between" : "mb-6 justify-center gap-1 md:gap-2")
        }
      >
        {/* Days */}
        <div className="text-center">
          <div
            className={
              " font-digital tracking-wider font-digitalNumbers   " +
              (isSmall
                ? "text-xl md:text-3xl text-white"
                : "text-5xl text-[#484848]")
            }
          >
            {timeRemaining.days}
          </div>
          <div
            className={
              "md:text-sm font-sfProDisplay " +
              (isSmall
                ? "mt-1 text-white text-xs md:text-sm"
                : "text-sm mt-2 text-gray-600")
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
              (isSmall
                ? "text-xl md:text-3xl text-white"
                : "text-5xl text-[#484848]")
            }
          >
            {timeRemaining.hours}
          </div>
          <div
            className={
              " font-sfProDisplay " +
              (isSmall
                ? "mt-1 text-white text-xs md:text-sm"
                : "text-sm mt-2 text-gray-600")
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
              (isSmall
                ? "text-xl md:text-3xl text-white"
                : "text-5xl text-[#484848]")
            }
          >
            {timeRemaining.minutes}
          </div>
          <div
            className={
              " font-sfProDisplay " +
              (isSmall
                ? "mt-1 text-white text-xs md:text-sm"
                : "mt-2 text-gray-600 text-sm")
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
