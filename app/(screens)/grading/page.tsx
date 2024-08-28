"use client";

import PendingModal from "@/components/side-comp/modal/pending-modal";
import ReviewedModal from "@/components/side-comp/modal/reviewed-modal";
import SideNav from "@/components/side-comp/side-nav";
import TopNav from "@/components/side-comp/topNav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import usePendingGradeStore from "@/store/project-review";
import GradingPendingModal from "@/components/side-comp/modal/grading-pending-modal";
import { useRouter } from "next/router";

const Project = () => {
  const { projectReview, loading, fetchProjectReview } = usePendingGradeStore();
  useEffect(() => {
    fetchProjectReview();
  }, []);
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = projectReview.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(projectReview.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const [openModal, setOpenModal] = useState(false);
  const handleModal = (person: any) => {
    setOpenModal((prev) => !prev);
  };

  //for approved modal
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

  // const filteredProjects = projectReview?.results?.filter((person: any) =>
  //   person.course_title.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  // const handleCourseId = (courseID: string, submitId: string) => {
  //   const currentUrl = window.location.href;
  //   const newUrl = `${currentUrl}/${courseID}/${submitId}`;
  //   window.history.pushState({}, "", newUrl);
  // };

  return (
    <main className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <div className="lg:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[96px] h-[60px] flex justify-end items-center bg-white shadow-md p-4 w-full">
          <TopNav />
        </div>
        <div className="p-4">
          {/* <div className="relative w-full md:w-1/3">
            <Input
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              type="text"
              className=""
              placeholder="Search course"
            />
            <span className="text-xl top-2 text-main cursor-pointer right-2 absolute">
              <FaMagnifyingGlass />
            </span>
          </div> */}
          <div>
            <h1 className="font-semibold text-main py-2 text-xl">
              Project Review
            </h1>
          </div>
          <div className="overflow-x-scroll md:overflow-x-auto">
            <table className="w-full mt-2 text-left">
              <thead className="text-main">
                <tr className="bg-[#F8F9FF] py-1 w-full">
                  <th className="md:py-4 px-4 md:px-2 md:text-base text-xs py-1">
                    Course Title
                  </th>
                  <th className="md:py-4 px-4 md:px-2 md:text-base text-xs py-1">
                    Project Title
                  </th>
                  <th className="md:py-4 px-4 md:px-2 md:text-base text-xs py-1">
                    Deadline
                  </th>
                  <th className="md:py-4 px-4 md:px-2 md:text-base text-xs py-1">
                    Date Submitted
                  </th>
                  <th className="md:py-4 px-4 md:px-2 md:text-base text-xs py-1">
                    Status
                  </th>
                  <th className="md:py-4 px-4 md:px-2 md:text-base text-xs py-1">
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
                  currentData?.map((person: any, index: number) => (
                    <>
                      <tr key={index}>
                        <td
                          //   onClick={() => handleCardClick(person.id)}
                          className="md:py-4 px-4 md:px-2 md:text-base text-xs py-1 capitalize"
                        >
                          {person?.course?.title}
                        </td>
                        <td
                          //   onClick={() => handleCardClick(person.id)}
                          className="md:py-4 px-4 md:px-2 md:text-base text-xs py-1 capitalize"
                        >
                          {person?.project?.title}
                        </td>
                        <td className="md:py-4 px-4 md:px-2 md:text-base text-xs py-1 capitalize">
                          {formatDate(person.deadline)}
                        </td>

                        <td className="md:py-4 px-4 md:px-2 md:text-base text-xs py-1 capitalize">
                          {!person.date_submitted
                            ? "-"
                            : formatDate(person.date_submitted)}
                          {/* {person.date_submitted} */}
                        </td>
                        <td
                          className={`md:py-4 px-4 md:px-2 md:text-base text-xs py-1 capitalize" ${
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
                        <td className="md:py-4 md:text-base text-xs py-1 text-main">
                          {!person.status ? (
                            "-"
                          ) : person.status === "Submitted" || person.status === "Rejected" ? (
                            <p
                              onClick={() => {
                                handleModal(person);
                                localStorage.setItem(
                                  "submissionID",
                                  person?.submission_id
                                );
                              }}
                              className="bg-[#F8F9FF] rounded-[24px] text-center p-1 w-[107px] cursor-pointer"
                            >
                              Re-Submit
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
                              className="bg-white border border-[#EEEEFB] rounded-[24px] text-center p-1 w-[107px] cursor-pointer"
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

            <div className="flex items-center justify-end gap-5 mt-2">
              <div>
                <Button
                  className="bg-transparent text-main cursor-pointer text-xs md:text-[14px] flex items-center gap-1 hover:bg-transparent hover:text-main"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  <ArrowLeft />
                  Previous
                </Button>
              </div>
              <div className="flex space-x-2 md:space-x-4">
                {pageNumbers.map((page) => (
                  <p
                    key={page}
                    onClick={() => goToPage(page)}
                    className={
                      page === currentPage
                        ? "cursor-pointer font-semibold text-main"
                        : "text-slate-400 cursor-pointer"
                    }
                  >
                    {page}
                  </p>
                ))}
              </div>
              <div>
                <Button
                  onClick={nextPage}
                  className="bg-transparent text-main cursor-pointer text-xs md:text-[14px] flex items-center gap-1 hover:bg-transparent hover:text-main"
                  disabled={currentPage === totalPages}
                >
                  <ArrowRight />
                  Next
                </Button>
              </div>
            </div>

            <div>
              {openModal && (
                <div className="bg-slate-200/50 top-0 left-0 absolute flex justify-center items-center w-full h-screen">
                  <GradingPendingModal
                    // index={index}
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
        </div>
      </div>
    </main>
  );
};

export default Project;
