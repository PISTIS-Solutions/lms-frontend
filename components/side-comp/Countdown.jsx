import { Calendar, MoreVertical, Users } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import teamSlice from "@/public/assets/svg/teamSlice.svg";
import UpcomingModal from "./modal/upcoming-modal";
import useFetchStudentSessionStore from "@/store/fetch-student-session";
import CountDownText from "./CountDownText";

export default function Countdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);
  const { fetchSession, timeRemaining, loading, data, startCountdown } =
    useFetchStudentSessionStore();

  useEffect(() => {
    fetchSession();
  }, []);

  console.log(data);

  return (
    <>
      {!loading && data && timeRemaining !== null && (
        <>
          <div className=" p-3 rounded-lg max-w-sm">
            <div className="space-y-4 p-4 bg-main backdrop-blur-sm bg-white/10">
              {/* Header */}
              <div className="flex justify-between items-center mb-16 font-sfProDisplay">
                <h2 className="text-white text-base font-medium">
                  Upcoming Section
                </h2>
                <button className="text-white">
                  <MoreVertical size={20} />
                </button>
              </div>

              <CountDownText isSmall />

              <button
                className="w-full h-[46px] justify-center items-center font-sfProDisplay bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors rounded-[6px] text-[#FF0000] text-xs lg:text-base cancel-button"
                onClick={toggleModal}
              >
                Cancel Private Session
              </button>
            </div>
          </div>
          <UpcomingModal toggleModal={toggleModal} isOpen={isOpen} />
        </>
      )}
    </>
  );
}
