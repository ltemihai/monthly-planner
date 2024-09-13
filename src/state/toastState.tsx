import { create } from "zustand";
import { ToastState } from "../types/toast.types";
import { ToastEnum } from "../enums/toast.enum";



const useToastStore = create<ToastState>((set) => ({
    toasts: [],
    addToast: (message: string, type: ToastEnum = ToastEnum.INFO, duration = 5000) => {
      const id = Date.now().toString();
      set((state) => ({
        ...state,
        toasts: [
            { id, message, type, duration },
        ]
      }));
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        }));
      }, duration);
    },
    removeToast: (id: string) => set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
  }));
  
  export default useToastStore;
