import { waiting } from "$lib/util/promises";
import type { IGetDetailedProductResult } from "$lib/services/product.service";
import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ({ params: { productId }, fetch }) => {
    const [err, result] = await waiting(
        (await fetch("/api/products?query=" + productId)).json() as Promise<{
            success: boolean;
            result: IGetDetailedProductResult;
        }>,
    );

    if (err !== null || !result || !result?.success || !result.result.length) {
        return error(404, "Product not found");
    }

    return result.result[0];
};
