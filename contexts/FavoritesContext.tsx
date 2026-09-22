"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
    doc,
    onSnapshot,
    updateDoc,
    arrayUnion,
    arrayRemove,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "./ToastContext";

type FavoritesContextType = {
    favorites: string[];
    toggleFavorite: (productId: string) => Promise<void>;
    isFavorite: (productId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType>({
    favorites: [],
    toggleFavorite: async () => {},
    isFavorite: () => false,
});

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        if (!user) {
            return;
        }

        const userRef = doc(db, "users", user.uid);

        const unsubscribe = onSnapshot(userRef, (docSnap) => {
            setFavorites(docSnap.data()?.favorites || []);
        });

        return () => unsubscribe();
    }, [user]);

    const toggleFavorite = async (productId: string) => {
        if (!user) return;
        const userRef = doc(db, "users", user.uid);
        if (favorites.includes(productId)) {
            await updateDoc(userRef, { favorites: arrayRemove(productId) });
            showToast("お気に入りから削除しました");
        } else {
            await updateDoc(userRef, { favorites: arrayUnion(productId) });
            showToast("お気に入り登録しました");
        }
    };

    const { showToast } = useToast();

    const isFavorite = (productId: string) => favorites.includes(productId);

    const value = {
        favorites: user ? favorites : [],
        toggleFavorite,
        isFavorite,
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}

export const useFavorites = () => useContext(FavoritesContext);
