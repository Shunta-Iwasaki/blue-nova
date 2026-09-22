"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Button from "../_components/Button";
import Modal from "../_components/Modal";
import LoginModal from "../_components/LoginModal";
import FavoriteList from "../_components/FavoriteList";
import { useFavorites } from "@/contexts/FavoritesContext";
import Link from "next/link";
import Image from "next/image";

type Tab = {
    id: string;
    content: React.ReactNode;
};

type PurchaseItem = {
    productId: string;
    name: string;
    quan: number;
};

type Purchase = {
    purchasedAt: string;
    items: PurchaseItem[];
};

type UserProfile = {
    email: string;
    nickname: string;
    favorites: string[];
};

export default function Member() {
    const { user, loading } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [profileLoading, setProfileLoading] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };

    const [activeTab, setActiveTab] = useState("favorites");

    const [purchaseHistoried, setHistory] = useState<Purchase[]>([]);

    useEffect(() => {
        if (!user) {
            return;
        }

        const userRef = doc(db, "users", user.uid);

        const unsubscribe = onSnapshot(userRef, (docSnap) => {
            setHistory(docSnap.data()?.purchaseHistory || []);
        });

        return () => unsubscribe();
    }, [user]);

    const purchaseHistoryItems = [];
    for (const purchase of purchaseHistoried) {
        const itemElements = [];
        for (const item of purchase.items) {
            const productImage = `/product-img/img_${item.productId}.png`;
            itemElements.push(
                <li key={item.productId} className={styles.purchaseInfo}>
                    <Image
                        src={productImage}
                        alt={""}
                        width={278}
                        height={240}
                    />
                    <div className={styles.purchaseText}>
                        <div className={styles.purchaseTextInfo}>
                            <p className={styles.purchaseName}>{item.name}</p>
                            <p className={styles.purchaseQuan}>
                                ×　{item.quan}
                            </p>
                        </div>
                        <Link href={`/search?q=${item.name}`}>
                            <Button className={styles.toSearchButton}>
                                関連商品を見る
                            </Button>
                        </Link>
                    </div>
                </li>,
            );
        }

        purchaseHistoryItems.push(
            <li key={purchase.purchasedAt} className={styles.purchaseItem}>
                <p className={styles.purchaseDate}>
                    <span>
                        [
                        {new Date(purchase.purchasedAt).toLocaleDateString(
                            "ja-JP",
                        )}
                    </span>
                    のご注文
                    <span>]</span>
                </p>
                <ul>{itemElements}</ul>
            </li>,
        );
    }

    useEffect(() => {
        if (!user) return;

        const fetchProfile = async () => {
            setProfileLoading(true);

            const docSnap = await getDoc(doc(db, "users", user.uid));

            if (docSnap.exists()) {
                setProfile(docSnap.data() as UserProfile);
            }

            setProfileLoading(false);
        };

        fetchProfile();
    }, [user]);

    const { favorites } = useFavorites();

    if (loading || profileLoading) return <p>読み込み中...</p>;
    if (!user)
        return (
            <div className={styles.pageWrapper}>
                <p>ログインしてください</p>

                <Button
                    type="button"
                    onClick={openModal}
                    className={styles.loginButton}
                >
                    ログイン
                </Button>
                <Modal isOpen={isOpen} onClose={closeModal}>
                    <LoginModal onClose={closeModal}></LoginModal>
                </Modal>
            </div>
        );

    const tabs: Tab[] = [
        {
            id: "favorites",
            content: (
                <>
                    <div className={styles.mainAreaHeader}>
                        <h2>お気に入り一覧</h2>
                        <p>{favorites.length}件</p>
                    </div>
                    <FavoriteList></FavoriteList>
                </>
            ),
        },
        {
            id: "purchaseHistory",
            content: (
                <>
                    <div className={styles.mainAreaHeader}>
                        <h2>注文履歴</h2>
                        <p>{purchaseHistoried.length}件</p>
                    </div>
                    <ul className={styles.purchaseList}>
                        {purchaseHistoryItems}
                    </ul>
                </>
            ),
        },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.sideArea}>
                <h2>{profile?.nickname}様のマイページ</h2>
                <h3>会員情報</h3>
                <ul>
                    <li>
                        <Link href="/sorry">お客様情報変更</Link>
                    </li>
                    <li>
                        <button onClick={() => setActiveTab("favorites")}>
                            お気に入り一覧
                        </button>
                    </li>
                </ul>
                <h3>注文情報</h3>
                <ul>
                    <li>
                        <button onClick={() => setActiveTab("purchaseHistory")}>
                            注文履歴
                        </button>
                    </li>
                    <li>
                        <Link href="/sorry">クーポン</Link>
                    </li>
                </ul>
            </div>
            <div className={styles.mainArea}>
                {tabs.find((tab) => tab.id === activeTab)?.content}
            </div>
        </div>
    );
}
