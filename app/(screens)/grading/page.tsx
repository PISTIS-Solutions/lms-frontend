"use client";

import PendingModal from "@/components/side-comp/modal/pending-modal";
import ReviewedModal from "@/components/side-comp/modal/reviewed-modal";
import SideNav from "@/components/side-comp/side-nav";
import TopNav from "@/components/side-comp/topNav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { projectData } from "@/data/projectData";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

import axios from "axios";
import { urls } from "@/utils/config";
import refreshAdminToken from "@/utils/refreshToken";

import Cookies from "js-cookie";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Project = () => {
  // const [projectGrading, setProjectGrading] = useState([]);

  // const fetchProjectGrading = async (courseId: any) => {
  //   try {
  //     const accessToken = Cookies.get("authToken");
  //     const response = await axios.get(
  //       `${urls.projectReview}${courseId}/submissions/`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     if (response.status === 200) {
  //       setProjectGrading(response.data);
  //       console.log(response, "ressy");
  //     }
  //   } catch (error: any) {
  //     if (error.response && error.response.status === 401) {
  //       await refreshAdminToken();
  //       await fetchProjectGrading(courseId);
  //     } else if (error?.message === "Network Error") {
  //       toast.error("Check your network!", {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: true,
  //         closeOnClick: true,
  //         pauseOnHover: false,
  //         draggable: false,
  //         theme: "dark",
  //       });
  //     } else {
  //       toast.error(error?.response?.data?.detail, {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: true,
  //         closeOnClick: true,
  //         pauseOnHover: false,
  //         draggable: false,
  //         theme: "dark",
  //       });
  //     }
  //   }
  // };

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = projectData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(projectData.length / itemsPerPage);

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
  const handleModalApproved = () => {
    setOpenModalApproved((prev) => !prev);
  };
  const [courses, setCourses] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       // setLoading(true);
  //       const accessToken = Cookies.get("authToken");
  //       const response = await axios.get(urls.courses, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       });
  //       setCourses(response.data.results);
  //     } catch (error: any) {
  //       if (error.response && error.response.status === 401) {
  //         await refreshAdminToken();
  //         await fetchCourses();
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
  //       // setLoading(false);
  //     }
  //   };
  //   fetchCourses();
  // }, []);

  // useEffect(() => {
  //   fetchProjectGrading();
  // }, []);

  const [projectOverview, setProjectOverview] = useState<any>();
  const [overviewLoad, setOverviewLoad] = useState<boolean>(false);
  const fetchProjectOverview = async () => {
    try {
      const accessToken = Cookies.get("authToken");
      setOverviewLoad(true);
      const response = await axios.get(urls.projectOverview, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setProjectOverview(response.data);
      setOverviewLoad(false);
      console.log(response, "response")
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await fetchProjectOverview();
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
      setOverviewLoad(false);
    }
  };

  useEffect(() => {
    fetchProjectOverview();
  }, []);

  console.log(projectOverview, "po");
  return (
    <main className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <div className="lg:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[96px] h-[60px] flex justify-end items-center bg-white shadow-md p-4 w-full">
          <TopNav />
        </div>
        <div className="p-4">
          <div className="relative w-full md:w-1/3">
            <Input type="text" className="" placeholder="Search course" />
            <span className="text-xl top-2 text-main cursor-pointer right-2 absolute">
              <FaMagnifyingGlass />
            </span>
          </div>
          <div>
            <h1 className="font-semibold text-main py-2 text-xl">
              Project Review
            </h1>
          </div>
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
                {currentData.map((person, index) => (
                  <>
                    <tr key={index}>
                      <td
                        //   onClick={() => handleCardClick(person.id)}
                        className="md:py-4 px-2 md:px-0 md:text-base text-xs py-1 capitalize cursor-pointer"
                      >
                        {person.courseTitle}
                      </td>
                      <td className="md:py-4 md:text-base text-xs py-1">
                        {person.deadLine}
                      </td>
                      <td className="md:py-4 md:text-base text-xs py-1">
                        {!person.DateSubmitted ? "-" : person.DateSubmitted}
                      </td>
                      <td
                        className={`md:py-4 md:text-base text-xs py-1 capitalize ${
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
                            onClick={() => handleModal(person)}
                            className="bg-[#F8F9FF] rounded-[24px] text-center p-1 w-[107px] cursor-pointer"
                          >
                            Submit
                          </p>
                        ) : person.status === "Reviewed" ? (
                          <p
                            onClick={() => handleModalApproved()}
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
                ))}
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
                  <PendingModal handleCloseModal={handleModal} />
                </div>
              )}
            </div>
            <div>
              {openModalApproved && (
                <div className="bg-slate-200/50 top-0 left-0 absolute flex justify-center items-center w-full h-screen">
                  <ReviewedModal handleReviewModal={handleModalApproved} />
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
