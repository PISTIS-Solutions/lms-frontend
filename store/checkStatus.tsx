import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { urls } from "@/utils/config";
import refreshAdminToken from "@/utils/refreshToken";

interface CheckStatusState {
  current_plan: string | null;
  time_left: string | null;
  loadSub: boolean;
  error: string | null;
  checkStatus: () => Promise<void>;
}

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
        console.log(response.data.current_plan, "Subscription Status");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await useCheckStatusStore.getState().checkStatus();
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
      }
    } finally {
      set({ loadSub: false });
    }
  },
}));

export default useCheckStatusStore;
