"use client";

import { useState } from "react";
import styles from "./index.module.css";
import Image from "next/image";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

type Props = {
    productId: string;
};

export default function FavoriteButton({ productId }: Props) {
    const { user } = useAuth();
    const router = useRouter();
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorite = isFavorite(productId);
    const [animate, setAnimate] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user) {
            router.push("/member");
            return;
        }
        toggleFavorite(productId);

        // アニメーション発火
        setAnimate(true);
        setTimeout(() => setAnimate(false), 300);
    };

    return (
        <button className={styles.favorite} onClick={handleClick}>
            <Image
                className={animate ? styles.animate : ""}
                src={favorite ? "/icon_heart-on.svg" : "/icon_heart-off.svg"}
                alt=""
                width={20}
                height={20}
            />
        </button>
    );
}
