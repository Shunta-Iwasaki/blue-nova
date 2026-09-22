"use client";

import styles from "./index.module.css";
import Image from "next/image";
import { ProductType } from "@/app/_types/types";
import FavoriteButton from "../FavoriteButton";
import Tag from "../Tag";
import Button from "../Button";
import Review from "../Review";
import type { Swiper as SwiperType } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import { Grid, Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";

import { useCart } from "@/contexts/CartContext";

import { ReviewProcType } from "@/app/_types/types";
import { calcReviewScore } from "@/app/_libs/reviewProcs";

type Props = {
    data: ProductType;
    reviews: ReviewProcType[];
};

export default function ProductFirstView({ data, reviews }: Props) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [modalThumbsSwiper, setModalThumbsSwiper] =
        useState<SwiperType | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };
    const { addCart } = useCart();
    const rating = calcReviewScore(reviews);
    return (
        <div className={styles.firstView}>
            <div className={styles.slideArea}>
                <Swiper
                    modules={[Thumbs, Navigation]}
                    thumbs={{ swiper: thumbsSwiper }}
                    centeredSlides={true}
                    slidesPerView={1}
                    navigation
                    autoHeight={true}
                    className="mainSwiper"
                >
                    <SwiperSlide>
                        <div className={styles.images} onClick={openModal}>
                            <Image
                                src={`/product-img/img_${data.id}.png`}
                                alt={data.name}
                                width={300}
                                height={300}
                                style={{ width: "100%", height: "auto" }}
                            />
                        </div>
                    </SwiperSlide>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <SwiperSlide key={index}>
                            <div className={styles.images} onClick={openModal}>
                                <Image
                                    src={`/product-img/img_general_${index}.png`}
                                    alt={data.name}
                                    width={300}
                                    height={300}
                                    style={{ width: "100%", height: "auto" }}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* サムネイル */}
                <Swiper
                    onSwiper={setThumbsSwiper}
                    slidesPerView={3}
                    modules={[Grid]}
                    grid={{
                        rows: 2,
                        fill: "row",
                    }}
                    spaceBetween={10}
                    watchSlidesProgress
                    className="thumbSwiper"
                >
                    <SwiperSlide>
                        <div className={styles.images}>
                            <Image
                                src={`/product-img/img_${data.id}.png`}
                                alt=""
                                width={200}
                                height={100}
                            />
                        </div>
                    </SwiperSlide>

                    {Array.from({ length: 5 }).map((_, index) => (
                        <SwiperSlide key={index}>
                            <div className={styles.images}>
                                <Image
                                    src={`/product-img/img_general_${index}.png`}
                                    alt=""
                                    width={300}
                                    height={300}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div
                className={`${styles.slideModal} ${isOpen ? styles.slideModalOpen : ""}`}
                onClick={closeModal}
            >
                <div
                    className={styles.slideModalContent}
                    onClick={(event) => event.stopPropagation()}
                >
                    <button
                        type="button"
                        className={styles.closeButton}
                        onClick={closeModal}
                        aria-label="モーダルを閉じる"
                    >
                        ×
                    </button>
                    <Swiper
                        modules={[Thumbs, Navigation]}
                        thumbs={{ swiper: modalThumbsSwiper }}
                        centeredSlides={true}
                        slidesPerView={1}
                        navigation
                        className="modalSwiper"
                    >
                        <SwiperSlide>
                            <div className={styles.images}>
                                <Image
                                    src={`/product-img/img_${data.id}.png`}
                                    alt={data.name}
                                    width={300}
                                    height={300}
                                    style={{ width: "100%", height: "auto" }}
                                />
                            </div>
                        </SwiperSlide>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <SwiperSlide key={index}>
                                <div className={styles.images}>
                                    <Image
                                        src={`/product-img/img_general_${index}.png`}
                                        alt={data.name}
                                        width={300}
                                        height={300}
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                        }}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* サムネイル */}
                    <Swiper
                        onSwiper={setModalThumbsSwiper}
                        slidesPerView={6}
                        spaceBetween={12}
                        watchSlidesProgress
                        className="modalThumbSwiper"
                    >
                        <SwiperSlide>
                            <Image
                                src={`/product-img/img_${data.id}.png`}
                                alt=""
                                width={200}
                                height={100}
                            />
                        </SwiperSlide>

                        {Array.from({ length: 5 }).map((_, index) => (
                            <SwiperSlide key={index}>
                                <Image
                                    src={`/product-img/img_general_${index}.png`}
                                    alt=""
                                    width={300}
                                    height={300}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <div className={styles.info}>
                <div className={styles.info__top}>
                    {data.tag && <Tag text={data.tag}></Tag>}
                    <FavoriteButton productId={data.id}></FavoriteButton>
                </div>
                <h2 className={styles.name}>{data.name}</h2>
                <Review rate={rating} count={reviews.length}></Review>
                <div className={styles.priceArea}>
                    <p className={styles.price}>
                        ¥{data.price.toLocaleString()}
                    </p>
                    {data.originalPrice && (
                        <p className={styles.originalPrice}>
                            ¥{data.originalPrice.toLocaleString()}
                        </p>
                    )}
                </div>
                <p className={styles.description}>{data.description}</p>
                <div className={styles.iconArea}>
                    <div className={styles.iconText}>
                        <Image
                            src={"/icon_truck.svg"}
                            alt={"配送"}
                            width={20}
                            height={20}
                        />
                        通常配送：2〜3営業日
                    </div>
                    <div className={styles.iconText}>
                        <Image
                            src={"/icon_box.svg"}
                            alt={"配送"}
                            width={20}
                            height={20}
                        />
                        5,000円以上で送料無料
                    </div>
                </div>
                <div className={styles.purchaseButton}>
                    <Button
                        onClick={() => addCart(data.id, data.name)}
                        className={styles.cartButton}
                    >
                        カートに追加
                    </Button>
                </div>
                <Button className={styles.purchaseNow}>今すぐ購入</Button>
            </div>
        </div>
    );
}
