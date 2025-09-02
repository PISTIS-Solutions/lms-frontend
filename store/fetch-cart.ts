import { create } from "zustand";

import Cookies from "js-cookie";
import { baseURL, urls } from "@/utils/config";
// import axios from "axios";
import refreshAdminToken from "@/utils/refreshToken";

import { toast } from "react-toastify";
import { createAxiosInstance } from "@/lib/axios";

interface CartStore {
  cart: any;
  loading: boolean;
  setCart: any;
  setLoading: (loading: boolean) => void;
  fetchCart: (id: any) => Promise<void>;
}
const axios = createAxiosInstance();
const useCartStore = create<CartStore>((set, get) => ({
  cart: {},
  loading: false,
  setCart: (cart: any) => set({ cart }),
  setLoading: (loading) => set({ loading }),
  fetchCart: async (id) => {
    try {
      set({ loading: true });
      const response = await axios.get(`${baseURL}/cart/${id}/items/`);
      if (response.status === 200) {
        console.log(response.data, "response");
        set({ cart: response.data, loading: false });
      }
    } catch (error: any) {
      
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

export default useCartStore;
