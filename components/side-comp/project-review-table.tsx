"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import PendingModal from "./modal/pending-modal";
import ReviewedModal from "./modal/reviewed-modal";
import usePendingGradeStore from "@/store/project-review";
import GradingPendingModal from "./modal/grading-pending-modal";

const ProjectReview = () => {
  const { projectReview, loading, fetchProjectReview } = usePendingGradeStore();
  useEffect(() => {
    fetchProjectReview();
  }, []);

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = projectReview?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(projectReview?.length / itemsPerPage);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);
  const handleModal = (person: any) => {
    setOpenModal((prev) => !prev);
  };

  const [openModalApproved, setOpenModalApproved] = useState(false);

  const handleModalApproved = (person: any) => {
    setOpenModalApproved((prev) => !prev);
  };
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  return (
    <div className="overflow-x-scroll md:overflow-x-auto">
      <table className="w-full mt-2 text-left font-sfProDisplay">
        <thead className="text-main font-sfProDisplay font-medium">
          <tr className="bg-[#E6F6FF] w-full">
            <th className="md:py-4 px-4  md:text-base text-sm py-3 font-medium md:!p-[10px] rounded-l-[10px] lg:w-[40%]">
              Course Title
            </th>
            <th className="md:py-4 px-4 md:px-2 md:text-base text-sm py-3 font-medium text-center md:!p-[10px]">
              Deadline
            </th>

            <th className="md:py-4 px-4 md:px-2 md:text-base text-sm py-3 font-medium text-center md:!p-[10px]">
              Date Submitted
            </th>
            <th className="md:py-4 px-4 md:text-base text-sm py-3 font-medium md:!p-[10px]  md:!px-0">
              Status
            </th>
            <th className="md:py-4 md:px-2 md:text-base text-sm py-3 font-medium md:!p-[10px] rounded-r-[10px] px-5">
              Link
            </th>
          </tr>
        </thead>
        <tbody className="relative">
          {loading ? (
            <tr>
              <td colSpan={6} className="py-4">
                <span className="flex items-center justify-center">
                  <Loader2Icon className="animate-spin" />
                  <p>Loading</p>
                </span>
              </td>
            </tr>
          ) : currentData && currentData.length > 0 ? (
            currentData.map((person: any, index: number) => (
              <>
                <tr key={index}>
                  <td
                    //   onClick={() => handleCardClick(person.id)}
                    className="md:py-4 px-2  md:text-base text-sm py-1 capitalize cursor-pointer"
                  >
                    {person?.course?.title}
                  </td>

                  <td className="md:py-4 md:text-base text-sm py-1 text-center md:px-2 text-[#666666]">
                    {formatDate(person.deadline)}
                  </td>

                  <td className="md:py-4  md:text-base text-sm py-1 text-center text-[#666666]">
                    {!person.date_submitted
                      ? "-"
                      : formatDate(person.date_submitted)}
                  </td>
                  <td
                    className={`md:py-4 md:text-base text-sm py-1 capitalize ${
                      !person.status
                        ? "text-gray-600"
                        : person.status === "Submitted"
                        ? "text-orange-500"
                        : person.status === "Reviewed"
                        ? "text-green-500"
                        : person.status === "Rejected"
                        ? "text-red-500"
                        : "text-gray-600"
                    }`}
                  >
                    <div className="flex gap-x-2 items-center">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          !person.status
                            ? "bg-gray-600"
                            : person.status === "Submitted"
                            ? "bg-orange-500"
                            : person.status === "Reviewed"
                            ? "bg-green-500"
                            : person.status === "Rejected"
                            ? "bg-red-500"
                            : "bg-gray-600"
                        }`}
                      ></div>

                      {!person.status ? "No Submission" : person.status}
                    </div>
                  </td>
                  <td className="md:py-2 md:text-base text-sm py-1 text-main pl-4 pr-[30px] md:px-0">
                    {!person.status ? (
                      "-"
                    ) : person.status == "Submitted" ||
                      person.status == "Rejected" ? (
                      <p
                        onClick={() => {
                          handleModal(person);
                          localStorage.setItem(
                            "submissionID",
                            person?.submission_id
                          );
                        }}
                        className="bg-[#C2E8FF] rounded-[6px] text-[#014873] font-medium text-center px-3 md:p-1 py-2 w-full md:w-[107px] cursor-pointer text-xs md:text-sm h-full"
                      >
                        Submit
                      </p>
                    ) : person.status === "Reviewed" ? (
                      <p
                        onClick={() => {
                          handleModalApproved(person);
                          localStorage.setItem(
                            "submissionID",
                            person?.submission_id
                          );
                        }}
                        className="bg-transparent text-[#014873] border border-[#014873] rounded-[6px] text-center p-1 w-full md:w-[107px] cursor-pointer text-xs md:text-sm"
                      >
                        View
                      </p>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              </>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="py-4 text-center">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {openModal && (
          <div className="bg-slate-200/50 top-0 left-0 absolute flex justify-center items-center w-full h-screen">
            <GradingPendingModal
              projectReview={projectReview}
              handleCloseModal={handleModal}
            />
          </div>
        )}
      </div>
      <div>
        {openModalApproved && (
          <div className="bg-slate-200/50 top-0 left-0 absolute flex justify-center items-center w-full h-screen">
            <ReviewedModal
              projectReview={projectReview}
              handleReviewModal={handleModalApproved}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectReview;
