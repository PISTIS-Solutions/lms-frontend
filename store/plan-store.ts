import { create } from "zustand";
import Cookies from "js-cookie";
import axios from "axios";
import { urls } from "@/utils/config";
import refreshAdminToken from "@/utils/refreshToken";
import { toast } from "react-toastify";

interface Plan {
  id: string;
  name: string;
  plan_type: string;
  amount: string;
  interval: number;
}

interface PlanStore {
  plans: Plan[];
  selectedPlanId: string | null;
  setPlans: (plans: Plan[]) => void;
  selectPlan: (id: string) => void;
  clearPlanSelection: () => void;
  isLoading: boolean;
  fetchPlans: () => Promise<void>;
}

export const usePlanStore = create<PlanStore>((set, get) => ({
  plans: [],
  selectedPlanId: null,
  isLoading: false,
  setPlans: (plans) => set({ plans }),
  selectPlan: (id) => set({ selectedPlanId: id }),
  clearPlanSelection: () => set({ selectedPlanId: null }),
  fetchPlans: async () => {
    try {
      set({ isLoading: true });
      const accessToken = Cookies.get("authToken");
      // const courseID = localStorage.getItem("courseID");
      const response = await axios.get(urls.plans);

      set({ plans: response.data });
      console.log(response, "plans response");
      if (response.status === 200) {
        set({ isLoading: false });
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await get().fetchPlans();
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
      set({ isLoading: false });
    }
  },
}));
