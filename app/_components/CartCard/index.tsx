"use client";

import styles from "./index.module.css";
import Image from "next/image";
import { ProductType } from "@/app/_types/types";
import { useState } from "react";
import { QuantitySelect } from "../QuantitySelect";
import { useCart } from "@/contexts/CartContext";
import Button from "../Button";

type Props = {
    productCard: ProductType;
};

export default function CartCard({ productCard }: Props) {
    const [src, setSrc] = useState(`/product-img/img_${productCard.id}.png`);

    const { removeCart } = useCart();
    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={src}
                    alt={productCard.name}
                    width={278}
                    height={240}
                    onError={() => setSrc("/no-image.png")}
                />
            </div>
            <div className={styles.textWrapper}>
                <h3 className={styles.title}>{productCard.name}</h3>
                <div className={styles.priceArea}>
                    <div className={styles.price}>
                        {productCard.price.toLocaleString()}
                    </div>
                </div>
            </div>
            <div className={styles.quan}>
                <QuantitySelect productId={productCard.id}></QuantitySelect>
                <Button
                    onClick={() => {
                        removeCart(productCard.id);
                    }}
                    className={styles.delete}
                >
                    削除
                </Button>
            </div>
        </div>
    );
}
