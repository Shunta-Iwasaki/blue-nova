"use cliant";

import { useState } from "react";
import styles from "./index.module.css";
import Image from "next/image";

type Props = {
    name: string;
    src: string;
};

export default function ImageCard({ name, src }: Props) {
    const [srcProc, setSrc] = useState(src);
    return (
        <div className={styles.upsellImageCard}>
            <p>{name}</p>
            <Image
                src={srcProc}
                alt={""}
                width={278}
                height={140}
                onError={() => setSrc("/no-image.png")}
            />
        </div>
    );
}
