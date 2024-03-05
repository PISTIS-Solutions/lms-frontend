import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "./config";

const refreshAdminToken = async (): Promise<void> => {
  try {
    const tokens = {
      refresh: Cookies.get("refreshToken"),
      access: Cookies.get("authToken"),
    };
    const refreshResponse = await axios.post(
      urls.adminRefreshToken,
      tokens
    );
    Cookies.set("authToken", refreshResponse.data.access);
  } catch (refreshError: any) {
    console.error("Error refreshing token:", refreshError.message);
    Cookies.remove("authToken");
    throw refreshError;
  }
};

export default refreshAdminToken;
