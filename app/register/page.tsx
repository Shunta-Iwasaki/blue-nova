"use client";

import styles from "./page.module.css";
import { FormInput } from "../_components/FormInput";
import Button from "../_components/Button";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

export default function Register() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [error, setError] = useState("");
    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                nickname,
                favorites: [],
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });

            router.push("/member");
        } catch (error) {
            if (error instanceof FirebaseError) {
                setError(`認証に失敗しました。`);
            }
        }
    };
    return (
        <div>
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
                <FormInput
                    id="nickname"
                    label="ニックネーム"
                    value={nickname}
                    className={styles.loginInput}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="ニックネームを入力してください。"
                    required
                ></FormInput>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <Button onClick={handleRegister} className={styles.loginButton}>
                    新規登録
                </Button>
            </form>
        </div>
    );
}
