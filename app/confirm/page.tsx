"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import ProgressBar from "../_components/ProgressBar";
import { useRouter } from "next/navigation";
import Button from "../_components/Button";
import { useCart } from "@/contexts/CartContext";
import { CustomerFormSchemaType } from "@/app/_schemas/customerForm";

import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

const STORAGE_KEY = "orderForm";

type StoredForm = Omit<CustomerFormSchemaType, "password" | "passwordConfirm">;

const genderLabels: Record<string, string> = {
    male: "男性",
    female: "女性",
    none: "どちらでもない",
    noAnswer: "回答しない",
};

export default function Confirm() {
    const router = useRouter();
    const { user } = useAuth();
    const { cart: carts, clearCart } = useCart();

    const [form, setForm] = useState<StoredForm | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // localStorageから復元
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setForm(JSON.parse(stored));
            } catch {
                // 壊れたデータは無視
            }
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsLoaded(true);
    }, []);

    const registerPurchaseHistory = async () => {
        if (!user) return;
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            purchaseHistory: arrayUnion({
                purchasedAt: new Date().toISOString(),
                items: carts,
            }),
        });
    };

    const handleSubmit = async () => {
        await registerPurchaseHistory();
        localStorage.removeItem(STORAGE_KEY);
        clearCart();
        router.push("/thanks");
    };

    const handleReturn = () => {
        router.push("/form");
    };

    if (!isLoaded) {
        return <p>読み込み中...</p>;
    }

    if (!form) {
        return (
            <div>
                <p>入力情報が見つかりませんでした。</p>
                <Button onClick={handleReturn}>入力画面に戻る</Button>
            </div>
        );
    }

    return (
        <div>
            <ProgressBar progressNum={3}></ProgressBar>
            <div className={styles.wrapper}>
                <h2>以下の内容でよろしいでしょうか？</h2>
                <dl>
                    <div>
                        <dt>お名前</dt>
                        <dd>
                            {form.lastName} {form.firstName}
                        </dd>
                    </div>
                    <div>
                        <dt>フリガナ</dt>
                        <dd>
                            {form.lastNameKana} {form.firstNameKana}
                        </dd>
                    </div>
                    <div>
                        <dt>郵便番号</dt>
                        <dd>{form.postalCode}</dd>
                    </div>
                    <div>
                        <dt>住所</dt>
                        <dd>
                            {form.prefecture} {form.city} {form.address}{" "}
                            {form.building}
                        </dd>
                    </div>
                    <div>
                        <dt>メールアドレス</dt>
                        <dd>{form.email}</dd>
                    </div>
                    <div>
                        <dt>電話番号</dt>
                        <dd>{form.phone}</dd>
                    </div>
                    <div>
                        <dt>生年月日</dt>
                        <dd>
                            {form.birthYear}年{form.birthMonth}月{form.birthDay}
                            日
                        </dd>
                    </div>
                    <div>
                        <dt>性別</dt>
                        <dd>{genderLabels[form.gender]}</dd>
                    </div>
                    <div>
                        <dt>会員登録</dt>
                        <dd>{form.isMember === "yes" ? "する" : "しない"}</dd>
                    </div>
                </dl>
            </div>

            <Button onClick={handleReturn} className={styles.returnButton}>
                注文情報を修正する
            </Button>
            <Button onClick={handleSubmit} className={styles.toProcessButton}>
                上記の内容で注文する
            </Button>
        </div>
    );
}
