"use client";
import { createAxiosInstance } from "@/lib/axios";
import { urls } from "@/utils/config";
import { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export const useRenewal = () => {
  const axios = createAxiosInstance();
  const [loading, setLoading] = useState(false);

  const handleAutoRenewal = async () => {
    try {
      setLoading(true);
      console.log("clicked");
      const res = await axios.post(`${urls.autoRenewal}`);

      if (res.status === 200) {
        toast.success(res?.data?.datail || "Auto-renew settting updated");
        Cookies.set("auto_renew", res?.data?.auto_renew)
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.detail || "Something went wrong", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleAutoRenewal };
};
