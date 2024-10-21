<script lang="ts">
    import IconCopy from "~icons/ion/copy";
    import { page } from "$app/stores";

    const { children } = $props();
    const route = $derived($page.route.id?.replace("/dashboard/", ""));
</script>

<div class="flex min-h-full grow">
    <div class="w-72 menu bg-base-300 relative max-md:hidden">
        <ul class="h-fit sticky top-20">
            <li>
                <ul>
                    <h2 class="menu-title">Buyer</h2>
                    <li>
                        <button>
                            <IconCopy />
                            Products
                        </button>
                    </li>
                </ul>
            </li>
            <li>
                <ul>
                    <h2 class="menu-title">Shoper</h2>
                    <li>
                        <a
                            class:active={route === "products"}
                            href="/dashboard/products"
                        >
                            <IconCopy />
                            Products
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    <div class="flex-grow relative">
        {@render children()}
    </div>
</div>
