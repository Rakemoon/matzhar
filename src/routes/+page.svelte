<script lang="ts">
    import BannerCarousel from "$components/BannerCarousel.svelte";
    import ProductCard from "$components/ProductCard.svelte";
    import type { IGetAllProductsResult } from "$lib/services/product.service";
    import { pushToast } from "$lib/states/toast";

    let products = $state.raw<null | IGetAllProductsResult>(null);

    async function retrieveProducts() {
        const {
            result,
            success,
        }: { success: boolean; result: IGetAllProductsResult } = await (
            await fetch("/api/products?simple")
        ).json();
        if (success) products = result;
        else {
            pushToast("Failed to load products", "error");
        }
    }

    $effect(() => {
        retrieveProducts();
    });
</script>

<div class="mt-2.5 flex-col flex-grow">
    <section class="grid grid-cols-12 h-full gap-2.5">
        <BannerCarousel
            class="col-span-12 h-full w-full"
            items={[
                {
                    image: "https://t4.ftcdn.net/jpg/03/46/51/19/240_F_346511926_B0dlruARI2rtWSpntNYRnIcq38xugKsh.jpg",
                    title: "Mix & Match",
                    description: "Get up to 50% off on all products",
                    link: ["Shop Now", "/"],
                },
                {
                    image: "https://t4.ftcdn.net/jpg/04/15/97/33/240_F_415973312_5yg3MrkRdi2SMHyVKbB4h7GgE5HrgUlb.jpg",
                    title: "Exclusive Offers",
                    description: "Get up to 50% off on all products",
                    link: ["Shop Now", "/"],
                },
                {
                    image: "https://t4.ftcdn.net/jpg/02/88/65/47/240_F_288654738_UBEq3CmA3xELr7tFoo43XlJ63W8kTHAn.jpg",
                    title: "Flash Sale",
                    description: "Get up to 50% off on all products",
                    link: ["Shop Now", "/"],
                },
            ]}
        />
        {#if !products}
            <div
                class="col-span-3 h-full bg-base-200 rounded-box skeleton"
            ></div>
            <div
                class="col-span-3 h-full bg-base-200 rounded-box skeleton"
            ></div>
            <div
                class="col-span-3 h-full bg-base-200 rounded-box skeleton"
            ></div>
            <div
                class="col-span-3 h-[20rem] bg-base-200 rounded-box skeleton"
            ></div>
        {:else}
            {#each products as product}
                <ProductCard
                    {...product}
                    img="https://ih1.redbubble.net/image.3572931436.7035/ssrco,classic_tee,flatlay,fafafa:ca443f4786,front,wide_portrait,750x1000.jpg"
                    class="col-span-3 w-full max-sm:col-span-12 max-md:col-span-6 max-lg:col-span-4"
                />
            {/each}
        {/if}
    </section>
</div>
