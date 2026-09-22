"use client";

import { useState } from "react";
import styles from "./index.module.css";
import { ProductType, ReviewProcType } from "@/app/_types/types";
import Review from "../Review";

type Tab = {
    id: string;
    label: string;
    content: React.ReactNode;
};

type Props = {
    data: ProductType;
    reviews: ReviewProcType[];
};

export default function ProductInfoDetail({ data, reviews }: Props) {
    const [activeTab, setActiveTab] = useState("detail");

    const reviewItems = [];
    for (const review of reviews) {
        reviewItems.push(
            <li key={review.userName} className={styles.reviewItem}>
                <h2>{review.title}</h2>
                <div className={styles.reviewInfo}>
                    <p>投稿者：{review.userName}</p>
                    <Review rate={review.rating} />
                </div>
                <div className={styles.reviewComment}>
                    <p>{review.comment}</p>
                </div>
            </li>,
        );
    }
    const tabs: Tab[] = [
        {
            id: "detail",
            label: "商品説明",
            content: (
                <div>
                    <h3 className={styles.content__title}>ゲーム概要</h3>
                    <p className={styles.content__info}>
                        「{data.name}
                        」は、壮大な世界観と緻密に作り込まれたストーリーが特徴のアクションRPGです。
                        プレイヤーは不思議な力を持つ主人公となり、謎に満ちた異世界を冒険します。
                    </p>
                    <h3 className={styles.content__title}>主な特徴</h3>
                    <p className={styles.content__info}>
                        ・広大なオープンワールドを自由に探索<br></br>
                        ・スリリングなリアルタイムバトルシステム<br></br>
                        ・奥深いキャラクターカスタマイズ<br></br>
                        ・オンラインマルチプレイ対応（最大4人）<br></br>
                        ・4K/60fps対応の美麗なグラフィック
                    </p>
                    <h3 className={styles.content__title}>ストーリー</h3>
                    <p className={styles.content__info}>
                        古代の文明が残した謎の遺跡から発見された「不可思議モビー」。
                        それは世界の運命を変える力を持つと言われている。
                        突如として目覚めた主人公は、記憶を失いながらも、自らの使命を果たすため壮大な冒険に身を投じる。
                        果たして世界の真実とは何なのか。そして主人公の本当の目的とは...
                    </p>
                </div>
            ),
        },
        {
            id: "spec",
            label: "仕様",
            content: (
                <div>
                    <h3 className={styles.content__title}>基本情報</h3>
                    <p className={styles.content__info}>
                        ・タイトル：{data.name}
                        <br></br>
                        ・ジャンル：アクション / アドベンチャー<br></br>
                        ・対応プラットフォーム：PlayStation 5 / Nintendo Switch
                        / PC（Steam）<br></br>
                        ・プレイ人数：1人（オンライン時 最大4人協力プレイ対応）
                        <br></br>
                        ・発売日：2026年3月28日<br></br>
                        ・開発：Nova Interactive<br></br>
                        ・販売：BlueNova Entertainment
                    </p>
                    <h3 className={styles.content__title}>
                        システム要件（PC版）
                    </h3>
                    <p className={styles.content__info}>
                        ・OS：Windows 11 / 10<br></br>
                        ・CPU：Intel Core i5-10400 以上<br></br>
                        ・メモリ：16GB以上<br></br>
                        ・GPU：NVIDIA GeForce RTX 2060 以上<br></br>
                        ・ストレージ：50GB以上（SSD推奨）
                    </p>
                    <h3 className={styles.content__title}>操作・機能</h3>
                    <p className={styles.content__info}>
                        ・オンライン協力プレイ対応<br></br>
                        ・クロスプレイ対応（対応プラットフォーム間）<br></br>
                        ・コントローラー / キーボード操作対応<br></br>
                        ・セーブデータ自動クラウド保存
                    </p>
                </div>
            ),
        },
        {
            id: "review",
            label: "レビュー",
            content:
                reviewItems.length === 0 ? (
                    <p>まだレビューがありません</p>
                ) : (
                    <div className={styles.reviewWrapper}>
                        <h2>レビュー一覧</h2>
                        <ul>{reviewItems}</ul>
                    </div>
                ),
        },
    ];

    return (
        <div className={styles.wrapper}>
            {/* タブボタン */}
            <div className={styles.tabList}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`${styles.tab} ${
                            activeTab === tab.id ? styles.active : ""
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* コンテンツ */}
            <div className={styles.content}>
                {tabs.find((tab) => tab.id === activeTab)?.content}
            </div>
        </div>
    );
}
