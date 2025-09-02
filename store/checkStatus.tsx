import { create } from "zustand";
// import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { urls } from "@/utils/config";
import refreshAdminToken from "@/utils/refreshToken";
import { createAxiosInstance } from "@/lib/axios";

interface CheckStatusState {
  current_plan: string | null;
  time_left: string | null;
  loadSub: boolean;
  error: string | null;
  checkStatus: () => Promise<void>;
}
const axios = createAxiosInstance();
const useCheckStatusStore = create<CheckStatusState>((set) => ({
  current_plan: null,
  time_left: null,
  loadSub: false,
  error: null,

  checkStatus: async () => {
    set({ loadSub: true, error: null, current_plan: null, time_left: null });
    try {
      const accessToken = Cookies.get("authToken");
      const response = await axios.get(urls.subStatus, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        set({
          current_plan: response.data.current_plan,
          time_left: response.data.time_left,
          loadSub: false,
          error: null,
        });
      }
    } catch (error: any) {
      set({ error: error?.response?.data?.detail || "An error occurred" });
      toast.error(error?.response?.data?.detail, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
      });
    } finally {
      set({ loadSub: false });
    }
  },
}));

export default useCheckStatusStore;
