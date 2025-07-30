import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "./config";

const refreshAdminToken = async () => {
  const refresh = Cookies.get("refreshToken");

  if (!refresh) {
    console.warn("No refresh token found");
    return false;
  }

  try {
    const response = await axios.post(
      urls.adminRefreshToken,
      { refresh },
      { headers: { "Content-Type": "application/json" } } 
    );

    if (response.status === 200 || response.status === 201) {
      Cookies.set("authToken", response.data.access, {
        sameSite: "Lax", 
        secure: true,
        path: "/",
      });
      Cookies.set("refreshToken", response.data.refresh, {
        sameSite: "Lax",
        secure: true,
        path: "/",
      });
      return true;
    }

    console.warn("Unexpected status:", response.status);
    return false;
  } catch (err: any) {
    console.error("Refresh token error:", err.response?.data || err.message);
    return false;
  }
};

export default refreshAdminToken;
