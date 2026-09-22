import { getCartsGames, getCartsGoods } from "@/app/_libs/microcms";

export async function POST(req: Request) {
    const { carts } = await req.json();

    const [games, goods] = await Promise.all([
        getCartsGames(carts),
        getCartsGoods(carts),
    ]);

    return Response.json({
        games,
        goods,
    });
}
