"use client";

import styles from "./page.module.css";
import ProgressBar from "../_components/ProgressBar";
import { CustomerInfoForm } from "../_components/CustomerInfoForm";

export default function form() {
    return (
        <div>
            <div className={styles.header}>
                <ProgressBar progressNum={2}></ProgressBar>
            </div>
            <CustomerInfoForm></CustomerInfoForm>
        </div>
    );
}
