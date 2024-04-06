// import Image from "next/image";
// import React, { useEffect, useState } from "react";

// import img from "@/public/assets/course/ansible.png";
// import {
//   BookText,
//   Hourglass,
//   Lock,
//   LucideLoader2,
//   LucideLockKeyhole,
//   Trash2,
// } from "lucide-react";
// import axios from "axios";
// import { urls } from "@/utils/config";
// import Cookies from "js-cookie";
// import refreshAdminToken from "@/utils/refreshToken";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// interface cardProps {
//   id: string;
//   // img: any;
//   title: string;
//   paragraph: string;
//   // module: { moduleHeader: string; moduleBody: string }[];
//   duration: number;
//   handleCardClick: any;
//   isEnrolled: any;
//   // handleOpen: () => void;
// }

// const CoursesCard = ({
//   id,
//   // img,
//   title,
//   paragraph,
//   // module,
//   duration,
//   handleCardClick,
//   isEnrolled,
// }: // handleOpen,
// cardProps) => {
//   const [moduleCount, setModuleCount] = useState<number>();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const getModuleCount = async () => {
//       setLoading(true);
//       try {
//         const authToken = Cookies.get("authToken");
//         const response = await axios.get(`${urls.courses}${id}/modules/`, {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         });

//         if (response.status === 200) {
//           // Assuming the modules are an array in the response
//           const count = response.data.length;
//           setModuleCount(count);
//           setLoading(false);
//         } else {
//           console.error(`Error fetching modules for course ${id}`);
//           setModuleCount(0); // or handle the error as needed
//         }
//       } catch (error: any) {
//         if (error.response && error.response.status === 401) {
//           await refreshAdminToken();
//           await getModuleCount();
//         } else if (error?.message === "Network Error") {
//           toast.error("Check your network!", {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: true,
//             closeOnClick: true,
//             pauseOnHover: false,
//             draggable: false,
//             theme: "dark",
//           });
//         } else {
//           toast.error(error?.response?.data?.detail, {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: true,
//             closeOnClick: true,
//             pauseOnHover: false,
//             draggable: false,
//             theme: "dark",
//           });
//         }
//         setModuleCount(0); // or handle the error as needed
//       } finally {
//         setLoading(false);
//       }
//     };

//     getModuleCount();
//   }, []);

//   //enroll
//   const [enrolling, setEnrolling] = useState(false);
//   const handleEnroll = async (id: string) => {
//     setEnrolling(true);

//     try {
//       const authToken = Cookies.get("authToken");
//       const enrollmentEndpoint = `${urls.courses}${id}/enroll/`;

//       const response = await axios.post(enrollmentEndpoint, null, {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${authToken}`,
//         },
//       });

//       if (response.status === 200) {
//         window.location.reload();
//         toast.success(response.data.message, {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: false,
//           draggable: false,
//           theme: "dark",
//         });
//       }
//     } catch (error: any) {
//       if (error.response && error.response.status === 401) {
//         await refreshAdminToken();
//         await handleEnroll(id);
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
//       } else if (
//         error?.response?.data?.message ===
//         "User already enrolled in this course."
//       ) {
//         toast.error(error?.response?.data?.message, {
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
//       setEnrolling(false);
//     }
//   };

//   const plan = Cookies.get("plan");

//   return (
//     <div className="relative">
//       <ToastContainer />
//       <div
//         key={id}
//         // onClick={() => {
//         //   handleCardClick(id);
//         // }}
//         className=" w-full cursor-pointer h-auto shadow-md rounded-[8px] bg-[#FFF]"
//       >
//         <Image
//           src={img}
//           alt="img"
//           priority
//           className="rounded-tr-[4px] w-full rounded-tl-[4px]"
//         />
//         <div className="p-2">
//           <div className="md:mb-14 mb-5">
//             <h1 className="md:text-xl text-sm font-medium">{title}</h1>
//             <p className="md:text-lg text-xs text-[#3E3E3E]">{paragraph}</p>
//           </div>
//           <div className="flex items-center gap-x-4 mt-4">
//             <div className="flex md:text-base text-xs items-center gap-x-1">
//               <BookText className="text-main" />
//               {loading ? (
//                 <>
//                   <LucideLoader2 className="animate-spin" />
//                 </>
//               ) : (
//                 moduleCount
//               )}{" "}
//               module
//             </div>
//             <div className="flex md:text-base text-xs items-center gap-x-1">
//               <Hourglass className="text-main" />
//               {duration}
//             </div>
//           </div>
//           {isEnrolled ? (
//             <button className="w-full text-black py-1 cursor-not-allowed rounded-[4px] border border-sub bg-white hover:text-black text-sm md:text-lg my-2">
//               Enrolled
//             </button>
//           ) : (
//             <button
//               onClick={() => {
//                 handleEnroll(id);
//               }}
//               disabled={enrolling}
//               className="w-full text-black bg-sub py-1 rounded-[4px] cursor-pointer hover:text-black text-sm md:text-lg my-2"
//             >
//               Enroll
//             </button>
//           )}
//         </div>
//       </div>
//       <div
//         // onClick={handleOpen}
//         className="p-2 bg-white cursor-pointer rounded-full w-[35px] h-[35px] flex justify-center items-center absolute top-2 right-2 hover:bg-red-500 duration-150 ease-in-out text-red-500 hover:text-white"
//       >
//         <LucideLockKeyhole className="" />
//       </div>
//     </div>
//   );
// };

