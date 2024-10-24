import { Loader2, X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import refreshAdminToken from "@/utils/refreshToken";
import Cookies from "js-cookie";
import axios from "axios";
import { urls } from "@/utils/config";
import CountDownText from "../CountDownText";
import RescheduleASessionModal from "./reschedule-a-session-modal";
import useFetchStudentSessionStore from "@/store/fetch-student-session";

interface UpcomingModal {
  toggleModal: () => void;
  isOpen: boolean;
}

const UpcomingModal = ({ toggleModal, isOpen }: UpcomingModal) => {
  const [loading, setLoading] = useState(false);
  const { data, fetchSession } = useFetchStudentSessionStore();

  const deleteSession = async () => {
    try {
      setLoading(true);
      const accessToken = Cookies.get("authToken");
      await axios.delete(`${urls.bookings}${data?.id}/revoke`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      toast.success("Your session has been cancelled!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
      });
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await deleteSession();
      } else if (error.response && error.response.status === 404) {
        console.log(error.response);
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
      fetchSession();
      toggleModal();
    }
  };

  return (
    <>
      <div
        className={
          "bg-white/10 fixed z-[99999] flex justify-center items-center w-full min-h-screen inset-0 backdrop-blur-sm cursor-pointer " +
          (isOpen
            ? "opacity-100 animate-fade-in "
            : "opacity-0 hidden animate-fade-out")
        }
        onClick={toggleModal}
      >
        <div
          className="w-[428px] p-6 bg-white rounded-lg shadow-[0px_0px_80px_0px_#00000066] h-fit mx-4 cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <p className="font-medium text-2xl text-[#2E2E2E]">
              Upcoming Session
            </p>

            <X
              color="#666666"
              size={24}
              strokeWidth={2}
              onClick={toggleModal}
              className="hover:scale-110 hover:cursor-pointer"
            />
          </div>

          <CountDownText />

          <div className="flex gap-[10px] font-sfProDisplay font-medium">
            <RescheduleASessionModal onClick={toggleModal} />
            <button
              className="border bg-[#FF0000] text-[#c4c4c4] h-[50px] flex justify-center items-center rounded-[8px] w-full text-sm lg:text-base"
              disabled={loading}
              onClick={deleteSession}
            >
              {loading ? (
                <Loader2 className="animate-spin text-white" />
              ) : (
                "Cancel Session"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpcomingModal;
