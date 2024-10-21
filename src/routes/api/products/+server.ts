import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import {
    createProduct,
    deleteProducts,
    getAllDetailedProduct,
    getAllProducts,
} from "$lib/services/product.service";

export const GET: RequestHandler = async ({ url }) => {
    const simple = url.searchParams.get("simple") ?? true;
    const query = url.searchParams.get("query") ?? "";
    if (simple)
        return json({
            success: true,
            result: await getAllProducts(),
        });

    return json({
        success: true,
        result: await getAllDetailedProduct(10, 0, query),
    });
};

export const POST: RequestHandler = async ({ url, request }) => {
    const userId = url.searchParams.get("userId");
    const bodyJson = await request.json();
    if (!userId)
        return json({ success: false, error: 400, message: "No user" });
    return json({
        success: true,
        result: await createProduct(userId, bodyJson),
    });
};

export const DELETE: RequestHandler = async ({ request }) => {
    const body = await request.json();
    return json({
        success: true,
        result: await deleteProducts(body),
    });
};
