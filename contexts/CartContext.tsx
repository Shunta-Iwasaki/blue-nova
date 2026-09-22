"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "./ToastContext";

type CartItemType = {
    productId: string;
    name: string;
    quan: number;
};

type CartContextType = {
    cart: CartItemType[];
    addCart: (productId: string, name: string, quan?: number) => void;
    removeCart: (productId: string) => void;
    updateQuan: (productId: string, name: string, quan: number) => void;
    clearCart: () => void;
};

const CART_STORAGE_KEY = "cart";

const CartContext = createContext<CartContextType>({
    cart: [],
    addCart: () => {},
    removeCart: () => {},
    updateQuan: () => {},
    clearCart: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItemType[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // 初回読み込み時にlocalStorageから読み込み
    useEffect(() => {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
            try {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setCart(JSON.parse(stored));
            } catch {
                setCart([]);
            }
        }
        setIsLoaded(true);
    }, []);

    // カートが変更されるたびにlocalStorageに保存
    useEffect(() => {
        if (!isLoaded) return;
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }, [cart, isLoaded]);

    const { showToast } = useToast();

    const addCart = (productId: string, name: string, quan = 1) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.productId === productId);
            if (existing) {
                return prev.map((item) =>
                    item.productId === productId
                        ? {
                              ...item,
                              quan: item.quan + quan,
                          }
                        : item,
                );
            }
            return [...prev, { productId, name, quan }];
        });
        showToast("カートに追加しました");
    };

    const removeCart = (productId: string) => {
        setCart((prev) => prev.filter((item) => item.productId !== productId));
        showToast("カートから削除しました");
    };

    const updateQuan = (productId: string, name: string, quan: number) => {
        if (quan <= 0) {
            removeCart(productId);
            return;
        }
        setCart((prev) => {
            const existing = prev.find((item) => item.productId === productId);
            if (existing) {
                return prev.map((item) =>
                    item.productId === productId ? { ...item, quan } : item,
                );
            }
            return [...prev, { productId, name, quan }];
        });
    };

    const clearCart = () => {
        setCart(() => {
            return [];
        });
    };

    return (
        <CartContext.Provider
            value={{ cart, addCart, removeCart, updateQuan, clearCart }}
        >
            {children}{" "}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
