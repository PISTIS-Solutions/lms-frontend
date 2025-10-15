import Image from "next/image";
import React, { useEffect } from "react";
import BookASessionModal from "./modal/book-a-session-modal";
import coin from "@/src/assets/svg/coin.svg";
import { Loader } from "lucide-react";
import useStudentStore from "@/store/fetch-students";
import useGetStudentSessionCount from "@/store/get-student-session-count";

const BookASessionCard = () => {
  const {
    sessionLeft,
    loading: fetchSessionLoading,
    fetchSession,
  } = useGetStudentSessionCount();
  const { studentData, loading, fetchStudentData } = useStudentStore();

  useEffect(() => {
    fetchStudentData();
    fetchSession();
  }, [fetchStudentData, fetchSession]);

  const isLoading = loading || fetchSessionLoading;
  const userName = studentData?.full_name;

  return (
    <div className="p-3 bg-[#006] rounded-[8px] flex flex-col items-center gap-[10px] overflow-hidden self-stretch bg-session-bg">
      <div className="flex gap-x-[10px] items-center z-[1] self-stretch">
        <div className="rounded-full border-white bg-gray-200 border-2 w-16 h-16 overflow-hidden">
          {!loading && studentData?.profile_photo && (
            <Image
              src={studentData.profile_photo}
              alt="profile-pic"
              unoptimized
              width={64}
              height={64}
            />
          )}
        </div>

        <div className="text-white">
          {isLoading ? (
            <Loader className="animate-spin" />
          ) : (
            <>
              <p className="text-lg font-medium">{userName}</p>
              {sessionLeft !== null && (
                <div className="flex p-[2px_6px] justify-center items-center gap-[6px] bg-[#2E2E82] rounded-[6px]">
                  <Image src={coin} alt="" className="bg-cover" />
                  <p className="text-xs font-sfProDisplay font-normal">
                    {sessionLeft} Session credits left
                  </p>
                </div>
              )}
              {sessionLeft === 0 && (
                <p className="text-xs text-red-300 mt-1">
                  No session credits left 😕
                </p>
              )}
            </>
          )}
        </div>
      </div>

      <BookASessionModal isDisabled={isLoading} />
    </div>
  );
};

export default BookASessionCard;
