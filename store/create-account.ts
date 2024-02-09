// formStore.ts
import { create } from "zustand";

interface FormStore {
  email: string;
  password: string;
  confirm: string;
  Fullname: string;
  Phone: string;
  location: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  togglePassword: () => void;
  toggleConfirmPassword: () => void;
  setField: (field: string, value: string) => void;
}

const useFormStore = create<FormStore>((set) => ({
  email: "",
  password: "",
  confirm: "",
  Fullname: "",
  Phone: "",
  location: "",
  showPassword: false,
  showConfirmPassword: false,
  togglePassword: () => set((state) => ({ showPassword: !state.showPassword })),
  toggleConfirmPassword: () =>
    set((state) => ({ showConfirmPassword: !state.showConfirmPassword })),
  setField: (field, value) => set((state) => ({ [field]: value })),
}));

export default useFormStore;
