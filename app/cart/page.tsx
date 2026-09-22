"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { ProductType } from "@/app/_types/types";
import CartCard from "../_components/CartCard";
import ProgressBar from "../_components/ProgressBar";
import { useCart } from "@/contexts/CartContext";
import Button from "../_components/Button";
import Link from "next/link";
import RecommendList from "../_components/RecommendList";
import ImageCard from "../_components/ImageCard";

export default function Cart() {
    const { cart: carts } = useCart();

    const [cartGames, setCartGames] = useState<ProductType[]>([]);
    const [cartGoods, setCartGoods] = useState<ProductType[]>([]);
    useEffect(() => {
        const fetchCarts = async () => {
            const productIds = carts.map((item) => item.productId);
            const res = await fetch("/api/carts", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ carts: productIds }),
            });

            const data = await res.json();

            setCartGames(data.games);
            setCartGoods(data.goods);
        };
        fetchCarts();
    }, [carts]);

    const allProducts = [...cartGames, ...cartGoods];

    const priceAll = allProducts.reduce((sum, item) => {
        const cartItem = carts.find((c) => c.productId === item.id);
        if (!cartItem) return sum;
        return sum + item.price * cartItem.quan;
    }, 0);

    const { addCart, removeCart } = useCart();

    if (allProducts.length == 0) {
        return (
            <div>
                <div className={styles.wrapper}>
                    <h1>カート</h1>
                    <div className={styles.infoArea}>
                        <div
                            className={styles.productArea}
                            style={{ padding: "2rem", fontSize: "1.1rem" }}
                        >
                            カートに商品がありません。
                        </div>
                    </div>
                </div>
                <div className={styles.recommendArea}>
                    <RecommendList></RecommendList>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className={styles.header}>
                <ProgressBar progressNum={1}></ProgressBar>
            </div>
            <div className={styles.wrapper}>
                <h1>カート</h1>
                <div className={styles.infoArea}>
                    <div className={styles.productArea}>
                        {allProducts.map((cartProduct) => (
                            <div
                                key={cartProduct.id}
                                className={styles.cartCard}
                            >
                                <CartCard productCard={cartProduct} />
                            </div>
                        ))}
                    </div>
                    <div className={styles.sideArea}>
                        <div className={styles.totalPrice}>
                            <h3>注文合計金額</h3>
                            <p>
                                <span>{(priceAll + 500).toLocaleString()}</span>
                                円
                            </p>
                        </div>
                        <div className={styles.priceArea}>
                            <p className={styles.price}>
                                商品小計：
                                <span className={styles.priceNum}>
                                    {priceAll.toLocaleString()}
                                </span>
                            </p>
                            <p className={styles.price}>
                                送料：
                                <span className={styles.priceNum}>500</span>
                            </p>
                        </div>

                        <Link href="/form">
                            <Button className={styles.toProcessButton}>
                                注文処理に進む
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            {allProducts.length > 0 && allProducts[0].id !== "deluxe" && (
                <div className={styles.upsellArea}>
                    <h2>
                        <span>{allProducts[0].name}</span>　をご注文のあなたへ！
                    </h2>
                    <div className={styles.upsellCard}>
                        <h3>在庫限り！初回生産限定版はいかがですか？</h3>
                        ※数量限定のため、なくなり次第終了となります
                        <div className={styles.upsellImageArea}>
                            <ImageCard
                                name={allProducts[0].name}
                                src={`/product-img/img_${allProducts[0].id}.png`}
                            ></ImageCard>
                            <ImageCard
                                name={`${allProducts[0].name} サウンドトラック`}
                                src={`/product-img/img_${allProducts[0].id}-soundtrack.png`}
                            ></ImageCard>
                            <ImageCard
                                name={`${allProducts[0].name} 限定盤公式資料`}
                                src={`/product-img/img_brave-action-x-artbook.png`}
                            ></ImageCard>
                        </div>
                        <div className={styles.upsellCardText}>
                            <span>
                                {allProducts[0].name}、{allProducts[0].name}{" "}
                                サウンドトラック、{allProducts[0].name}{" "}
                                限定盤公式資料集
                            </span>
                            がセットになった豪華限定盤！
                        </div>
                        <Button
                            onClick={() => {
                                removeCart(allProducts[0].id);
                                addCart("deluxe", "豪華限定盤");
                            }}
                            className={styles.cartButton}
                        >
                            限定盤にアップデート
                        </Button>
                    </div>
                </div>
            )}
            <div className={styles.recommendArea}>
                <RecommendList></RecommendList>
            </div>
        </div>
    );
}