// export default CoursesCard;
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import img from "@/public/assets/course/ansible.png";
import {
  BookText,
  Hourglass,
  LucideLoader2,
  LucideLockKeyhole,
} from "lucide-react";
import axios from "axios";
import { urls } from "@/utils/config";
import Cookies from "js-cookie";
import refreshAdminToken from "@/utils/refreshToken";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface cardProps {
  id: string;
  index: number; // Use index instead of id
  title: string;
  paragraph: string;
  duration: number;
  handleCardClick: any;
  isEnrolled: any;
}

const CoursesCard = ({
  id,
  index, // Use index instead of id
  title,
  paragraph,
  duration,
  handleCardClick,
  isEnrolled,
}: cardProps) => {
  const [moduleCount, setModuleCount] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const getModuleCount = async () => {
      setLoading(true);
      try {
        const authToken = Cookies.get("authToken");
        const response = await axios.get(`${urls.courses}${id}/modules/`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.status === 200) {
          setModuleCount(response.data.count);
        } else {
          console.error(`Error fetching modules for course ${index}`);
          setModuleCount(0);
        }
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          await refreshAdminToken();
          await getModuleCount();
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
        setModuleCount(0);
      } finally {
        setLoading(false);
      }
    };

    getModuleCount();
  }, []);

  const plan = Cookies.get("plan");
  const isFreePlan = plan === "Free";

  const isLocked = isFreePlan && index > 2;
  const isEnrollDisabled = isLocked;

  const handleEnroll = async (id: string) => {
    setEnrolling(true);

    try {
      const authToken = Cookies.get("authToken");
      const enrollmentEndpoint = `${urls.courses}${id}/enroll/`;

      const response = await axios.post(enrollmentEndpoint, null, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        window.location.reload();
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await handleEnroll(id);
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
      } else if (
        error?.response?.data?.message ===
        "User already enrolled in this course."
      ) {
        toast.error(error?.response?.data?.message, {
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
      setEnrolling(false);
    }
  };

  return (
    <div className="relative">
      <ToastContainer />
      <div
        aria-disabled={isEnrollDisabled}
        className="w-full cursor-pointer h-auto shadow-md rounded-[8px] bg-[#FFF]"
      >
        <Image
          src={img}
          alt="img"
          priority
          className="rounded-tr-[4px] w-full rounded-tl-[4px]"
        />
        <div className="p-2">
          <div className="md:mb-14 mb-5">
            <h1 className="md:text-xl text-sm font-medium">{title}</h1>
            <p className="md:text-lg text-xs text-[#3E3E3E]">{paragraph}</p>
          </div>
          <div className="flex items-center gap-x-4 mt-4">
            <div className="flex md:text-base text-xs items-center gap-x-1">
              <BookText className="text-main" />
              {loading ? (
                <LucideLoader2 className="animate-spin" />
              ) : (
                moduleCount
              )}{" "}
              module
            </div>
            <div className="flex md:text-base text-xs items-center gap-x-1">
              <Hourglass className="text-main" />
              {duration}
            </div>
          </div>
          <button
            onClick={() => {
              handleEnroll(id);
            }}
            disabled={isEnrollDisabled || isEnrolled}
            className={`w-full text-black py-1 rounded-[4px] ${
              isEnrollDisabled
                ? "cursor-not-allowed border text-white bg-[#DAE0E6]/50 text-sm md:text-lg my-2"
                : isEnrolled
                ? "bg-white cursor-pointer border border-sub hover:text-black text-sm md:text-lg my-2"
                : "bg-sub cursor-pointer hover:text-black text-sm md:text-lg my-2"
            }`}
          >
            {isEnrolled ? "Enrolled" : "Enroll"}
          </button>
        </div>
      </div>
      {isFreePlan && index > 2 && (
        <div className="p-2 bg-white cursor-pointer rounded-full w-[35px] h-[35px] flex justify-center items-center absolute top-2 right-2 hover:bg-red-500 duration-150 ease-in-out text-red-500 hover:text-white">
          <LucideLockKeyhole />
        </div>
      )}
    </div>
  );
};

export default CoursesCard;
