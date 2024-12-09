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
import { useRouter } from "next/navigation";
import refreshAdminToken from "@/utils/refreshToken";
import { toast } from "react-toastify";
import { urls } from "@/utils/config";
import axios from "axios";
import Cookies from "js-cookie";

const montserrat = Montserrat({ subsets: ["latin"] });

interface Activity {
  id: string;
  activity_type: string;
  message: string;
  time_since: string;
  is_read: boolean;
}

interface NotificationModalProps {
  "unread messages": number;
  activities: Activity[];
}

const NotificationModal = ({
  activities,
}: {
  activities: NotificationModalProps | undefined;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => activities != undefined && setIsOpen(!isOpen);

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

  const navigation = useRouter();

  const markAsRead = async (link: string, id: string) => {
    try {
      const accessToken = Cookies.get("authToken");
      axios.put(
        `${urls.activities}${id}/mark-as-read/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      await navigation.push(link);
    } catch (error: any) {
      console.log(error.response.data.error[0]);
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await markAsRead(link, id);
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
                (
                {activities && activities["unread messages"]
                  ? activities["unread messages"]
                  : ""}{" "}
                Unread )
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
              {activities === undefined ||
              activities?.activities.length == 0 ? (
                <p className="text-center leading-[160%]">No activity yet</p>
              ) : (
                activities?.activities.map((tag, index: number) => {
                  const activityItemLink = getActivityIconLink(
                    tag?.activity_type
                  );
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 md:gap-4  cursor-pointer py-[14px] last-of-type:pb-0"
                      onClick={() => markAsRead(activityItemLink.link, tag.id)}
                    >
                      <div className="flex items-start gap-x-4 w-full">
                        <Image
                          src={activityItemLink.img}
                          alt="activity icon"
                          className="w-10 h-10"
                        />
                        <div className="w-full">
                          <div className="flex gap-x-4 w-full justify-between flex-col md:flex-row flex-wrap lg:flex-nowrap">
                            <span>
                              <p className="text-ellipsis overflow-hidden font-medium text-[#014873]">
                                {tag?.activity_type}
                              </p>
                            </span>
                            <span className="text-[#999999] text-xs flex items-center gap-x-1  whitespace-nowrap self-start">
                              {!tag.is_read && (
                                <div className="w-[5px] h-[5px] rounded-full bg-[#FF1053]" />
                              )}
                              <p className="text-xs text-ellipsis overflow-hidden  text-[#9F9F9F]">
                                {tag?.time_since}
                              </p>
                            </span>
                          </div>
                          <p className="text-[#9F9F9F] text-sm">
                            {tag?.message}
                          </p>
                        </div>
                      </div>
                    </div>
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
