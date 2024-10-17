import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getAllDetailedProduct } from "$lib/services/product.service";

export const GET: RequestHandler = async ({ url }) => {
    const query = url.searchParams.get("query") ?? "";
    return json({
        success: true,
        result: await getAllDetailedProduct(10, 0, query),
    });
};
