import styles from "./index.module.css";
import { InstaType } from "@/app/_types/types";
import InstaCard from "../InstaCard";
import Image from "next/image";

type Props = {
    cards: InstaType[];
};

export default function InstaList({ cards }: Props) {
    return (
        <>
            <div className={styles.title}>
                <Image
                    src="/icon_insta-blue.svg"
                    alt="Instagram"
                    className={styles.logo}
                    width={30}
                    height={30}
                />
                <h3>みんなの投稿を見る</h3>
            </div>
            <ul className={styles.list}>
                {cards.map((card) => (
                    <li key={card.id} className={styles.item}>
                        <InstaCard InstaCard={card}></InstaCard>
                    </li>
                ))}
            </ul>
        </>
    );
}
