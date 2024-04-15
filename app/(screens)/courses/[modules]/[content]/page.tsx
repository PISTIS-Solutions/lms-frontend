"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import SideNav from "@/components/side-comp/side-nav";
import { ArrowLeft, ChevronRight, Edit3, Loader2, Plus } from "lucide-react";
import ReactPlayer from "react-player/lazy";
import { ScrollArea } from "@/components/ui/scroll-area";
import TopNav from "@/components/side-comp/topNav";

import useModuleRead from "@/store/module-read";
import SideModules from "@/components/side-comp/side-modules";
import useCourseRead from "@/store/course-read";

const Content = () => {
  const router = useRouter();
  const params = useParams<{ modules: string; content: string }>();
  const courseID = params.modules;
  const moduleID = params.content;
  const [selectedIndex, setSelectedIndex] = useState(moduleID);
  const { moduleData, fetchModuleRead, moduleLoading } = useModuleRead();
  const { courseRead, fetchCourseRead, loading } = useCourseRead();

  const handleItemClick = (moduleId: any) => {
    setSelectedIndex(moduleId === selectedIndex ? null : moduleId);
    router.replace(`/courses/${courseID}/${moduleId}`);
  };

  useEffect(() => {
    fetchModuleRead(courseID, moduleID);
    fetchCourseRead(courseID);
  }, []);

  return (
    <main className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <div className="md:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[96px] h-[60px] flex justify-between items-center bg-white shadow-md p-4 w-full">
          <ArrowLeft
            onClick={() => {
              router.back();
            }}
            className="cursor-pointer"
          />
          <TopNav />
        </div>
        <div className="">
          <div className=" px-4 mt-3 text-xs md;text-sm font-medium flex items-center">
            <p className="text-[#000066]">Course Content</p>
            <ChevronRight className="text-[#000066]" />
            <p className="text-[#000066]">Modules</p>
            <ChevronRight className="text-[#000066]" />
            <p className="text-[#000066]"> {moduleData?.module_title}</p>
          </div>
          {moduleLoading ? (
            <div className="w-[100%] flex items-center justify-center h-screen">
              <Loader2 className=" w-8 h-8 animate-spin" />
              <p>Loading Module Information</p>
            </div>
          ) : (
            <div>
              <h1 className=" px-4 text-[#1A1A1A] text-lg md:text-2xl my-4 font-medium">
                {moduleData?.module_title}
              </h1>
              <div className="grid gap-x-2 grid-cols-10">
                <span className="relative col-span-7">
                  <ReactPlayer
                    controls={false}
                    width="100%"
                    height="100%"
                    autoplay={true}
                    url={moduleData?.module_url}
                    className="h-[428px]"
                    config={{
                      youtube: {
                        playerVars: {
                          controls: 0,
                          modestbranding: 1,
                        },
                      },
                    }}
                  />
                  <div className=" bg-transparent cursor-not-allowed w-full h-14 absolute top-0"/>
                  <div className=" bg-transparent cursor-not-allowed w-full h-14 absolute bottom-0"/>

                </span>

                <ScrollArea className="h-[428px] col-span-3 rounded-[8px] shadow-md my-2 md:my-0 bg-white">
                  {loading ? (
                    <div className="w-[100%] flex items-center justify-center h-screen">
                      <Loader2 className=" w-8 h-8 animate-spin" />
                      <p>Loading Modules</p>
                    </div>
                  ) : (
                    <SideModules
                      courseRead={courseRead}
                      selectedIndex={selectedIndex}
                      handleItemClick={handleItemClick}
                    />
                  )}
                </ScrollArea>
              </div>
              <div className="bg-white shadow-md p-4">
                <div className="">
                  <h1 className="md:text-2xl text-lg font-medium">
                    Module 1: {moduleData?.module_title}
                  </h1>
                </div>
                <div>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: moduleData?.description,
                    }}
                    className="py-4 text-[#3E3E3E]"
                  ></p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Content;
