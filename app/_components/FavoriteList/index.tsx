"use client";

import { useFavorites } from "@/contexts/FavoritesContext";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { ProductType } from "@/app/_types/types";

export default function FavoriteList() {
    const { favorites } = useFavorites();
    const [favoriteGames, setFavoriteGames] = useState<ProductType[]>([]);
    const [favoriteGoods, setFavoriteGoods] = useState<ProductType[]>([]);
    useEffect(() => {
        const fetchFavorites = async () => {
            const res = await fetch("/api/favorites", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ favorites }),
            });

            const data = await res.json();

            setFavoriteGames(data.games);
            setFavoriteGoods(data.goods);
        };
        fetchFavorites();
    }, [favorites]);

    return (
        <ul className={styles.list}>
            {favoriteGames.map((favoriteGame) => (
                <li key={favoriteGame.id} className={styles.item}>
                    <ProductCard productCard={favoriteGame} />
                </li>
            ))}
            {favoriteGoods.map((favoriteGood) => (
                <li key={favoriteGood.id} className={styles.item}>
                    <ProductCard productCard={favoriteGood} />
                </li>
            ))}
        </ul>
    );
}
