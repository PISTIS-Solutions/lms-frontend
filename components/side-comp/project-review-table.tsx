"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, Loader2Icon } from "lucide-react";
import { projectData } from "@/data/projectData";
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
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  return (
    <div className="overflow-x-scroll md:overflow-x-auto">
      <table className="w-full mt-2 text-left">
        <thead className="text-main">
          <tr className="bg-[#F8F9FF] py-1 w-full">
            <th className="md:py-4 px-2 md:px-0 md:text-base text-xs py-1">
              Course Title
            </th>
            <th className="md:py-4 px-2 md:px-0 md:text-base text-xs py-1">
              Deadline
            </th>
            <th className="md:py-4 px-2 md:px-0 md:text-base text-xs py-1">
              Date Submitted
            </th>
            <th className="md:py-4 px-2 md:px-0 md:text-base text-xs py-1">
              Status
            </th>
            <th className="md:py-4 px-2 md:px-0 md:text-base text-xs py-1">
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
                    className="md:py-4 px-2 md:px-0 md:text-base text-xs py-1 capitalize cursor-pointer"
                  >
                    {person?.course?.title}
                  </td>
                  <td className="md:py-4 md:text-base text-xs py-1">
                    {formatDate(person.deadline)}
                  </td>

                  <td className="md:py-4 text-center md:text-base text-xs py-1">
                    {!person.date_submitted
                      ? "-"
                      : formatDate(person.date_submitted)}
                  </td>
                  <td
                    className={`md:py-4 md:text-base text-center text-xs py-1 capitalize ${
                      !person.status
                        ? "text-gray-600"
                        : person.status === "Pending"
                        ? "text-orange-500"
                        : person.status === "Reviewed"
                        ? "text-green-500"
                        : "text-gray-600"
                    }`}
                  >
                    {!person.status ? "No Submission" : person.status}
                  </td>
                  <td className="md:py-4 md:text-base text-xs py-1 text-main">
                    {!person.status ? (
                      "-"
                    ) : person.status === "Pending" ? (
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
              <td colSpan={6} className="py-4">
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
