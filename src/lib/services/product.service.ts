import { db } from "$lib/database/connection";
import {
    products,
    users,
    productVariantChoices,
    productVariants,
} from "$lib/database/schema";
import type { MergeLeft } from "$lib/util/type";
import { eq, ilike } from "drizzle-orm";

export async function getAllDetailedProduct(
    take: number,
    skip: number,
    query: string = "",
) {
    const queryResult = await db
        .select()
        .from(products)
        .where(ilike(products.name, `%${query}%`))
        .leftJoin(users, eq(products.userId, users.id))
        .leftJoin(productVariants, eq(products.id, productVariants.productId))
        .leftJoin(
            productVariantChoices,
            eq(productVariants.id, productVariantChoices.variantId),
        )
        .limit(take)
        .offset(skip);

    const result = queryResult.reduce<
        MergeLeft<
            typeof products.$inferSelect,
            {
                user: typeof users.$inferSelect | null;
                variants: MergeLeft<
                    typeof productVariants.$inferSelect,
                    {
                        choices: (typeof productVariantChoices.$inferSelect)[];
                    }
                >[];
            }
        >[]
    >((left, right) => {
        let product = left.find((x) => x.id === right.products.id);
        if (!product) {
            product = {
                ...right.products,
                user: right.users,
                variants: [],
            };
            left.push(product);
        }
        if (
            right.products_variants !== null &&
            !product.variants.find((x) => x.id === right.products_variants!.id)
        )
            product.variants.push({
                ...right.products_variants,
                choices: [],
            });

        if (right.product_variant_choices !== null) {
            const varId = right.product_variant_choices.variantId;
            const variant = product.variants.find((x) => x.id === varId);
            if (variant) variant.choices.push(right.product_variant_choices);
        }
        return left;
    }, []);

    return result;
}
