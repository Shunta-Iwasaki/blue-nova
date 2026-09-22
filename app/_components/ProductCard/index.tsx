"use client";

import styles from "./index.module.css";
import Image from "next/image";
import { ProductType } from "@/app/_types/types";
import FavoriteButton from "../FavoriteButton";
import Tag from "../Tag";
import Link from "next/link";
import { useState } from "react";

type Props = {
    productCard: ProductType;
};

export default function ProductCard({ productCard }: Props) {
    const [src, setSrc] = useState(`/product-img/img_${productCard.id}.png`);
    return (
        <Link href={`/products/${productCard.id}`}>
            <div className={styles.card}>
                <div className={styles.imageWrapper}>
                    <Image
                        src={src}
                        alt={productCard.name}
                        width={278}
                        height={240}
                        onError={() => setSrc("/no-image.png")}
                    />
                    {productCard.tag && <Tag text={productCard.tag}></Tag>}
                    <FavoriteButton productId={productCard.id}></FavoriteButton>
                </div>
                <div className={styles.textWrapper}>
                    <h3 className={styles.title}>{productCard.name}</h3>
                    {productCard.description && (
                        <p className={styles.description}>
                            {productCard.description}
                        </p>
                    )}

                    <div className={styles.priceArea}>
                        <div className={styles.price}>
                            ¥{productCard.price.toLocaleString()}
                        </div>
                        {productCard.originalPrice && (
                            <div className={styles.originalPrice}>
                                ¥{productCard.originalPrice.toLocaleString()}
                            </div>
                        )}
                    </div>

                    {productCard.rating && (
                        <div className={styles.ratingArea}>
                            <div className={styles.rate}>
                                {productCard.rating.rate}
                            </div>
                            <p className={styles.count}>
                                ({productCard.rating.count})
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
