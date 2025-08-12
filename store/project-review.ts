import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "@/utils/config";
import refreshAdminToken from "@/utils/refreshToken";
import { toast } from "react-toastify";

interface pendingGrading {
  projectReview: any;
  loading: boolean;
  fetchProjectReview: () => Promise<void>;
}
const usePendingGradeStore = create<pendingGrading>((set, get) => ({
  projectReview: [],
  loading: false,
  fetchProjectReview: async () => {
    try {
      set({ loading: true });
      const accessToken = Cookies.get("authToken");
      const response = await axios.get(urls.projectReview, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        set({ projectReview: response.data });
        set({ loading: false });
        // console.log(response, "res")
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        const refreshed = await refreshAdminToken();
        if (refreshed) {
          await get().fetchProjectReview;
        }
        return;
      } else if (error.message === "Network Error") {
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
        toast.error(error.response?.data?.detail, {
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

export default usePendingGradeStore;
