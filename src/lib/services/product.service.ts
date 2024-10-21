import { db } from "$lib/database/connection";
import {
    products,
    users,
    productVariantChoices,
    productVariants,
} from "$lib/database/schema";
import type { MergeLeft } from "$lib/util/type";
import { eq, ilike, or } from "drizzle-orm";

export async function getAllDetailedProduct(
    take: number,
    skip: number,
    query: string = "",
) {
    const queryResult = await db
        .select()
        .from(products)
        .where(
            or(
                ilike(products.name, `%${query}%`),
                query.length ? eq(products.id, query) : undefined,
            ),
        )
        .leftJoin(users, eq(products.userId, users.id))
        .leftJoin(productVariants, eq(products.id, productVariants.productId))
        .leftJoin(
            productVariantChoices,
            eq(productVariants.id, productVariantChoices.variantId),
        )
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

export type IGetDetailedProductResult = Awaited<
    ReturnType<typeof getAllDetailedProduct>
>;

export type INewProducts = {
    name: string;
    description: string;
    price: number;
    variants: {
        name: string;
        description: string;
        choices: { name: string; priceMutation: number }[];
    }[];
};

export async function createProduct(userId: string, data: INewProducts) {
    const id = await db.transaction(async (tx) => {
        const productId = await tx
            .insert(products)
            .values({
                name: data.name,
                description: data.description,
                price: data.price,
                userId,
            })
            .returning({ id: products.id })
            .then(([x]) => x.id);
        for (const variant of data.variants) {
            const variantId = await tx
                .insert(productVariants)
                .values({
                    name: variant.name,
                    description: variant.description,
                    productId,
                })
                .returning({ id: productVariants.id })
                .then(([x]) => x.id);
            await tx.insert(productVariantChoices).values(
                variant.choices.map((x) => ({
                    name: x.name,
                    priceMutation: x.priceMutation,
                    variantId,
                })),
            );
        }
        return productId;
    });
    return getAllDetailedProduct(1, 0, id);
}

export async function deleteProducts(ids: string[]) {
    return db.delete(products).where(or(...ids.map((x) => eq(products.id, x))));
}
export async function getAllProducts() {
    return db
        .select({
            id: products.id,
            name: products.name,
            price: products.price,
            description: products.description,
        })
        .from(products);
}

export type IGetAllProductsResult = Awaited<ReturnType<typeof getAllProducts>>;
