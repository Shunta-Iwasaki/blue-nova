import styles from "./index.module.css";
import Image from "next/image";

type Props = {
    progressNum: number;
};

export default function ProgressBar({ progressNum }: Props) {
    const progressText = [
        <p key="cart">
            ショッピング<br className={styles.isSp}></br>カート
        </p>,
        <p key="form">
            お客様情報の<br className={styles.isSp}></br>入力
        </p>,
        <p key="confirm">
            ご注文情報の<br className={styles.isSp}></br>確認
        </p>,
        <p key="thanks">
            <span className={styles.isPc}>　　</span>ご注文完了
            <span className={styles.isPc}>　　</span>
        </p>,
    ];
    return (
        <div className={styles.progressBar}>
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className={styles.progress}>
                    <div
                        className={
                            index + 1 < progressNum
                                ? `${styles.progressBarCircle} ${styles.comp}`
                                : index + 1 === progressNum
                                  ? `${styles.progressBarCircle} ${styles.current}`
                                  : styles.progressBarCircle
                        }
                    >
                        {index + 1 < progressNum ? "" : index + 1}
                    </div>
                    <div
                        className={
                            index + 1 === progressNum
                                ? `${styles.progressBarText} ${styles.current}`
                                : styles.progressBarText
                        }
                    >
                        {progressText[index]}
                    </div>
                </div>
            ))}
        </div>
    );
}
