import { urls } from "@/utils/config";
import refreshAdminToken from "@/utils/refreshToken";
// import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import Cookies from "js-cookie";
import { createAxiosInstance } from "@/lib/axios";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface StoreState {
  data: dataProps | null; // Define this more specifically based on your API response
  loading: boolean;
  error: string | null;
  sessionLeft: number | null;
  fetchSession: () => Promise<void>;
}

interface dataProps {
  id: string;
  user: string;
  topic: string;
  note: string;
  preferred_date: string;
  alternative_date: string;
  duration: number;
}
const axios = createAxiosInstance();
function getClosestUpcomingSession(items: dataProps[]): dataProps | null {
  const now = new Date();
  let closestItem: dataProps | null = null;
  let closestTime: number | null = null;

  items.forEach((item) => {
    const preferredDate = new Date(item.preferred_date);
    const alternativeDate = new Date(item.alternative_date);

    [preferredDate, alternativeDate].forEach((date) => {
      const timeDiff = date.getTime() - now.getTime();
      if (timeDiff >= 0 && (closestTime === null || timeDiff < closestTime)) {
        closestTime = timeDiff;
        closestItem = item;
      }
    });
  });
  console.log(closestItem);
  return closestItem;
}

const useFetchStudentSessionStore = create<StoreState>((set, get) => ({
  data: null,
  loading: false,
  error: null,
  sessionLeft: null,

  fetchSession: async () => {
    set({ loading: true, error: null });
    try {
      const accessToken = Cookies.get("authToken");
      const response = await axios.get(urls.getAllSession, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data: dataProps[] = response.data.results;

      const nearestSession = getClosestUpcomingSession(data);
      if (response.status === 200) {
        set({
          data: nearestSession,
          loading: false,
          // sessionLeft: 4 - response?.data?.count,
        });
      }
    } catch (error: any) {
      if (error?.message === "Network Error") {
        toast.error("Check your network!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      }
      set({ error: (error as Error).message, loading: false });
    }
  },
}));

export default useFetchStudentSessionStore;
