"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { Download, CheckCircle, XCircle } from "lucide-react";
import { baseURL, urls } from "@/utils/config";
import refreshAdminToken from "@/utils/refreshToken";
import SideNav from "@/components/side-comp/side-nav";

const Certificate = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        setStatus("loading");
        const accessToken = Cookies.get("authToken");

        const response = await axios.get(`${baseURL}/students/certificate/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          responseType: "blob",
        });

        const url = window.URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = url;
        link.download = "certificate.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

        setStatus("success");
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          const refreshed = await refreshAdminToken();
          if (refreshed) {
            await fetchCertificate();
          }
          return;
        }

        if (error.response && error.response.data instanceof Blob) {
          try {
            const text = await error.response.data.text();
            const json = JSON.parse(text);
            toast.error(json?.detail || "Something went wrong", {
              position: "top-right",
              theme: "dark",
            });
          } catch {
            toast.error("Something went wrong", {
              position: "top-right",
              theme: "dark",
            });
          }
        } else if (error?.message === "Network Error") {
          toast.error("Check your network!", {
            position: "top-right",
            theme: "dark",
          });
        } else {
          toast.error(error?.response?.data?.detail || "Something went wrong", {
            position: "top-right",
            theme: "dark",
          });
        }

        setStatus("error");
      }
    };

    fetchCertificate();
  }, []);

  return (
    <div className="relative h-screen w-full bg-[#FBFBFB]">
      <SideNav />
      <ToastContainer />

      <div className="lg:ml-64 ml-0 overflow-y-scroll h-screen flex items-center justify-center">
        {status === "loading" && (
          <>
            <Download className="w-16 h-16 text-blue-500 animate-bounce" />
            <p className="mt-4 text-lg font-medium text-gray-700">
              Preparing your certificate...
            </p>
          </>
        )}
        {status === "success" && (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 animate-scale-in" />
            <p className="mt-4 text-lg font-medium text-gray-700">
              Download complete!
            </p>
          </>
        )}
        {status === "error" && (
          <>
            <XCircle className="w-16 h-16 text-red-500 animate-shake" />
            <p className="mt-4 text-lg font-medium text-gray-700">
              Download failed
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Certificate;
