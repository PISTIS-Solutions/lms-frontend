import Image from "next/image";
import React, { useEffect, useState } from "react";
import BookASessionModal from "./modal/book-a-session-modal";
import coin from "@/src/assets/svg/coin.svg";
import Cookies from "js-cookie";
import refreshAdminToken from "@/utils/refreshToken";
import { toast } from "react-toastify";
import { urls } from "@/utils/config";
// import axios from "axios";
import useStudentStore from "@/store/fetch-students";
import { Loader } from "lucide-react";
import useFetchStudentSessionStore from "@/store/fetch-student-session";

const BookASessionCard = () => {
  const { sessionLeft, loading: fetchingSession } =
    useFetchStudentSessionStore();

  const { studentData, loading, fetchStudentData } = useStudentStore();

  const userName = studentData?.full_name;

  useEffect(() => {
    fetchStudentData();
  }, []);

  const isLoading = loading || fetchingSession;

  return (
    <div className="p-3 bg-[#006] rounded-[8px] flex flex-col items-center gap-[10px] overflow-hidden self-stretch bg-session-bg">
      <div className="flex gap-x-[10px] items-center z-[1] self-stretch">
        <div className="rounded-full border-white bg-gray-200 border-2 w-16 h-16 overflow-hidden ">
          {loading
            ? ""
            : studentData?.profile_photo && (
                <Image
                  src={studentData?.profile_photo}
                  alt="profile-pics"
                  className=""
                  unoptimized
                  width={64}
                  height={64}
                />
              )}
        </div>

        <div className="text-white">
          {loading && fetchingSession ? (
            <Loader className="animate-spin" />
          ) : (
            <>
              <p className="text-lg  font-medium">{userName}</p>
              {fetchingSession ? (
                <Loader className="animate-spin" size={15} />
              ) : (
                sessionLeft !== null && (
                  <div className="flex p-[2px_6px] justify-center items-center gap-[6px] bg-[#2E2E82] rounded-[6px]">
                    <Image src={coin} alt="" className="bg-cover " />
                    <p className="text-xs font-sfProDisplay font-normal">
                      {sessionLeft} Session credits left
                    </p>
                  </div>
                )
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
