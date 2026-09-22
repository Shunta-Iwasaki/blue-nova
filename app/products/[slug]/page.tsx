import { notFound } from "next/navigation";
import {
    getGameDetail,
    getGoodDetail,
    getInstaList,
    getRelativeList,
    getReviewList,
} from "@/app/_libs/microcms";
import InstaList from "@/app/_components/InstaList";
import CardList from "@/app/_components/CardList";
import ProductFirstView from "@/app/_components/ProductFirstView";
import ProductInfoDetail from "@/app/_components/ProductInfoDetail";
import Title from "@/app/_components/Title";
import styles from "./page.module.css";

type Props = {
    params: {
        slug: string;
    };
};

export default async function Page({ params }: Props) {
    const { slug } = await params;
    let data = null;
    try {
        data = await getGameDetail(slug);
    } catch (e) {
        data = await getGoodDetail(slug);
    }

    const gameId = data?.game?.id;

    if (!data) return notFound();
    const relativeProducts = await getRelativeList(slug);
    const instagrams = await getInstaList({
        contentId: gameId ?? slug,
    });

    if (!data) return notFound();

    const reviews = await getReviewList(slug);
    return (
        <div className={styles.wrapper}>
            <ProductFirstView data={data} reviews={reviews}></ProductFirstView>
            {/* 詳細コンテンツ */}
            <ProductInfoDetail
                data={data}
                reviews={reviews}
            ></ProductInfoDetail>
            {/* 関連商品 */}
            {relativeProducts.length > 0 && (
                <>
                    <Title
                        title="関連商品"
                        iconUrl="/icon_shop-bag.svg"
                    ></Title>
                    <div className={styles.itemList}>
                        <CardList cards={relativeProducts}></CardList>
                    </div>
                </>
            )}
            {/* インスタ投稿 */}
            {instagrams.length > 0 && (
                <InstaList cards={instagrams}></InstaList>
            )}
        </div>
    );
}
