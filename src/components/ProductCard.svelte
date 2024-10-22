<script lang="ts">
    import type { IGetAllProductsResult } from "$lib/services/product.service";
    import { currencyFormat } from "$lib/util/string";
    import { pushToast } from "$lib/states/toast";

    const {
        img,
        name,
        description,
        price,
        class: className = "",
    }: IGetAllProductsResult[number] & {
        img: string;
        class?: string;
    } = $props();

    function addToCart() {
        pushToast("Adding to cart...", "info");
    }
</script>

<div class="card bg-base-100 shadow-xl card-compact {className}">
    <figure class="w-full aspect-square">
        <img src={img} alt={name} />
    </figure>
    <div class="card-body">
        <h2 class="card-title">
            {name}
            <div class="badge badge-secondary">NEW</div>
        </h2>
        <p>{description}</p>
        <div class="card-actions justify-between items-center">
            <div class="text-2xl text-accent">{currencyFormat(price)}</div>
            <button class="btn btn-primary" onclick={addToCart}
                >Add to Cart</button
            >
        </div>
    </div>
</div>
