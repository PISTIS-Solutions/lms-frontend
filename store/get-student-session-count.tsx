import { toast } from "react-toastify";
import { create } from "zustand";
import Cookies from "js-cookie";
import { createAxiosInstance } from "@/lib/axios";
import { urls } from "@/utils/config";

interface StoreState {
  loading: boolean;
  error: string | null;
  sessionLeft: number | null;
  fetchSession: () => Promise<void>;
}

const axios = createAxiosInstance();

const useGetStudentSessionCount = create<StoreState>((set) => ({
  loading: false,
  error: null,
  sessionLeft: null,

  fetchSession: async () => {
    set({ loading: true, error: null });
    try {
      const accessToken = Cookies.get("authToken");
      const response = await axios.get(`${urls.getAllSession}get-count/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.status === 200) {
        set({
          loading: false,
          sessionLeft: response.data.remaining_bookings,
        });
      }
    } catch (error: any) {
      if (error?.message === "Network Error") {
        toast.error("Check your network!");
      }
      set({ error: (error as Error).message, loading: false });
    }
  },
}));

export default useGetStudentSessionCount;
