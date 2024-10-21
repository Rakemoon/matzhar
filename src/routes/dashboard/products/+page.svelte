<script lang="ts">
    import IconPlus from "~icons/ion/plus";
    import SearchIcon from "~icons/ion/search";
    import IconCopy from "~icons/ion/copy";
    import IconEllipsisHorizontal from "~icons/ion/ellipsis-horizontal";
    import IconPriceTag from "~icons/ion/pricetag";
    import IconClose from "~icons/ion/close";
    import IconEye from "~icons/ion/eye";
    import IconPencil from "~icons/ion/pencil";
    import { pushToast } from "$lib/states/toast";
    import type { IGetDetailedProductResult } from "$lib/services/product.service";
    import { currencyFormat } from "$lib/util/string";
    import { json } from "@sveltejs/kit";

    let newProduct = $state({
        name: "",
        price: 0,
        description: "",
        variants: [] as {
            name: string;
            description: string;
            choices: { name: string; priceMutation: number }[];
        }[],
    });

    type Product = IGetDetailedProductResult[number] & { checked: boolean };

    let products = $state<Product[]>([] as never);
    let isProductsRetrieved = $state(false);

    let isAllChecked = $derived(
        products.every((x) => x.checked === true) && products.length > 0,
    );

    let isOneOfProductChecked = $derived(
        products.some((x) => x.checked === true),
    );

    async function retrieveProducts() {
        const { success, result }: { success: boolean; result: Product[] } =
            await fetch("/api/products").then((x) => x.json());
        if (!success) {
            pushToast("Failed to retrieve products", "error");
        }
        products.push(...result);
    }

    async function onSubmitNewProduct() {
        pushToast("Creating product...", "info");
        const { success, result }: { success: boolean; result: Product[] } =
            await fetch(
                "/api/products?userId=5aef7f93-bfe9-4066-b553-f5241a8962a6",
                {
                    method: "POST",
                    body: JSON.stringify(newProduct),
                },
            ).then((x) => x.json());
        if (success) {
            newProduct = { name: "", price: 0, description: "", variants: [] };
            products.unshift(...result);
            pushToast("Product created!", "success");
        } else {
            pushToast("Failed to create product!", "error");
        }
    }

    async function deleteMany() {
        const checkedProductsId: string[] = [];
        for (const product of products)
            if (product.checked) checkedProductsId.push(product.id);
        pushToast("Deleting products...", "info");
        const { success } = await fetch("/api/products", {
            method: "DELETE",
            body: JSON.stringify(checkedProductsId),
        }).then((x) => x.json());

        if (success) {
            products = products.filter(
                (x) => !checkedProductsId.includes(x.id),
            );
            pushToast("Products deleted!", "success");
        } else {
            pushToast("Failed to delete products!", "error");
        }
    }

    async function deleteProduct(id: string) {
        pushToast("Deleting product...", "info");
        const { success } = await fetch(`/api/products`, {
            method: "DELETE",
            body: JSON.stringify([id]),
        }).then((x) => x.json());
        if (success) {
            products = products.filter((x) => x.id !== id);
            pushToast("Product deleted!", "success");
        } else {
            pushToast("Failed to delete product!", "error");
        }
    }

    $effect(() => {
        retrieveProducts().then(() => (isProductsRetrieved = true));
    });
</script>

<div
    class="p-2.5 flex gap-2.5 w-full items-center max-md:flex-col max-md:items-start"
>
    <IconCopy />
    <span class="text-xl font-bold flex-grow">Products</span>
    <label class="btn btn-primary" for="create-products-check">
        <IconPlus /> Add New</label
    >
    <label class="input input-bordered inline-flex items-center">
        <input type="text" class="block" placeholder="Search" />
        <SearchIcon />
    </label>
