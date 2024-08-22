import { ToastEnum } from "../enums/toast.enum";

export type ToastProps = {
    id: string;
    message: string;
    type?: ToastEnum;
    duration?: number;
}

export type ToastState = {
    toasts: ToastProps[];
    addToast: (message: string, type?: ToastEnum) => void;
    removeToast: (id: string) => void;
}