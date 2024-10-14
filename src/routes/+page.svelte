<script>
    import IconSearch from "@tabler/icons-svelte/icons/search";
    import Man from "@tabler/icons-svelte/icons/man";
    import ShoppingCart from "@tabler/icons-svelte/icons/shopping-cart";
    import Squares from "@tabler/icons-svelte/icons/squares";
    import Woman from "@tabler/icons-svelte/icons/woman";
</script>

<div class="flex flex-col gap-2.5 h-screen">
    <nav class="navbar bg-base-100">
        <div class="navbar-start">
            <a class="btn text-2xl" href="/explore">Explore</a>
        </div>
        <div class="navbar-center max-md:hidden">
            <ul class="flex justify-between gap-2.5">
                <li>
                    <button class="btn">
                        <Squares />
                    </button>
                </li>
                <li>
                    <button class="btn">
                        <Man />
                    </button>
                </li>
                <li>
                    <button class="btn">
                        <Woman />
                    </button>
                </li>
            </ul>
        </div>
        <div class="navbar-end">
            <div class="flex gap-2.5">
                <button class="btn btn-circle">
                    <IconSearch />
                </button>
                <label class="btn btn-circle lg:hidden" for="root-drawer">
                    <ShoppingCart />
                </label>
            </div>
        </div>
    </nav>
    <div class="flex gap-2.5 flex-grow overflow-auto px-2.5 pb-2.5 w-full">
        <div
            class="grid grid-cols-8 grid-rows-8 gap-2.5 grid-flow-col w-full h-full flex-shrink-0"
        >
            <div
                class="bg-base-200 col-span-4 row-span-2 rounded-box overflow-hidden"
            >
                <img
                    src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fashion-sale-banner-template-design-389dc7a74f096738d1d425314404a2cd_screen.jpg?ts=1605613724"
                    alt="banner"
                    class="w-full h-full object-cover object-center"
                />
            </div>
            <div
                class="bg-base-200 col-span-4 row-span-2 rounded-box overflow-hidden"
            >
                <img
                    src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/27f1ce107056811.5f9e69654c37d.jpg"
                    alt="banner"
                    class="w-full h-full object-cover object-center"
                />
            </div>
            <div class="bg-base-200 row-span-2 col-span-2 rounded-box"></div>
            <div class="bg-base-200 row-span-2 col-span-2 rounded-box"></div>
            <div class="bg-base-200 row-span-2 col-span-2 rounded-box"></div>
            <div class="bg-base-200 row-span-2 col-span-2 rounded-box"></div>
            <div
                class="bg-base-200 row-span-5 col-span-2 rounded-box overflow-hidden"
            >
                <img
                    src="https://www.nextdayflyers.com/blog/wp-content/uploads/2013/12/fashion_week_design_large.jpg"
                    alt="banner"
                    class="w-full h-full object-cover object-center"
                />
            </div>
            <div class="bg-base-200 col-span-4 row-span-3 rounded-box"></div>
            <div class="bg-base-200 row-span-5 col-span-2 rounded-box"></div>
        </div>
        <div
            class="grid grid-cols-8 grid-rows-8 gap-2.5 grid-flow-col w-full h-full flex-shrink-0"
        >
            <div
                class="bg-base-200 col-span-4 row-span-2 rounded-box overflow-hidden"
            >
                <img
                    src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fashion-sale-banner-template-design-389dc7a74f096738d1d425314404a2cd_screen.jpg?ts=1605613724"
                    alt="banner"
                    class="w-full h-full object-cover object-center"
                />
            </div>
            <div
                class="bg-base-200 col-span-4 row-span-2 rounded-box overflow-hidden"
            >
                <img
                    src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/27f1ce107056811.5f9e69654c37d.jpg"
                    alt="banner"
                    class="w-full h-full object-cover object-center"
                />
            </div>
            <div class="bg-base-200 row-span-2 col-span-2 rounded-box"></div>
            <div class="bg-base-200 row-span-2 col-span-2 rounded-box"></div>
            <div class="bg-base-200 row-span-2 col-span-2 rounded-box"></div>
            <div class="bg-base-200 row-span-2 col-span-2 rounded-box"></div>
            <div
                class="bg-base-200 row-span-5 col-span-2 rounded-box overflow-hidden"
            >
                <img
                    src="https://www.nextdayflyers.com/blog/wp-content/uploads/2013/12/fashion_week_design_large.jpg"
                    alt="banner"
                    class="w-full h-full object-cover object-center"
                />
            </div>
            <div class="bg-base-200 col-span-4 row-span-3 rounded-box"></div>
            <div class="bg-base-200 row-span-5 col-span-2 rounded-box"></div>
        </div>
    </div>
</div>
