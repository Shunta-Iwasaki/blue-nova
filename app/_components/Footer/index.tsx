import Link from "next/link";
import styles from "./index.module.css";
import Image from "next/image";
import SnsList from "../SnsList";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <nav className={styles.navArea}>
                <ul className={styles.items}>
                    <li className={styles.logoArea}>
                        <Link href="/" className={styles.logoLink}>
                            <Image
                                src="/logo-white.png"
                                alt="BlueNova"
                                className={styles.logo}
                                width={348}
                                height={133}
                                priority
                            />
                        </Link>
                        <SnsList></SnsList>
                    </li>
                    <li className={styles.item}>
                        <h4>製品</h4>
                        <ul>
                            <li>
                                <Link href="/search?q=games&display=ゲーム&list=games">
                                    ゲーム
                                </Link>
                            </li>
                            <li>
                                <Link href="/search?q=games&display=グッズ&list=goods">
                                    オフィシャルグッズ
                                </Link>
                            </li>
                            <li>
                                <Link href="/sorry">コラボレーション</Link>
                            </li>
                        </ul>
                    </li>
                    <li className={styles.item}>
                        <h4>サポート</h4>
                        <ul>
                            <li>
                                <Link href="/sorry">お問い合わせ</Link>
                            </li>
                            <li>
                                <Link href="/sorry">配送について</Link>
                            </li>
                            <li>
                                <Link href="/sorry">よくある質問</Link>
                            </li>
                        </ul>
                    </li>
                    <li className={styles.item}>
                        <h4>会社情報</h4>
                        <ul>
                            <li>
                                <Link href="/sorry">会社概要</Link>
                            </li>
                            <li>
                                <Link href="/sorry">プライバシーポリシー</Link>
                            </li>
                            <li>
                                <Link href="/sorry">利用規約</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <p className={styles.cr}>@ BlueNova. All Rights Reserved 2026</p>
        </footer>
    );
}
