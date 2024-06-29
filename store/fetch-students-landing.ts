import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "@/utils/config";
import { toast } from "react-toastify";
import refreshAdminToken from "@/utils/refreshToken";

interface StudentsStore {
  students: any;
  loading: boolean;
  fetchStudents: () => Promise<void>;
}

const useStudentsStore = create<StudentsStore>((set, get) => ({
  students: {},
  loading: false,

  fetchStudents: async () => {
    try {
      set({ loading: true });
      const response = await axios.get(urls.getStudents);
      if (response.status === 200) {
        set({ students: response.data });
        // console.log(response.data, "resdat");
      }
    } catch (error: any) {
      
      toast.error(`Error fetching courses: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
      });
      // if (error.response && error.response.status === 401) {
      //   await refreshAdminToken();
      //   await get().fetchStudents();
      // }
      //   else if (error?.message === "Network Error") {
      //     toast.error("Check your network!", {
      //       position: "top-right",
      //       autoClose: 5000,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: false,
      //       draggable: false,
      //       theme: "dark",
      //     });
      //   } else {
      //     toast.error(error?.response?.data?.detail, {
      //       position: "top-right",
      //       autoClose: 5000,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: false,
      //       draggable: false,
      //       theme: "dark",
      //     });
      //   }
    } finally {
      set({ loading: false });
    }
  },
}));

export default useStudentsStore;
