// studentStore.js
import { create } from "zustand";
import Cookies from "js-cookie";
import axios from "axios";
import refreshAdminToken from "@/utils/refreshToken";
import { urls } from "@/utils/config";
import { toast } from "react-toastify";

interface stuData {
  stuData: any;
  enrolled_courses: any;
  loading: boolean;
  fetchStuData: () => Promise<void>;
}

const useStudentDashStore = create<stuData>((set, get) => ({
  stuData: null,
  loading: false,
  enrolled_courses: [],

  fetchStuData: async () => {
    try {
      set({ loading: true });
      const accessToken = Cookies.get("authToken");
      const response = await axios.get(urls.studentDashboard, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response, "studata")
      set({ stuData: response?.data });
      set({ enrolled_courses: response?.data?.courses_enrolled });
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await get().fetchStuData();
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
    } finally {
      set({ loading: false });
    }
  },
}));

export default useStudentDashStore;
