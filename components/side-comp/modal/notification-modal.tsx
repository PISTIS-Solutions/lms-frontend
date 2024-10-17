import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronsRight, X } from "lucide-react";
import { Montserrat } from "next/font/google";
import CourseCompleted from "@/public/assets/svg/course-completion.svg";
import CourseEnrollMent from "@/public/assets/svg/course-enrollment.svg";
import Image from "next/image";
import { useState } from "react";

const montserrat = Montserrat({ subsets: ["latin"] });

function calculateTimeAgo(dateString: string): string {
  const givenDate: Date = new Date(dateString);
  const currentDate: Date = new Date();

  if (isNaN(givenDate.getTime())) {
    throw new Error("Invalid date string provided");
  }

  const differenceInMs: number = currentDate.getTime() - givenDate.getTime();

  // Convert to minutes, hours, and days
  const minutes: number = Math.floor(differenceInMs / (1000 * 60));
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
}

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
              className={`text-main text-2xl font-medium ${montserrat.className} `}
            >
              Notification{" "}
              <span className="font-sfProDisplay text-xs text-[#9F9F9F]  relative top-[-4px]">
                (25 Unread)
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
                activity?.map((tag: any, index: any) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 md:gap-4  cursor-pointer py-[14px] last-of-type:pb-0"
                  >
                    <div className="flex items-start gap-x-4 w-full">
                      <Image
                        src={
                          tag?.message.includes("You started")
                            ? CourseEnrollMent
                            : CourseCompleted
                        }
                        alt="status icon"
                        className="w-10 h-10"
                      />
                      <div className="flex gap-x-4 w-full justify-between flex-wrap lg:flex-nowrap">
                        <p className="text-sm text-ellipsis overflow-hidden font-medium text-main">
                          {tag?.message}
                        </p>
                        <span className="text-[#999999] text-xs flex items-center gap-x-1  whitespace-nowrap self-start">
                          <p>{calculateTimeAgo(tag?.activity_date)}</p>
                          <div className="w-[5px] h-[5px] rounded-full bg-[#FF1053]" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default NotificationModal;
