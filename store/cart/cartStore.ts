import { create } from "zustand";
import { persist } from "zustand/middleware";

type CourseData = {
  id: string;
  title: string;
  price: string;
  module_count: number;
  course_duration: string;
};

type CartStore = {
  selectedCourses: CourseData[];
  addCourse: (course: CourseData) => void;
  removeCourse: (id: string) => void;
  toggleCourse: (course: CourseData) => void;
  clearCart: () => void;
};

export const useCartStoreInitial = create<CartStore>()(
  persist(
    (set, get) => ({
      selectedCourses: [],

      addCourse: (course) =>
        set((state) =>
          state.selectedCourses.some((c) => c.id === course.id)
            ? state
            : { selectedCourses: [...state.selectedCourses, course] }
        ),

      removeCourse: (id) =>
        set((state) => ({
          selectedCourses: state.selectedCourses.filter(
            (course) => course.id !== id
          ),
        })),

      toggleCourse: (course) => {
        const { selectedCourses } = get();
        const exists = selectedCourses.some((c) => c.id === course.id);
        set({
          selectedCourses: exists
            ? selectedCourses.filter((c) => c.id !== course.id)
            : [...selectedCourses, course],
        });
      },

      clearCart: () => set({ selectedCourses: [] }),
    }),
    {
      name: "cart-storage",
      storage: {
        getItem: (name) => {
          const item = sessionStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
      // ✅ Tell TS this is a valid CartStore shape
      partialize: (state): CartStore => ({
        selectedCourses: state.selectedCourses,
        addCourse: () => {},
        removeCourse: () => {},
        toggleCourse: () => {},
        clearCart: () => {},
      }),
    }
  )
);
