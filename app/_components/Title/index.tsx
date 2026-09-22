import { TitleType } from "@/app/_types/types";
import styles from "./index.module.css";
import Image from "next/image";

export default function Title({ title, iconUrl, description }: TitleType) {
    return (
        <div className={styles.titleArea}>
            <div className={styles.title}>
                <h2>{title}</h2>
                {iconUrl && (
                    <Image
                        src={iconUrl}
                        alt="アイコン"
                        className={styles.icon}
                        width={48}
                        height={48}
                    />
                )}
            </div>
            {description && <p>{description}</p>}
        </div>
    );
}
