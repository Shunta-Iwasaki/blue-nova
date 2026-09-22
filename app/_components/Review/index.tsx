import styles from "./index.module.css";
import { ReviewType } from "@/app/_types/types";

export default function Review({ rate, count, countText }: ReviewType) {
    const totalStars = 5;
    const ceiledRating = Math.ceil(rate * 2) / 2;
    const fullStars = Math.floor(ceiledRating);
    const hasHalfStar = ceiledRating % 1 >= 0.5;
    const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className={styles.stars}>
            {Array.from({ length: fullStars }).map((_, i) => (
                <span
                    key={`full-${i}`}
                    className={`${styles.star} ${styles.full}`}
                >
                    ★
                </span>
            ))}

            {hasHalfStar && (
                <span className={`${styles.star} ${styles.half}`}>★</span>
            )}

            {Array.from({ length: emptyStars }).map((_, i) => (
                <span
                    key={`empty-${i}`}
                    className={`${styles.star} ${styles.empty}`}
                >
                    ★
                </span>
            ))}
            {count && (
                <p className={styles.count}>
                    ({count}
                    {countText && countText})
                </p>
            )}
        </div>
    );
}
