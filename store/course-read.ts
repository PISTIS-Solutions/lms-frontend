import { create } from "zustand";
// import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "@/utils/config";
import { toast } from "react-toastify";
import refreshAdminToken from "@/utils/refreshToken";
import { createAxiosInstance } from "@/lib/axios";

interface readStudent {
  courseRead: any;
  loading: boolean;
  response: any;
  fetchCourseRead: (id: any) => Promise<void>;
}
const axios = createAxiosInstance();
const useCourseRead = create<readStudent>((set, get) => ({
  courseRead: null,
  loading: false,
  response: null,

  fetchCourseRead: async (id: any) => {
    try {
      set({ loading: true });
      const accessToken = Cookies.get("authToken");
      // const courseID = localStorage.getItem("courseID");
      const response = await axios.get(`${urls.courses}${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response, "course");
      set({ courseRead: response.data });
      set({ response: response.status });
      if (response.status === 200) {
        // router.push(`/courses/modules`);
        set({ loading: false });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.detail, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
      });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCourseRead;
