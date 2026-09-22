import { createClient } from "microcms-js-sdk";
import type {
    MicroCMSQueries,
    MicroCMSImage,
    MicroCMSListContent,
} from "microcms-js-sdk";
import { ReviewProcType } from "../_types/types";

type Product = {
    name: string;
    type: string;
    price: number;
    originalPrice?: number;
    image?: string;
    tag?: string;
    description?: string;
    category?: string;
    game?: Game;
} & MicroCMSListContent;

type Game = {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image?: string;
    tag?: string;
    description?: string;
};

type instagram = {
    slug: string;
    userName: string;
    content: string;
} & MicroCMSListContent;

type review = {
    review: ReviewProcType;
} & MicroCMSListContent;

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
    throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
    throw new Error("MICROCMS_API_KEY is required");
}

const client = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY,
});

export const getGameList = async (queries?: MicroCMSQueries) => {
    const data = await client.getList<Product>({
        endpoint: "games",
        queries,
    });
    return data;
};

export const getGoodsList = async (queries?: MicroCMSQueries) => {
    const data = await client.getList<Product>({
        endpoint: "goods",
        queries,
    });
    return data;
};

export const getFavoriteGames = async (favorites: string[]) => {
    if (favorites.length === 0) {
        return [];
    }

    const filters = favorites.map((id) => `id[equals]${id}`).join("[or]");
    const data = await client.getList<Product>({
        endpoint: "games",
        queries: {
            filters,
        },
    });
    return data.contents;
};

export const getFavoriteGoods = async (favorites: string[]) => {
    if (favorites.length === 0) {
        return [];
    }

    const filters = favorites.map((id) => `id[equals]${id}`).join("[or]");

    const data = await client.getList<Product>({
        endpoint: "goods",
        queries: {
            filters,
        },
    });

    return data.contents;
};

export const getCartsGames = async (carts: string[]) => {
    if (carts.length === 0) {
        return [];
    }

    const filters = carts.map((id) => `id[equals]${id}`).join("[or]");
    const data = await client.getList<Product>({
        endpoint: "games",
        queries: {
            filters,
        },
    });
    return data.contents;
};

export const getCartsGoods = async (carts: string[]) => {
    if (carts.length === 0) {
        return [];
    }

    const filters = carts.map((id) => `id[equals]${id}`).join("[or]");

    const data = await client.getList<Product>({
        endpoint: "goods",
        queries: {
            filters,
        },
    });

    return data.contents;
};

export const getGameDetail = async (contentId: string) => {
    const data = await client.getListDetail<Product>({
        endpoint: "games",
        contentId,
    });
    return data;
};

export const getGoodDetail = async (contentId: string) => {
    const data = await client.getListDetail<Product>({
        endpoint: "goods",
        contentId,
    });
    return data;
};

export const getRelativeList = async (contentId: string) => {
    const data = await client.getList<Product>({
        endpoint: "goods",
        queries: {
            filters: `game[equals]${contentId}`,
        },
    });
    return data.contents;
};

export const getReviewList = async (contentId: string) => {
    const data = await client.getList<ReviewProcType>({
        endpoint: "reviews",
        queries: {
            filters: `product[equals]${contentId}`,
        },
    });
    return data.contents;
};

export const searchProducts = async (keyword: string) => {
    const [games, goods] = await Promise.all([
        client.getList<Product>({
            endpoint: "games",
            queries: {
                filters: `name[contains]${keyword}[or]category[contains]${keyword}`,
            },
            customRequestInit: { next: { revalidate: 60 } },
        }),
        client.getList<Product>({
            endpoint: "goods",
            queries: {
                filters: `name[contains]${keyword}[or]category[contains]${keyword}`,
            },
            customRequestInit: { next: { revalidate: 60 } },
        }),
    ]);
    return {
        contents: [...games.contents, ...goods.contents],
    };
};

type GetInstaListParams = {
    contentId?: string;
    limit?: number;
};

export const getInstaList = async ({
    contentId,
    limit = 10,
}: GetInstaListParams = {}) => {
    const data = await client.getList<instagram>({
        endpoint: "instagrams",
        queries: {
            ...(contentId && {
                filters: `game[equals]${contentId}`,
            }),
            orders: "-createAt",
            limit,
        },
    });

    return data.contents;
};
