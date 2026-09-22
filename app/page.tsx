import Link from "next/link";
import CardList from "./_components/CardList";
import CategorySearch from "./_components/CategorySearch";
import InstaList from "./_components/InstaList";
import RecommendList from "./_components/RecommendList";
import Title from "./_components/Title";
import TopSlider from "./_components/TopSlider";
import { sampleCategories } from "./_data/sample";
import { getTopImages } from "./_libs/getTopImages";
import { getGameList, getGoodsList, getInstaList } from "./_libs/microcms";
import styles from "./page.module.css";
import Button from "./_components/Button";

export default async function Home() {
    const gameCards = await getGameList();
    const goodsCards = await getGoodsList();
    const instagrams = await getInstaList();
    const categories = sampleCategories;
    const images = getTopImages();
    return (
        <div className={styles.page}>
            <TopSlider images={images}></TopSlider>
            <div className={styles.wrapper}>
                <Title
                    title="注目のゲーム"
                    iconUrl="/icon_game.svg"
                    description="BlueNovaが贈る、最新タイトルと人気作品"
                ></Title>
                <div className={styles.itemList}>
                    <CardList cards={gameCards.contents}></CardList>
                </div>
                <Link href="/search?q=games&display=すべてのゲーム&list=games">
                    <Button className={styles.toSearchButton}>
                        すべてのゲームを見る
                    </Button>
                </Link>
                <div
                    className={`${styles.itemList} ${styles.itemListRecommend}`}
                >
                    <RecommendList></RecommendList>
                </div>
                <Title
                    title="オフィシャルグッズ"
                    iconUrl="/icon_shop-bag.svg"
                    description="ゲーム関連のグッズを多数販売"
                ></Title>
                <div className={styles.itemList}>
                    <CardList cards={goodsCards.contents}></CardList>
                </div>
                <Link href="/search?q=goods&display=すべてのグッズ&list=goods">
                    <Button className={styles.toSearchButton}>
                        すべてのグッズを見る
                    </Button>
                </Link>
                <InstaList cards={instagrams}></InstaList>
                <div className={styles.categorySearch}>
                    <CategorySearch categories={categories}></CategorySearch>
                </div>
            </div>
        </div>
    );
}
