// formStore.ts
import { create } from "zustand";

interface FormStore {
  email: string;
  password: string;
  confirm: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  togglePassword: () => void;
  toggleConfirmPassword: () => void;
  setField: (field: string, value: string) => void;
  Fullname: string;
  Phone: string;
  location: string;
  otp: string[];
  //   setField: (field: string, value: string) => void;
  setOtp: (index: number, value: string) => void;
}

const useFormStore = create<FormStore>((set) => ({
  email: "",
  password: "",
  confirm: "",
  showPassword: false,
  showConfirmPassword: false,
  otp: ["", "", "", "", ""],
  Fullname: "",
  location: "",
  Phone: "",
  togglePassword: () => set((state) => ({ showPassword: !state.showPassword })),
  toggleConfirmPassword: () =>
    set((state) => ({ showConfirmPassword: !state.showConfirmPassword })),
  setField: (field, value) => set((state) => ({ [field]: value })),
  setOtp: (index, value) =>
    set((state) => ({
      otp: [...state.otp.slice(0, index), value, ...state.otp.slice(index + 1)],
    })),
}));

export default useFormStore;
