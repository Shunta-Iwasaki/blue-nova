"use client";
import { useCart } from "@/contexts/CartContext";
import styles from "./index.module.css";
import { useEffect, useState } from "react";

type CartItemType = {
    productId: string;
    quan: number;
};

type Props = {
    productId: string;
};

export function QuantitySelect({ productId }: Props) {
    const [quantity, setQuantity] = useState(1);

    const { updateQuan } = useCart();

    useEffect(() => {
        const stored = localStorage.getItem("cart");
        if (stored) {
            try {
                const cart: CartItemType[] = JSON.parse(stored);
                const existing = cart.find(
                    (item) => item.productId === productId,
                );

                if (existing) {
                    // eslint-disable-next-line react-hooks/set-state-in-effect
                    setQuantity(existing.quan);
                }
            } catch {}
        }
    }, [productId]);

    return (
        <select
            name="quantity"
            value={quantity}
            onChange={(e) => {
                setQuantity(Number(e.target.value));
                updateQuan(productId, Number(e.target.value));
            }}
            className={styles.quanSelect}
        >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                    {num}
                </option>
            ))}
        </select>
    );
}
