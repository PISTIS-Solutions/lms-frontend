import { create } from "zustand";

import Cookies from "js-cookie";
import { urls } from "@/utils/config";
import axios from "axios";
import refreshAdminToken from "@/utils/refreshToken";

import { toast } from "react-toastify";

interface CourseStore {
  courses: any;
  loading: boolean;
  setCourses: any;
  setLoading: (loading: boolean) => void;
  fetchStuCourses: () => Promise<void>;
}

const useCourseStore = create<CourseStore>((set, get) => ({
  courses: [],
  loading: false,
  setCourses: (courses: any) => set({ courses }),
  setLoading: (loading) => set({ loading }),
  fetchStuCourses: async () => {
    try {
      set({ loading: true });
      const accessToken = Cookies.get("authToken");
      const response = await axios.get(urls.courses, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        set({ courses: response.data, loading: false });
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await get().fetchStuCourses();
      } 
      // else if (error?.message === "Network Error") {
      //   toast.error("Check your network!", {
      //     position: "top-right",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: false,
      //     draggable: false,
      //     theme: "dark",
      //   });
      // } else {
      //   toast.error(error?.response?.data?.detail, {
      //     position: "top-right",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: false,
      //     draggable: false,
      //     theme: "dark",
      //   });
      // }
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCourseStore;
