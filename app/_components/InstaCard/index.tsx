"use client";

import styles from "./index.module.css";
import Image from "next/image";
import { InstaType } from "@/app/_types/types";
import { useState } from "react";

type Props = {
    InstaCard: InstaType;
};

export default function InstaCard({ InstaCard }: Props) {
    const [src, setSrc] = useState(`/sns-img/sns_${InstaCard.userName}.png`);
    return (
        <div className={styles.card}>
            <Image
                src={src}
                alt=""
                width={300}
                height={300}
                onError={() => setSrc("/no-image.png")}
            />
            <div className={styles.textWrapper}>
                <h3 className={styles.userName}>{InstaCard.userName}</h3>
                <p className={styles.description}>{InstaCard.content}</p>
            </div>
        </div>
    );
}
