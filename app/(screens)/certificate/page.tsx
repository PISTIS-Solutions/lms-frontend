"use client";
import { useState } from "react";
// import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { Download, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { baseURL } from "@/utils/config";
import refreshAdminToken from "@/utils/refreshToken";
import SideNav from "@/components/side-comp/side-nav";
import { createAxiosInstance } from "@/lib/axios";

const Certificate = () => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const axios = createAxiosInstance();

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
      }
      setStatus("error");
    }
  };

  return (
    <div className="relative h-screen w-full bg-[#FBFBFB]">
      <SideNav />
      <ToastContainer />

      <div className="lg:ml-64 ml-0 overflow-y-scroll h-screen flex flex-col gap-4 items-center justify-center">
        {status === "idle" && (
          <button
            onClick={fetchCertificate}
            className="flex items-center gap-2 px-6 py-3 bg-main hover:bg-main text-white rounded-lg shadow-md transition"
          >
            <Download className="w-5 h-5" />
            Download Certificate
          </button>
        )}

        {status === "loading" && (
          <>
            <Download className="w-16 h-16 text-main animate-bounce" />
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
            <button
              onClick={fetchCertificate}
              className="flex items-center gap-2 px-5 py-2 mt-4 bg-main hover:bg-main text-white rounded-lg"
            >
              <Download className="w-4 h-4" />
              Download Again
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="w-16 h-16 text-red-500 animate-shake" />
            <p className="mt-4 text-lg font-medium text-gray-700">
              Download failed
            </p>
            <button
              onClick={fetchCertificate}
              className="flex items-center gap-2 px-5 py-2 mt-4 bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              <RotateCcw className="w-4 h-4" />
              Retry
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Certificate;
