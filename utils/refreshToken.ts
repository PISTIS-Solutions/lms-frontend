"use client"
import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "./config";
import { useRouter } from "next/navigation";

const refreshAdminToken = async (): Promise<void> => {
  const refresh = Cookies.get("refreshToken");
  const access = Cookies.get("authToken");
  const router = useRouter()
  try {
    const tokens = {
      refresh: refresh,
      // access: access,
    };
    const refreshResponse = await axios.post(urls.adminRefreshToken, tokens);
    if (refreshResponse.status === 201) {
      Cookies.set("authToken", refreshResponse.data.access, {
        sameSite: "None",
        secure: true,
      });
      Cookies.set("refreshToken", refreshResponse.data.refresh, {
        sameSite: "None",
        secure: true,
      });
    }
  } catch (refreshError: any) {
    console.error("Error refreshing token:", refreshError.message);
    Cookies.remove("authToken");
    router.replace("/sign-in")

    throw refreshError;
  }
};

export default refreshAdminToken;
