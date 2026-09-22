"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./index.module.css";

type Props = {
    trigger: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    menuClassName?: string;
};

export default function Dropdown({
    trigger,
    children,
    className,
    menuClassName,
}: Props) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    // 外クリック・子孫要素クリックで閉じる
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as Node;

            // triggerクリックはトグルに任せる
            if (triggerRef.current?.contains(target)) return;

            // ref.current外 または 子孫要素クリックで閉じる
            if (
                !ref.current?.contains(target) ||
                ref.current?.contains(target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    // ESCで閉じる
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };

        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, []);

    return (
        <div ref={ref} className={className}>
            <div
                className={styles.triggerText}
                ref={triggerRef}
                onClick={() => setOpen((prev) => !prev)}
            >
                {trigger}
            </div>

            {open && <div className={menuClassName}>{children}</div>}
        </div>
    );
}
