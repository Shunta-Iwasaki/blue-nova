import styles from "./index.module.css";
import { CategoryCardType } from "@/app/_types/types";
import CategoryCard from "../CategoryCard";

type Props = {
    categories: CategoryCardType[];
};

export default function CategorySearch({ categories }: Props) {
    return (
        <div className={styles.categorySearch}>
            <h2>カテゴリから探す</h2>
            <p>お好みのジャンルから商品を見つける</p>
            <ul className={styles.list}>
                {categories.map((category) => (
                    <li key={category.id} className={styles.item}>
                        <CategoryCard category={category}></CategoryCard>
                    </li>
                ))}
            </ul>
        </div>
    );
}
