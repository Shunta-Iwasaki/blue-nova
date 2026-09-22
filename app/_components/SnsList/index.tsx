import styles from "./index.module.css";
import Image from "next/image";
import Link from "next/link";

type Props = {
    style?: React.CSSProperties;
};

export default function SnsList({ style }: Props) {
    return (
        <ul className={styles.iconNavs} style={style}>
            <li className={styles.iconNav}>
                <Link href="/">
                    <Image
                        src="/icon_facebook.svg"
                        alt="facebook"
                        className={styles.logo}
                        width={20}
                        height={20}
                        priority
                    />
                </Link>
            </li>
            <li className={styles.iconNav}>
                <Link href="/">
                    <Image
                        src="/icon_x.svg"
                        alt="X"
                        className={styles.logo}
                        width={20}
                        height={20}
                        priority
                    />
                </Link>
            </li>
            <li className={styles.iconNav}>
                <Link href="/">
                    <Image
                        src="/icon_insta.svg"
                        alt="Instagram"
                        className={styles.logo}
                        width={20}
                        height={20}
                        priority
                    />
                </Link>
            </li>
            <li className={styles.iconNav}>
                <Link href="/">
                    <Image
                        src="/icon_youtube.svg"
                        alt="YouTube"
                        className={`${styles.logo} ${styles.youtube}`}
                        width={20}
                        height={20}
                        priority
                    />
                </Link>
            </li>
        </ul>
    );
}
