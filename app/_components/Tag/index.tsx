import styles from "./index.module.css";

export default function Tag({ text }: { text: string }) {
    return <span className={styles.tag}>{text}</span>;
}
