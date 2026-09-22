import styles from "./index.module.css";

type Props = {
    htmlFor?: string;
    label: string;
    required?: boolean;
};

export function FieldLabel({ htmlFor, label, required }: Props) {
    return (
        <div className={styles.labelRow}>
            <label htmlFor={htmlFor} className={styles.label}>
                {label}
            </label>
            {required && <span className={styles.required}>必須</span>}
        </div>
    );
}
