import { getFavoriteGames, getFavoriteGoods } from "@/app/_libs/microcms";

export async function POST(req: Request) {
    const { favorites } = await req.json();

    const [games, goods] = await Promise.all([
        getFavoriteGames(favorites),
        getFavoriteGoods(favorites),
    ]);

    return Response.json({
        games,
        goods,
    });
}
