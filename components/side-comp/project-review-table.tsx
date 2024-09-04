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
  // console.log(currentData);
  // const currentData = [
  //   {
  //     course: {
  //       id: "31da6aaf-b4d8-4ed6-b415-61ed2c201436",
  //       title: "Onboarding-new",
  //     },
  //     date_submitted: null,
  //     deadline: "2024-08-30T06:10:30",
  //     project: {
  //       id: "2b88b8ac-2142-4a2c-9dec-97e00f769681",
  //       title: "Getting Started",
  //     },
  //     status: "Reviewed",
  //     submission_id: null,
  //   },
  //   {
  //     course: {
  //       id: "31da6aaf-b4d8-4ed6-b415-61ed2c201436",
  //       title: "Onboarding-new",
  //     },
  //     date_submitted: null,
  //     deadline: "2024-08-30T06:10:30",
  //     project: { id: "372b6f2f-e266-43b6-940f-dfe017fa1bdd", title: "testing" },
  //     status: "-",
  //     submission_id: null,
  //   },
  // ];
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

  {
    /* TODO:change the text family */
  }
  return (
    <div className="overflow-x-scroll md:overflow-x-auto">
      <table className="w-full mt-2 text-left">
        <thead className="text-main">
          <tr className="bg-[#E6F6FF] w-full">
            <th className="md:py-4 px-4  md:text-base text-sm py-3 font-medium text-center md:!p-[10px] rounded-l-[10px]">
              Course Title
            </th>
            <th className="md:py-4 px-4 md:px-2 md:text-base text-sm py-3 font-medium text-center md:!p-[10px]">
              Project Title
            </th>
            <th className="md:py-4 px-4 md:px-2 md:text-base text-sm py-3 font-medium text-center md:!p-[10px]">
              Deadline
            </th>
            <th className="md:py-4 px-4 md:px-2 md:text-base text-sm py-3 font-medium text-center md:!p-[10px]">
              Date Submitted
            </th>
            <th className="md:py-4 px-4 md:px-2 md:text-base text-sm py-3 font-medium text-center md:!p-[10px]">
              Status
            </th>
            <th className="md:py-4 px-4 md:px-2 md:text-base text-sm py-3 font-medium text-center md:!p-[10px] rounded-r-[10px]">
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
                    className="md:py-4 px-2 md:px-0 md:text-base text-sm py-1 capitalize cursor-pointer"
                  >
                    {person?.course?.title}
                  </td>
                  <td
                    //   onClick={() => handleCardClick(person.id)}
                    className="md:py-4 px-2 md:px-0 md:text-base text-sm py-1 capitalize cursor-pointer"
                  >
                    {person?.project?.title}
                  </td>

                  <td className="md:py-4 md:text-base text-sm py-1">
                    {formatDate(person.deadline)}
                  </td>

                  <td className="md:py-4 text-left md:text-base text-sm py-1">
                    {!person.date_submitted
                      ? "-"
                      : formatDate(person.date_submitted)}
                  </td>
                  <td
                    className={`md:py-4 md:text-base text-left text-sm py-1 capitalize ${
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
                    {!person.status ? "No Submission" : person.status}
                  </td>
                  <td className="md:py-4 md:text-base text-sm py-1 text-main">
                    {!person.status ? (
                      "-"
                    ) : person.status === "Submitted" ||
                      person.status === "Rejected" ? (
                      <p
                        onClick={() => {
                          handleModal(person);
                          localStorage.setItem(
                            "submissionID",
                            person?.submission_id
                          );
                        }}
                        className="bg-[#F8F9FF] rounded-[24px] text-center p-1 w-full md:w-[107px] cursor-pointer"
                      >
                        Re-submit
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
                        className="bg-white border border-[#EEEEFB] rounded-[24px] text-center p-1 w-full md:w-[107px] cursor-pointer"
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
