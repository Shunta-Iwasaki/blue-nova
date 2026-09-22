"use client";

import styles from "./index.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../Button";
import { FormInput } from "../FormInput";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { useToast } from "@/contexts/ToastContext";

type LoginModalProps = {
    onClose: () => void;
};

export default function LoginModal({ onClose }: LoginModalProps) {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState("");
    const { showToast } = useToast();

    const handleLogin = async () => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            showToast("ログインに成功しました");
            onClose();
            router.refresh(); // セッション状態をサーバーコンポーネントに反映
        } catch (error) {
            if (error instanceof FirebaseError) {
                setResult(`ログインエラー: ${error.code}`);
            } else {
                setResult("予期しないエラーが発生しました");
            }
        }
    };
    return (
        <div className={styles.loginModal}>
            <h3 className={styles.loginTitle}>ログイン</h3>
            <form>
                <FormInput
                    id="email"
                    label="メールアドレス"
                    value={email}
                    className={styles.loginInput}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="メールアドレスを入力してください。"
                    required
                ></FormInput>
                <FormInput
                    id="password"
                    label="パスワード"
                    type="password"
                    value={password}
                    className={styles.loginInput}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="パスワードを入力してください。"
                    required
                ></FormInput>
                <Button onClick={handleLogin} className={styles.loginButton}>
                    ログイン
                </Button>
                <Link href={`/register`}>
                    <Button className={styles.registButton}>新規登録</Button>
                </Link>
            </form>
            <p className={styles.loginError}>{result}</p>
        </div>
    );
}
