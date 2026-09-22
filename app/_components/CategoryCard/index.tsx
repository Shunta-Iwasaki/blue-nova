import { CategoryCardType } from "@/app/_types/types";
import styles from "./index.module.css";
import Image from "next/image";
import Link from "next/link";

type Props = {
    category: CategoryCardType;
};

export default function CategoryCard({ category }: Props) {
    return (
        <Link
            href={`/search?q=${category.categoryClass}&display=${category.categoryName}`}
            className={styles.card}
        >
            <div className={`${styles.icon} ${styles[category.categoryClass]}`}>
                <Image
                    src={category.iconUrl}
                    alt="アイコン"
                    width={64}
                    height={64}
                />
            </div>
            <div className={styles.text}>
                <h3>{category.categoryName}</h3>
                <p>{category.description}</p>
            </div>
        </Link>
    );
}
