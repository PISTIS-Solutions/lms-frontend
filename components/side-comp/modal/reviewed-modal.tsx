import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { urls } from "@/utils/config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import refreshAdminToken from "@/utils/refreshToken";

const ReviewedModal = ({ handleReviewModal, projectReview }: any) => {
  const submissionId = localStorage.getItem("submissionID");
  const person = projectReview.find(
    (item: any) => item.submission_id === submissionId
  );

  const [submitDetails, setSubmitDetails] = useState<any | null>(null);
  const [loadSubmit, setLoadSubmit] = useState(false);
  const fetchSubDetails = async () => {
    try {
      setLoadSubmit(true);
      const accessToken = Cookies.get("authToken");
      const response = await axios.get(
        `${urls.courses}${person?.course}/submissions/${person?.submission_id}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        setSubmitDetails(response.data);
        setLoadSubmit(false);
        // console.log(response.data)
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await fetchSubDetails();
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
      setLoadSubmit(false);
    }
  };
  useEffect(() => {
    fetchSubDetails();
  }, []);

  return (
    <div className="bg-white overflow-y-scroll p-4 w-full mx-2 md:mx-0 lg:w-1/3 h-5/6">
      <div>
        <ToastContainer />
        <div className="flex justify-between items-center">
        <h1 className="md:text-2xl text-lg font-medium">{person?.project?.title}</h1>
          <span
            onClick={handleReviewModal}
            className="border-2 cursor-pointer border-main p-2 rounded-sm w-[32px] h-[32px] flex justify-center items-center"
          >
            <X className="text-main" />
          </span>
        </div>
        <div className="px-2.5 py-1 my-2 bg-[#E5FAF2] text-[#01A06B] rounded-[16px] w-[110px] text-center">
          <p>Reviewed</p>
        </div>
      </div>
      <div>
        <div className="my-4">
          <h1 className="text-[#000066] text-base md:text-xl font-medium">
            Submission link
          </h1>
          {!loadSubmit ? submitDetails?.submission_link : "Please wait..."}
        </div>
        <div className="my-4">
          <h1 className="text-[#000066] text-base md:text-xl font-medium">
            Your comment
          </h1>
          <p className="text-[#3E3E3E] text-base md:text-lg">
            {!loadSubmit ? submitDetails?.student_comments : "Please wait..."}
            <div className="my-4">
              <h1 className="text-[#000066] text-base md:text-xl font-medium">
                Mentor's comment
              </h1>
              <p className="text-[#3E3E3E] text-base md:text-lg">
                {!loadSubmit ? submitDetails?.mentor_comments : "Please wait..."}
              </p>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewedModal;
