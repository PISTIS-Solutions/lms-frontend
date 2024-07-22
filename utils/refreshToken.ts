import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "./config";

const refreshAdminToken = async (): Promise<void> => {
  try {
    const tokens = {
      refresh: Cookies.get("refreshToken"),
      access: Cookies.get("authToken"),
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
    throw refreshError;
  }
};

export default refreshAdminToken;
