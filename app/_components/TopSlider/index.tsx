"use client";

import type { Swiper as SwiperType } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Thumbs, Navigation, Autoplay } from "swiper/modules";
import "swiper/css/navigation";

import styles from "./index.module.css";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { getImageProps } from "next/image";
import type { TopImage } from "@/app/_libs/getTopImages";

type Props = {
    images: TopImage[];
};

// PC/スマホの出し分けを担当するコンポーネント
function SlideImage({ desktop, mobile }: TopImage) {
    const common = { alt: "", sizes: "100vw" };

    const {
        props: { srcSet: desktopSrcSet },
    } = getImageProps({
        ...common,
        width: 1200,
        height: 600,
        src: desktop,
    });

    const {
        props: { srcSet: mobileSrcSet, ...rest },
    } = getImageProps({
        ...common,
        width: 750,
        height: 900,
        src: mobile,
    });

    return (
        <picture>
            <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
            <source media="(max-width: 767px)" srcSet={mobileSrcSet} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                {...rest}
                className={styles.image}
                style={{ width: "100%", height: "auto" }}
            />
        </picture>
    );
}

export default function TopSlider({ images }: Props) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const formatName = (path: string) =>
        path
            .split("/")
            .pop()! // ファイル名だけ取得
            .replace(/^\d{2}_/, "") // 先頭「03_」削除
            .replace(/\.[^/.]+$/, ""); // 拡張子削除
    return (
        <div className={styles.wrapper}>
            <Swiper
                modules={[Thumbs, Navigation, Autoplay]}
                thumbs={{ swiper: thumbsSwiper }}
                centeredSlides={true}
                slidesPerView={1}
                autoHeight={true}
                // ナビゲーション（左右ボタン）
                navigation
                // 自動再生
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                // スライド速度
                speed={800}
                className="mainSwiper"
                breakpoints={{
                    768: { slidesPerView: 1.1 },
                }}
            >
                {images.map((image) => {
                    const name = formatName(image.desktop);
                    return (
                        <SwiperSlide key={image.desktop}>
                            <div className={styles.item}>
                                <Link href={`/products/${name}`}>
                                    <SlideImage {...image} />
                                </Link>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            {/* サムネイル */}
            <Swiper
                onSwiper={setThumbsSwiper}
                slidesPerView={3}
                spaceBetween={10}
                watchSlidesProgress
                className="thumbSwiper"
            >
                {images.map((src) => (
                    <SwiperSlide key={src.desktop}>
                        <Image
                            src={src.desktop}
                            alt=""
                            width={200}
                            height={100}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