</div>
<div class="collapse px-2.5 pb-2.5">
    <input type="checkbox" id="create-products-check" hidden />
    <div class="collapse-content p-[0_!important]">
        <form class="flex flex-col gap-2.5 p-2.5" onsubmit={onSubmitNewProduct}>
            <div class="inline-flex justify-between gap-2.5">
                <label
                    class="input input-bordered inline-flex items-center grow"
                >
                    <input
                        type="text"
                        placeholder="Name"
                        class="w-full"
                        bind:value={newProduct.name}
                    />
                    <IconEllipsisHorizontal />
                </label>
                <label
                    class="input input-bordered inline-flex items-center grow"
                >
                    <input
                        type="number"
                        placeholder="Price"
                        class="w-full"
                        bind:value={newProduct.price}
                    />
                    <IconPriceTag />
                </label>
            </div>
            <textarea
                class="textarea textarea-bordered"
                placeholder="Description"
                bind:value={newProduct.description}
            ></textarea>

            <button
                class="btn btn-primary btn-sm"
                form="_"
                onclick={() => {
                    newProduct.variants.push({
                        name: "",
                        description: "",
                        choices: [],
                    });
                }}
            >
                <IconPlus />Add Variant</button
            >
            {#each newProduct.variants as variant, index (variant)}
                <div class="flex justify-between gap-2.5">
                    <label
                        class="input input-bordered inline-flex items-center grow input-sm"
                    >
                        <input
                            type="text"
                            placeholder="Name"
                            class="w-full"
                            bind:value={variant.name}
                        />
                        <IconEllipsisHorizontal />
                    </label>
                    <label
                        class="input input-bordered inline-flex items-center grow input-sm"
                    >
                        <input
                            type="text"
                            placeholder="Summary"
                            class="w-full"
                            bind:value={variant.description}
                        />
                        <IconEllipsisHorizontal />
                    </label>
                    <button
                        class="btn btn-secondary btn-sm"
                        form="_"
                        onclick={() => {
                            newProduct.variants.splice(index, 1);
                        }}
                    >
                        <IconClose /></button
                    >
                    <button
                        class="btn btn-accent btn-sm"
                        form="_"
                        onclick={() => {
                            variant.choices.push({
                                name: "",
                                priceMutation: 0,
                            });
                        }}
                    >
                        <IconPlus /></button
                    >
                </div>
                {#each variant.choices as choice, indexChoice (choice)}
                    <div class="flex justify-between gap-2.5">
                        <div class="divider divider-horizontal"></div>
                        <label
                            class="input input-bordered inline-flex items-center grow input-sm"
                        >
                            <input
                                type="text"
                                placeholder="Name"
                                class="w-full"
                                bind:value={choice.name}
                            />
                            <IconEllipsisHorizontal />
                        </label>
                        <label
                            class="input input-bordered inline-flex items-center grow input-sm"
                        >
                            <input
                                type="number"
                                placeholder="Price"
                                class="w-full"
                                bind:value={choice.priceMutation}
                            />
                            <IconPriceTag />
                        </label>
                        <input
                            type="file"
                            class="file-input file-input-bordered file-input-sm"
                            accept="image/*"
                        />
                        <button
                            class="btn btn-secondary btn-sm"
                            form="_"
                            onclick={() => {
                                variant.choices.splice(indexChoice, 1);
                            }}
                        >
                            <IconClose /></button
                        >
                    </div>
                {/each}
            {/each}
            <button class="btn btn-primary">Create</button>
        </form>
    </div>
</div>
<table class="table">
    <!-- head -->
    <thead class="sticky top-16 bg-base-100 z-10">
        <tr>
            <th>
                <label>
                    <input
                        type="checkbox"
                        class="checkbox"
                        checked={isAllChecked}
                        onchange={() => {
                            const allCheck = isAllChecked;
                            products.forEach((x) => (x.checked = !allCheck));
                        }}
                    />
                </label>
            </th>
            <th>Name</th>
            <th>Description</th>
            <th>Variants</th>
            <th>
                {#if isOneOfProductChecked}
                    <button
                        class="btn btn-xs btn-secondary"
                        onclick={deleteMany}
                    >
                        <IconClose /> Delete
                    </button>
                {/if}
            </th>
        </tr>
    </thead>
    <tbody>
        {#if isProductsRetrieved}
            {#if products.length > 0}
                {#each products as y}
                    <tr>
                        <th>
                            <label>
                                <input
                                    type="checkbox"
                                    class="checkbox"
                                    bind:checked={y.checked}
                                />
                            </label>
                        </th>
                        <td>
                            <div class="flex items-center gap-3">
                                <div class="avatar">
                                    <div class="mask mask-squircle h-12 w-12">
                                        <img
                                            src="https://ih1.redbubble.net/image.3572931436.7035/ssrco,classic_tee,flatlay,fafafa:ca443f4786,front,wide_portrait,750x1000.jpg"
                                            alt="Avatar Tailwind CSS Component"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div class="font-bold">{y.name}</div>
                                    <div class="text-sm opacity-50">
                                        {currencyFormat(y.price)}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>
                            {y.description}
                        </td>
                        <td>
                            {#each y.variants as variant}
                                {variant.name}: {variant.choices
                                    .map((z) => z.name)
                                    .join(", ")}
                                <br />
                            {/each}
                        </td>
                        <th>
                            <button class="btn btn-primary btn-sm"
                                ><IconEye /></button
                            >
                            <button class="btn btn-warning btn-sm"
                                ><IconPencil /></button
                            >
                            <button
                                class="btn btn-secondary btn-sm"
                                onclick={() => deleteProduct(y.id)}
                                ><IconClose /></button
                            >
                        </th>
                    </tr>
                {/each}
            {:else}
                <tr>
                    <th></th>
                    <td></td>
                    <td>
                        <div class="text-3xl inline-flex items-center">
                            <IconClose />
                            Empty
                        </div>
                    </td>
                </tr>
            {/if}
        {:else}
            {#each Array(10) as _}
                <tr>
                    <th><div class="skeleton h-10"></div></th>
                    <td><div class="skeleton h-10"></div></td>
                    <td><div class="skeleton h-10"></div></td>
                    <td><div class="skeleton h-10"></div></td>
                </tr>
            {/each}
        {/if}
    </tbody>
    <tfoot class="sticky bottom-0 bg-base-100">
        <tr>
            <th></th>
            <th>Name</th>
            <th>Description</th>
            <th></th>
        </tr>
    </tfoot>
</table>
