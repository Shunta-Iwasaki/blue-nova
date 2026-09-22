"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

import styles from "./index.module.css";
import { InstaType } from "@/app/_types/types";
import InstaCard from "../InstaCard";
import Image from "next/image";

type Props = {
    cards: InstaType[];
};

export default function InstaList({ cards }: Props) {
    return (
        <>
            <div className={styles.title}>
                <Image
                    src="/icon_insta-blue.svg"
                    alt="Instagram"
                    className={styles.logo}
                    width={30}
                    height={30}
                />
                <h3>みんなの投稿を見る</h3>
            </div>
            <div className={styles.list}>
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
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
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 5 },
                    }}
                    // スライド速度
                    speed={800}
                >
                    {cards.map((card) => (
                        <SwiperSlide key={card.id}>
                            <div className={styles.item}>
                                <InstaCard InstaCard={card}></InstaCard>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}
