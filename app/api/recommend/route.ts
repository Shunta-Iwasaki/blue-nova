import { getGameList, getGoodsList } from "@/app/_libs/microcms";
import { NextResponse } from "next/server";

export async function GET() {
    const recommendGames = await getGameList();
    const recommendGoods = await getGoodsList();

    const products = [...recommendGames.contents, ...recommendGoods.contents];
    const recommendProducts = products
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);

    return NextResponse.json(recommendProducts);
}
