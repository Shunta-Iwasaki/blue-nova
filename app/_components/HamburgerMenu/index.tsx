"use client";

import { sampleCategories } from "@/app/_data/sample";
import styles from "./index.module.css";
import { useState } from "react";
import CategoryCard from "../CategoryCard";
import SearchField from "../SearchField";
import Link from "next/link";
import Image from "next/image";

export default function HamburgerMenu() {
    const categories = sampleCategories;
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div>
            <button
                className={`${styles.hamburgerButton} ${isOpen ? styles.open : ""}`}
                onClick={toggleMenu}
                aria-label="メニュー"
            >
                <span className={styles.hamburgerLine}></span>
                <span className={styles.hamburgerLine}></span>
                <span className={styles.hamburgerLine}></span>
            </button>
            {isOpen && (
                <div
                    className={styles.hamburgerMenuWrapper}
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className={styles.hamburgerMenu}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <SearchField></SearchField>
                        <ul>
                            <li className={styles.itemNotCate}>
                                <Link href="/search?q=games&display=ゲーム&list=games">
                                    <div className={styles.icon}>
                                        <Image
                                            src={"/icon_game.svg"}
                                            alt="アイコン"
                                            width={48}
                                            height={48}
                                        />
                                    </div>
                                    <div className={styles.text}>
                                        <h3>ゲーム</h3>
                                        <p>ゲームの一覧を確認</p>
                                    </div>
                                </Link>
                            </li>
                            <li
                                className={`${styles.itemNotCate} ${styles.goods}`}
                            >
                                <Link href="/search?q=goods&display=グッズ&list=goods">
                                    <div className={styles.icon}>
                                        <Image
                                            src={"/icon_shop-bag.svg"}
                                            alt="アイコン"
                                            width={48}
                                            height={48}
                                        />
                                    </div>
                                    <div className={styles.text}>
                                        <h3>グッズ</h3>
                                        <p>グッズの一覧を確認</p>
                                    </div>
                                </Link>
                            </li>
                            <div className={styles.categoryTop}>
                                カテゴリーから探す
                            </div>
                            {categories.map((category) => (
                                <li
                                    key={category.id}
                                    className={styles.item}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <CategoryCard
                                        category={category}
                                    ></CategoryCard>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
