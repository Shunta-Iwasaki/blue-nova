"use client";

import styles from "./index.module.css";
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { ProductType } from "@/app/_types/types";
import { useAuth } from "@/contexts/AuthContext";
import Title from "../Title";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

export default function RecommendList() {
    const { user, loading } = useAuth();
    const [recommendProducts, setRecommendProducts] = useState<ProductType[]>(
        [],
    );
    useEffect(() => {
        const fetchRecommend = async () => {
            const res = await fetch("/api/recommend");
            const data = await res.json();

            setRecommendProducts(data);
        };
        fetchRecommend();
    }, []);

    if (loading) {
        return null;
    }
    if (!user) {
        return null;
    }
    return (
        <>
            <Title
                title="あなたへのおすすめ"
                iconUrl="/icon_heart-on.svg"
                description="あなたの興味から選んだおすすめ商品"
            ></Title>
            <div className={styles.list}>
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={4}
                    loop={true}
                    // ナビゲーション（左右ボタン）
                    navigation
                    breakpoints={{
                        0: { slidesPerView: 2 },
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                    // スライド速度
                    speed={800}
                >
                    {recommendProducts.map((recommendProduct) => (
                        <SwiperSlide key={recommendProduct.id}>
                            <div className={styles.item}>
                                <ProductCard productCard={recommendProduct} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}
