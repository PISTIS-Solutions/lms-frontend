// formStore.ts
import { CountryData } from "@/data";
import { create } from "zustand";

interface FormStore {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm: string;
  Fullname: string;
  Phone: string;
  location: string;
  selectedCountry: CountryData;
  showPassword: boolean;
  showConfirmPassword: boolean;
  togglePassword: () => void;
  toggleConfirmPassword: () => void;
  setField: (field: string, value: string | CountryData) => void;
}

const useFormStore = create<FormStore>((set) => ({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirm: "",
  Fullname: "",
  Phone: "",
  location: "",
  selectedCountry: { country: "Nigeria", phoneCode: "+234", phoneLength: 10 },
  showPassword: false,
  showConfirmPassword: false,
  togglePassword: () => set((state) => ({ showPassword: !state.showPassword })),
  toggleConfirmPassword: () =>
    set((state) => ({ showConfirmPassword: !state.showConfirmPassword })),
  setField: (field, value) => set((state) => ({ [field]: value })),
}));

export default useFormStore;
