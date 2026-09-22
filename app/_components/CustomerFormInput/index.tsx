import styles from "./index.module.css";
import { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    error?: string;
    wrapperClassName?: string;
};

export const CustomerFormInput = forwardRef<HTMLInputElement, InputProps>(
    ({ error, wrapperClassName, className, ...rest }, ref) => {
        return (
            <div className={wrapperClassName}>
                <input ref={ref} className={className} {...rest} />
                {error && <p className={styles.error}>{error}</p>}
            </div>
        );
    },
);

CustomerFormInput.displayName = "CustomerFormInput";
