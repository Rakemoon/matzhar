<script>
    import BannerCarousel from "$components/BannerCarousel.svelte";
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
        <div class="col-span-3 h-full bg-base-200 rounded-box skeleton"></div>
        <div class="col-span-3 h-full bg-base-200 rounded-box skeleton"></div>
        <div class="col-span-3 h-full bg-base-200 rounded-box skeleton"></div>
        <div
            class="col-span-3 h-[20rem] bg-base-200 rounded-box skeleton"
        ></div>
    </section>
</div>
