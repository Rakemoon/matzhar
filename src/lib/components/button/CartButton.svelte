<script lang="ts">
    import IconCart from "@tabler/icons-svelte/icons/shopping-cart";
</script>

<label for="cart-drawer" class="btn btn-ghost btn-circle">
    <IconCart />
</label>
<div class="drawer absolute">
    <input id="cart-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-side">
        <label
            for="cart-drawer"
            aria-label="close sidebar"
            class="drawer-overlay"
        ></label>
        <div class="bg-base-200 text-base-content min-h-full w-80 lg:w-80 p-4">
            <div class="flex flex-row justify-between">
                <div class="flex flex-row gap-2">
                    <div class="flex flex-col">
                        <h3 class="text-xl font-bold">YourBae</h3>
                        <h5 class="text-xs">Marguirete Lecate</h5>
                    </div>
                </div>
                <label
                    for="cart-drawer"
                    aria-label="close sidebar"
                    class="drawer-overlay btn btn-ghost btn-circle right-0"
                    >X</label
                >
            </div>
        </div>
    </div>
</div>
