"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, X } from "lucide-react";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { baseURL } from "@/utils/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "next/navigation";
import { createAxiosInstance } from "@/lib/axios";

const STATUS_COLORS: Record<string, string> = {
  Submitted: "bg-orange-100 text-orange-600",
  Reviewed: "bg-green-100 text-green-600",
  Rejected: "bg-red-100 text-red-600",
};

const PendingModal = ({
  handleCloseModal,
  cID,
  pID,
  bool,
  pID2,
  projectTitle,
  projectsTitles,
  submissionStatus,
}: any) => {
  const params = useParams<{ projects: string; project: string }>();
  const projectParamId = params.project;

  const [link, setLink] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const projectData = pID2?.find((item: any) => item.id === projectParamId);
  const projectID = pID?.[0]?.id;
  const axios = createAxiosInstance();

  const alreadySubmitted = !!submissionStatus;
  const title = bool ? projectsTitles : projectTitle;

  const handleSubmit = async () => {
    if (!link || comment === "") {
      toast.error("Check form fields and add missing values!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
      });
      return;
    }

    try {
      setLoading(true);
      const accessToken = Cookies.get("authToken");
      const response = await axios.post(
        `${baseURL}/students/${cID}/submissions/`,
        {
          project: bool ? projectData?.id : projectID,
          submission_link: link,
          student_comments: comment,
          status: "Submitted",
        },
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      if (response.status === 201) {
        toast.success("Project Submitted Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      }
    } catch (error: any) {
      if (error.response) {
        const data = error.response.data;
        const pick = (f: any) => (Array.isArray(f) ? f[0] : f) || undefined;
        const errorMessage =
          pick(data?.detail) ||
          pick(data?.message) ||
          pick(data?.error) ||
          pick(data?.project) ||
          pick(data?.submission_link) ||
          pick(data?.non_field_errors) ||
          (Array.isArray(data) ? data[0] : null) ||
          "An error occurred";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      } else {
        toast.error("Network error — please try again", {
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
    }
  };

  return (
    <div className="bg-white p-4 overflow-y-scroll w-full lg:mx-2 mx-0 md:1/2 lg:w-1/3 h-full">
      <div>
        <div className="flex justify-between items-center">
          <h1 className="md:text-2xl text-lg font-medium">{title}</h1>
          <span
            onClick={handleCloseModal}
            className="border-2 cursor-pointer border-main p-2 rounded-sm w-[32px] h-[32px] flex justify-center items-center"
          >
            <X className="text-main" />
          </span>
        </div>

        {submissionStatus && (
          <div
            className={`mt-2 px-3 py-1 rounded-full text-sm font-medium w-fit ${STATUS_COLORS[submissionStatus] ?? "bg-gray-100 text-gray-600"}`}
          >
            {submissionStatus}
          </div>
        )}
      </div>

      {alreadySubmitted ? (
        <div className="mt-8 text-center text-gray-600">
          <p className="text-base">
            You have already submitted this project.
          </p>
          <p className="text-sm mt-1 text-gray-400">
            Go to <span className="font-medium text-main">Project Review</span> to view or re-submit if rejected.
          </p>
        </div>
      ) : (
        <div>
          <div className="my-4">
            <h1 className="text-[#000066] text-base md:text-xl font-medium">
              Submission link
            </h1>
            <Input
              value={link}
              onChange={(e: any) => setLink(e.target.value)}
              type="url"
              placeholder="Input link"
            />
          </div>
          <div className="my-4">
            <h1 className="text-[#000066] text-base md:text-xl font-medium">
              Add comment
            </h1>
            <Textarea
              value={comment}
              onChange={(e: any) => setComment(e.target.value)}
              className="bg-[#EEEEFB] text-black text-base md:text-sm"
            />
          </div>
          <div>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-sub w-full font-semibold hover:text-white text-black mt-10 md:mt-[55px]"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Submit"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingModal;
