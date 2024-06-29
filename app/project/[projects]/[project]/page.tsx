"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SideNav from "@/components/side-comp/side-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, ChevronRight, Edit3, Loader2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import TopNav from "@/components/side-comp/topNav";
import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "@/utils/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import refreshAdminToken from "@/utils/refreshToken";
import SideProjects from "@/components/side-comp/side-projects";
import { Input } from "@/components/ui/input";
import PendingModal from "@/components/side-comp/modal/pending-modal";
import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

import {
  CustomH2,
  code,
  customH3,
  customOL,
  customP,
  customTD,
  customTH,
  customUL,
  strong,
  customLink,
} from "@/utils/markdown";
import Markdown from "react-markdown";

const SideProject = () => {
  const router = useRouter();
  //   const [showList, setShowList] = useState(false);
  const params = useParams<{ projects: string; project: string }>();
  const courseID = params.projects;
  const projectID = params.project;

  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<any | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState(projectID);

  const fetchProjectsRead = async () => {
    try {
      setLoading(true);
      const accessToken = Cookies.get("authToken");
      const response = await axios.get(
        `${urls.courses}${courseID}/projects/${projectID}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setProject(response.data);
      // console.log(response.data, "project");
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await fetchProjectsRead();
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
    }
  };

  const handleItemClick = (projectId: any) => {
    setSelectedProjectId(projectId === selectedProjectId ? null : projectId);
    router.replace(`/project/${courseID}/${projectId}`);
  };
  const [loadingProjectList, setLoadingProjectList] = useState(false);
  const [projectList, setProjectList] = useState<any | null>(null);

  const fetchProjects = async () => {
    try {
      setLoadingProjectList(true);
      const accessToken = Cookies.get("authToken");
      const response = await axios.get(`${urls.courses}${courseID}/projects/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setProjectList(response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await fetchProjects();
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
      setLoadingProjectList(false);
    }
  };

  useEffect(() => {
    fetchProjectsRead();
    fetchProjects();
  }, [courseID, projectID]);

  const [pendingModal, setPendingModal] = useState(false);
  const openPendingModal = () => {
    setPendingModal((prev) => !prev);
  };

  return (
    <main className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <ToastContainer />
      <div className="lg:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[96px] h-[60px] flex justify-between items-center bg-white shadow-md p-4 w-full">
          <ArrowLeft
            onClick={() => {
              router.back();
            }}
            className="cursor-pointer"
          />
          <TopNav />
        </div>

        {loading ? (
          <div className="w-[100%] flex items-center justify-center h-screen">
            <Loader2 className=" w-8 h-8 animate-spin" />
            <p>Loading Project Information</p>
          </div>
        ) : (
          <div className="md:grid flex flex-col-reverse grid-cols-10 relative gap-x-4 p-5">
            <div className="col-span-10 lg:col-span-7 bg-white shadow-md rounded-[8px]  ">
              <div>
                <div>
                  <div className="p-4">
                    <h2 className="font-medium text-lg md:text-2xl text-main">
                      {project?.project_title}
                    </h2>
                    {/* <p
                      dangerouslySetInnerHTML={{
                        __html: project?.project_description,
                      }}
                      className="font-normal text-justify py-2 text-[#3E3E3E] text-base md:text-xl"
                    ></p> */}
                    <Markdown
                      className="font-normal py-2 text-justify text-[#3E3E3E] text-base md:text-xl"
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h2: CustomH2,
                        h3: customH3,
                        ol: customOL,
                        p: customP,
                        ul: customUL,
                        th: customTH,
                        td: customTD,
                        strong: strong,
                        code: code,
                        a: customLink,
                      }}
                    >
                      {project?.project_description}
                    </Markdown>
                    <span>
                      <p className="text-main font-semibold">Hint: </p>
                      <ReactMarkdown
                        className="font-normal py-2 text-justify text-[#3E3E3E] text-base md:text-xl"
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h2: CustomH2,
                          h3: customH3,
                          ol: customOL,
                          p: customP,
                          ul: customUL,
                          th: customTH,
                          td: customTD,
                          strong: strong,
                          code: code,
                          a: customLink,
                        }}
                      >
                        {project?.project_hint}
                      </ReactMarkdown>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <SideProjects
              project={projectList}
              handleItemClick={handleItemClick}
              bool={true}
              selectedProjectId={selectedProjectId}
              handleCloseModal={openPendingModal}
            />
          </div>
        )}
      </div>
      {pendingModal && (
        <div className="w-full h-screen absolute top-0 bg-black/25 right-0">
          <PendingModal
            cID={courseID}
            bool={true}
            pID2={projectList}
            status={project?.submission_status}
            projectsTitles={project?.project_title}
            handleCloseModal={openPendingModal}
            setPendingModal={setPendingModal}
          />
        </div>
      )}
    </main>
  );
};

export default SideProject;
