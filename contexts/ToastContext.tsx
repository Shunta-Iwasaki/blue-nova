"use client";
import { createContext, useContext, useState } from "react";
import styles from "./Toast.module.css";

type ToastContextType = {
    showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [message, setMessage] = useState<string | null>(null);

    const showToast = (text: string) => {
        setMessage(text);
        setTimeout(() => setMessage(null), 2000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {message && <div className={styles.toast}>{message}</div>}
        </ToastContext.Provider>
    );
}

export const useToast = () => useContext(ToastContext);
