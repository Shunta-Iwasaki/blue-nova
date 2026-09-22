import styles from "./page.module.css";
import Image from "next/image";

export default function Sorry() {
    return (
        <div>
            <div className={styles.wrapper}>
                <Image
                    src={"/icon_sorry.png"}
                    alt={"sorry"}
                    width={360}
                    height={360}
                    className={styles.sorryIcon}
                />
                <h1>Sorry...</h1>
                <p>ご不便おかけして申し訳ありません。</p>
                <p>今しばらくお待ちください。</p>
            </div>
        </div>
    );
}
