import styles from "./page.module.css";
import SnsList from "../_components/SnsList";
import ProgressBar from "../_components/ProgressBar";
import Image from "next/image";

export default function Thanks() {
    return (
        <div>
            <ProgressBar progressNum={4}></ProgressBar>
            <div className={styles.wrapper}>
                <Image
                    src={"/icon_thanks.png"}
                    alt={"Thank You!"}
                    width={240}
                    height={240}
                    className={styles.thanksIcon}
                />
                <h1>Thank You !!</h1>
                <p>商品のご購入ありがとうございます。</p>
                <p>商品到着までしばらくお待ちください。</p>
            </div>
            <div className={styles.snsArea}>
                <h3>最新情報を公式SNSで公開中！</h3>
                <p>フォローして最新情報をチェックしてください。</p>
                <SnsList style={{ margin: "2rem auto 0.5rem" }}></SnsList>
            </div>
        </div>
    );
}
