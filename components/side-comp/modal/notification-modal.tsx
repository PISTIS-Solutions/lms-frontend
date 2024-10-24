import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronsRight, X } from "lucide-react";
import { Montserrat } from "next/font/google";
import CourseEnrollMent from "@/public/assets/svg/courseEnrollment.svg";
import ProjectSubmitted from "@/public/assets/svg/projectSubmitted.svg";
import ProjectReviewNotification from "@/public/assets/svg/projectReview.svg";
import ProjectRejected from "@/public/assets/svg/projectRejected.svg";
import subscriptionRenewalReminder from "@/public/assets/svg/subscriptionRenewalReminder.svg";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const montserrat = Montserrat({ subsets: ["latin"] });

interface NotificationModalProps {
  id: string;
  message: string;
  activity_date: string;
}

const NotificationModal = ({
  activity,
}: {
  activity: NotificationModalProps[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  const getActivityIconLink = (activityType: string) => {
    switch (activityType) {
      case "Course Enrollment Confirmation":
        return { img: CourseEnrollMent, link: "/courses" };
      case "Project Submitted":
        return { img: ProjectSubmitted, link: "/grading" };
      case "Project Review Notification":
        return { img: ProjectReviewNotification, link: "/grading" };
      case "Project Rejected":
        return { img: ProjectRejected, link: "/grading" };
      default:
        return { img: subscriptionRenewalReminder, link: "/pricing" };
    }
  };

  return (
    <>
      <p
        className="text-[#9F9F9F] text-xs md:text-xs flex capitalize leading-[160%] cursor-pointer"
        onClick={toggleModal}
      >
        View all
        <ChevronsRight color="#9F9F9F" size={16} />
      </p>
      <div
        className={
          "transition-opacity duration-300 " +
          (isOpen
            ? "bg-white/25 backdrop-blur-sm fixed flex justify-end items-center w-full h-full inset-0 z-20 opacity-100 animate-fade-in "
            : " opacity-0 hidden animate-fade-out")
        }
        onClick={toggleModal}
      >
        <div
          className={
            "w-[95%] lg:w-[37%] lg:h-screen bg-white  px-6 lg:p-[40px_32px] relative  h-full transform transition-transform duration-300 ease-in-out " +
            (isOpen ? " animate-slide-in" : "animate-slide-out")
          }
        >
          <span className="flex justify-between items-center mb-6 sticky top-0 pt-10 lg:p-0">
            <h3
              className={`text-[#014873] text-2xl font-medium ${montserrat.className} `}
            >
              Notification{" "}
              <span className="font-sfProDisplay text-xs text-[#9F9F9F]  relative top-[-4px]">
                ({activity.length})
              </span>
            </h3>
            <X
              size={18}
              color="#666666"
              className="cursor-pointer "
              onClick={toggleModal}
            />
          </span>
          <ScrollArea className="w-full rounded-md h-[80vh] lg:h-[90vh] pb-10 lg:p-0">
            <div className="divide-y-[0.5px] divide-slate-200">
              {activity?.length == 0 ? (
                <p className="text-center leading-[160%]">No activity yet</p>
              ) : (
                activity?.map((tag: any, index: any) => {
                  const activityItemLink = getActivityIconLink(
                    tag?.activity_type
                  );
                  return (
                    <Link
                      key={index}
                      className="flex items-center gap-3 md:gap-4  cursor-pointer py-[14px] last-of-type:pb-0"
                      href={activityItemLink.link}
                    >
                      <div className="flex items-start gap-x-4 w-full">
                        <Image
                          src={activityItemLink.img}
                          alt="activity icon"
                          className="w-10 h-10"
                        />
                        <div className="flex gap-x-4 w-full justify-between flex-wrap lg:flex-nowrap">
                          <span>
                            <p className="text-ellipsis overflow-hidden font-medium text-[#014873]">
                              {tag?.activity_type}
                            </p>
                            <p className="text-xs text-ellipsis overflow-hidden  text-[#666666]">
                              {tag?.message}
                            </p>
                          </span>
                          <span className="text-[#999999] text-xs flex items-center gap-x-1  whitespace-nowrap self-start">
                            <p>{tag?.time_since}</p>
                            <div className="w-[5px] h-[5px] rounded-full bg-[#FF1053]" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default NotificationModal;
