"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

import styles from "./index.module.css";
import { ProductType } from "@/app/_types/types";
import ProductCard from "../ProductCard";

type Props = {
    cards: ProductType[];
};

export default function CardList({ cards }: Props) {
    return (
        <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={4}
            loop={true}
            // ナビゲーション（左右ボタン）
            navigation
            // 自動再生
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            breakpoints={{
                0: { slidesPerView: 2 },
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
            }}
            // スライド速度
            speed={800}
        >
            {cards.map((card) => (
                <SwiperSlide key={card.id}>
                    <div className={styles.item}>
                        <ProductCard productCard={card} />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
