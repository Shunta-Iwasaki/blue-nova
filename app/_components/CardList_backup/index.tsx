import styles from "./index.module.css";
import { ProductType } from "@/app/_types/types";
import ProductCard from "../ProductCard";

type Props = {
    cards: ProductType[];
};

export default function CardList({ cards }: Props) {
    return (
        <ul className={styles.list}>
            {cards.map((card) => (
                <li key={card.id} className={styles.item}>
                    <ProductCard productCard={card}></ProductCard>
                </li>
            ))}
        </ul>
    );
}
