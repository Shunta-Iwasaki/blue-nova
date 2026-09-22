import {
    getGameList,
    getGoodsList,
    searchProducts,
} from "@/app/_libs/microcms";
import styles from "./page.module.css";
import ProductCard from "../_components/ProductCard";

type Props = {
    searchParams: {
        q: string;
        display?: string;
        list?: string;
    };
};

export default async function Search({ searchParams }: Props) {
    const { q, display, list } = await searchParams;
    const displayKeyword = display ?? q;
    let data;
    if (list === "games") {
        data = await getGameList().catch(() => null);
    } else if (list === "goods") {
        data = await getGoodsList().catch(() => null);
    } else {
        data = q ? await searchProducts(q).catch(() => null) : null;
    }
    if (!q) return <p>検索キーワードを入力してください</p>;
    if (!data)
        return (
            <div className={styles.wrapper}>
                {q && <h2>「{displayKeyword}」の検索結果</h2>}
                <p>キーワードに一致する商品はありませんでした</p>
            </div>
        );
    return (
        <div className={styles.wrapper}>
            {q && (
                <h2>
                    「<span>{displayKeyword}</span>」の検索結果
                </h2>
            )}
            <p>全{data.contents.length}件の表示結果</p>
            <ul className={styles.list}>
                {data.contents.map((product) => (
                    <li key={product.id} className={styles.item}>
                        <ProductCard productCard={product}></ProductCard>
                    </li>
                ))}
            </ul>
        </div>
    );
}
