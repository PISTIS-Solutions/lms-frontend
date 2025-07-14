"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next-nprogress-bar";
import { useParams } from "next/navigation";

import SideNav from "@/components/side-comp/side-nav";
import { ArrowLeft, ChevronRight, Edit3, Loader2, Plus } from "lucide-react";
import TopNav from "@/components/side-comp/topNav";
import useCourseRead from "@/store/course-read";
import "react-toastify/dist/ReactToastify.css";
import SideModules from "@/components/side-comp/side-modules";
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
import Link from "next/link";

const Module = () => {
  const router = useRouter();
  const params = useParams<{ modules: string }>();
  const courseID = params.modules;
  const [selectedIndex, setSelectedIndex] = useState(courseID);

  const { courseRead, fetchCourseRead, loading } = useCourseRead();

  const handleItemClick = (moduleId: any) => {
    setSelectedIndex(moduleId === selectedIndex ? null : moduleId);
    router.replace(`/courses/${courseID}/${moduleId}`);
  };

  useEffect(() => {
    fetchCourseRead(courseID);
  }, []);

  return (
    <main className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
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
            <p>Loading Course Information</p>
          </div>
        ) : (
          <div className="p-4">
            <span className="flex gap-0.5 items-center">
              <Link href="/courses">
                <p className="text-sm text-main">Course Content</p>
              </Link>
              <ChevronRight className="text-main" />{" "}
              <p className="text-sm text-[#9C9C9C]">{courseRead?.title}</p>{" "}
            </span>
            <div className="lg:grid flex flex-col-reverse grid-cols-10 gap-x-2 my-2 ">
              <div className="bg-white col-span-7 p-2 rounded-[8px] shadow-sm">
                <h1 className="md:text-2xl text-xl text-main py-2">
                  {courseRead?.title}
                </h1>
                {/* <p
                  dangerouslySetInnerHTML={{ __html: courseRead?.overview }}
                  className="text-[#3E3E3E] text-justify md:text-base text-sm"
                ></p> */}
                <ReactMarkdown
                  className="py-4 text-[#3E3E3E]"
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
                  {courseRead?.overview}
                </ReactMarkdown>
              </div>

              <SideModules
                courseRead={courseRead}
                selectedIndex={selectedIndex}
                handleItemClick={handleItemClick}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Module;
