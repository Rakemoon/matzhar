<script lang="ts">
    import "../app.css";
    import X from "@tabler/icons-svelte/icons/x";
    const { children } = $props();
</script>

<div class="h-screen max-w-full">
    <div class="drawer lg:drawer-open">
        <input class="drawer-toggle" type="checkbox" id="root-drawer" />
        <div class="drawer-content h-full">{@render children()}</div>
        <div class="drawer-side z-10">
            <label class="drawer-overlay" for="root-drawer"></label>
            <ul class="menu bg-base-200 text-base-content h-full p-4 w-96">
                <div class="menu-title flex justify-between items-center">
                    <input
                        type="checkbox"
                        class="theme-controller"
                        value="light"
                        id="valentine-theme"
                        hidden
                    />
                    <label
                        class="btn text-3xl lg:flex-grow"
                        for="valentine-theme"
                    >
                        Mathzar
                    </label>
                    <label for="root-drawer" class="lg:hidden">
                        <X />
                    </label>
                </div>

                <li></li>
            </ul>
        </div>
    </div>
</div>
