"use client";

import { useEffect } from "react";
import styles from "./index.module.css";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);
    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.modal}
                onClick={(event) => event.stopPropagation()}
            >
                <div className={styles.header}>
                    <button
                        type="button"
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="モーダルを閉じる"
                    >
                        ×
                    </button>
                </div>
                <div className={styles.body}>{children}</div>
            </div>
        </div>
    );
}
