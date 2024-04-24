"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, X } from "lucide-react";
import React, { useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "@/utils/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import refreshAdminToken from "@/utils/refreshToken";
import { useParams } from "next/navigation";

const PendingModal = ({
  handleCloseModal,
  cID,
  pID,
  bool,
  pID2,
  setPendingModal,
}: any) => {
  const params = useParams<{ projects: string; project: string }>();
  const courseID = params.projects;
  const projectParamId = params.project;

  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [link, setLink] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const projectData = pID2?.find((item: any) => item.id === projectParamId);
  const projectID = pID?.[0]?.id;

  const [submitID, setSubmitId] = useState("");

  // const patchSubmit = async (id: string) => {
  //   if (link && comment !== "") {
  //     try {
  //       setLoading(true);
  //       const accessToken = Cookies.get("authToken");
  //       const response = await axios.post(
  //         `${urls.courses}${cID}/submissions/${id}/`,
  //         {
  //           project_id: bool ? projectData?.id : projectID,
  //           submission_link: link,
  //           student_comments: comment,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }
  //       );
  //       if (response.status === 200) {
  //         toast.success("Project Submitted Successfully!", {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: true,
  //           closeOnClick: true,
  //           pauseOnHover: false,
  //           draggable: false,
  //           theme: "dark",
  //         });
  //         setLoading(false);
  //       }
  //     } catch (error: any) {
  //       console.log(error, "err");
  //       if (error.response && error.response.status === 401) {
  //         await refreshAdminToken();
  //         await handleSubmit();
  //       } else if (error?.message === "Network Error") {
  //         toast.error("Check your network!", {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: true,
  //           closeOnClick: true,
  //           pauseOnHover: false,
  //           draggable: false,
  //           theme: "dark",
  //         });
  //       } else {
  //         toast.error(error?.response?.data?.detail, {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: true,
  //           closeOnClick: true,
  //           pauseOnHover: false,
  //           draggable: false,
  //           theme: "dark",
  //         });
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };

  const handleSubmit = async () => {
    if (link && comment !== "") {
      try {
        setLoading(true);
        const accessToken = Cookies.get("authToken");
        const response = await axios.post(
          `${urls.courses}${cID}/submissions/`,
          {
            project_id: bool ? projectData?.id : projectID,
            submission_link: link,
            student_comments: comment,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status === 201) {
          toast.success("Project Submitted Successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
          setLoading(false);
          setSubmitId(response.data.id);
          console.log(response.data, "res");
        }
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          await refreshAdminToken();
          await handleSubmit();
        } else if (error?.message === "Network Error") {
          toast.error("Check your network!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
        } else if (error.status === "400") {
        } else {
          toast.error(error?.response?.data?.detail, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-white p-4 overflow-y-scroll w-full lg:mx-2 mx-0 md:1/2 lg:w-1/3 h-full">
      <div>
        <ToastContainer />
        <div className="flex justify-between items-center">
          <h1 className="md:text-2xl text-lg font-medium">Terraform</h1>
          <span
            onClick={handleCloseModal}
            className="border-2 cursor-pointer border-main p-2 rounded-sm w-[32px] h-[32px] flex justify-center items-center"
          >
            <X className="text-main" />
          </span>
        </div>
        <div className="md:px-2.5 px-1 py-1 my-2 bg-[#FFF3E5] text-[#EE7E00] rounded-[16px] w-[110px] text-center">
          <p className="md:text-base text-sm">Pending</p>
        </div>
      </div>
      <div>
        <div>
          <div className="my-4">
            <h1 className="text-[#000066] text-base md:text-xl font-medium">
              Submission link
            </h1>
            <Input
              value={link}
              onChange={(e: any) => {
                setLink(e.target.value);
              }}
              type="url"
              placeholder="Input link"
            />
          </div>
        </div>
        <div>
          <div className="my-4">
            <h1 className="text-[#000066] text-base md:text-xl font-medium">
              Files
            </h1>
            <div className="rounded-[8px] w-full h-[316px] flex justify-center items-center border-dotted border-2">
              <div className="flex flex-col justify-center items-center">
                <div className="">
                  <label
                    htmlFor="fileInput"
                    className="flex flex-row-reverse text-main border border-main rounded-[8px] p-3 my-2 items-center gap-x-4 cursor-pointer"
                  >
                    {selectedFile ? selectedFile.name : "Browse File"}
                    <AiOutlineUpload size={24} />
                    <input
                      id="fileInput"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <p className="text-[#A8A8A8]">
                  Files supported: PDF, PNG, JPEG
                </p>
              </div>
            </div>
          </div>
          <p className="text-sm text-right text-[#A8A8A8]">Max size: 4MB</p>
        </div>

        <div className="my-4">
          <h1 className="text-[#000066] text-base md:text-xl font-medium">
            Add comment
          </h1>
          <Textarea
            value={comment}
            onChange={(e: any) => {
              setComment(e.target.value);
            }}
            className="bg-[#EEEEFB] text-black text-base md:text-sm"
          />
        </div>
      </div>
      <div className="">
        <Button
          onClick={() => {
            handleSubmit();
          }}
          disabled={loading}
          className="bg-sub w-full font-semibold  hover:text-white text-black mt-10 md:mt-[55px]"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default PendingModal;
