"use client";

import Link from "next/link";
import styles from "./index.module.css";
import Image from "next/image";
import SearchField from "../SearchField";
import Dropdown from "../Dropdown";
import { sampleCategories } from "@/app/_data/sample";
import { useState } from "react";
import Modal from "../Modal";
import LoginModal from "../LoginModal";
import Button from "../Button";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import HamburgerMenu from "../HamburgerMenu";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";

export default function Header() {
    const categories = sampleCategories;
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };
    const { user } = useAuth();
    const { showToast } = useToast();
    const handleLogout = async () => {
        try {
            await signOut(auth);
            showToast("ログアウトしました");
        } catch (error) {
            console.error(error);
        }
    };
    const { cart: carts } = useCart();
    return (
        <header className={styles.header}>
            <Link href="/" className={styles.logoLink}>
                <Image
                    src="/logo.png"
                    alt="BlueNova"
                    className={styles.logo}
                    width={348}
                    height={133}
                    priority
                />
            </Link>
            <ul className={styles.items}>
                <li className={styles.item}>
                    <Link href="/search?q=games&display=ゲーム&list=games">
                        ゲーム
                    </Link>
                </li>
                <li className={styles.item}>
                    <Link href="/search?q=goods&display=グッズ&list=goods">
                        グッズ
                    </Link>
                </li>
                <li className={`${styles.item} ${styles.item__category}`}>
                    <Dropdown
                        trigger={"カテゴリー"}
                        className={styles.wrapper}
                        menuClassName={styles.menu}
                    >
                        <ul className={styles.dropItems}>
                            {categories.map((category) => (
                                <li
                                    key={category.id}
                                    className={styles.dropItem}
                                >
                                    <div
                                        className={`${category.categoryClass}`}
                                    >
                                        <Image
                                            src={`/${category.iconUrl}`}
                                            alt="アイコン"
                                            width={32}
                                            height={32}
                                        />
                                    </div>
                                    <Link
                                        href={`/search?q=${category.categoryClass}&display=${category.categoryName}`}
                                    >
                                        {category.categoryName}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Dropdown>
                </li>
            </ul>
            <div className={styles.SearchField}>
                <SearchField></SearchField>
            </div>
            <div className={styles.icons}>
                {user ? (
                    <Button
                        className={styles.rogButton}
                        type="button"
                        onClick={handleLogout}
                    >
                        ログアウト
                    </Button>
                ) : (
                    <Button
                        className={styles.rogButton}
                        type="button"
                        onClick={openModal}
                    >
                        ログイン
                    </Button>
                )}
                <Link href="/member">
                    <Image
                        src="/icon_user.svg"
                        alt="アカウント情報"
                        className={styles.logo}
                        width={32}
                        height={32}
                        priority
                    />
                </Link>
                <Modal isOpen={isOpen} onClose={closeModal}>
                    <LoginModal onClose={closeModal}></LoginModal>
                </Modal>
                <div className={styles.cart}>
                    <Link href="/cart">
                        <Image
                            src="/icon_cart.svg"
                            alt="カート"
                            className={styles.logo}
                            width={32}
                            height={32}
                            priority
                        />
                    </Link>
                    {carts.length >= 1 && (
                        <span className={styles.cartNum}>{carts.length}</span>
                    )}
                </div>
                <div className={styles.hamburgerMenu}>
                    <HamburgerMenu></HamburgerMenu>
                </div>
            </div>
        </header>
    );
}
