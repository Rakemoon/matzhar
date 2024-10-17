<script lang="ts">
    import { page } from "$app/stores";
    import Navbar from "$components/Navbar.svelte";
    import Toaster from "$components/Toaster.svelte";
    import "../app.css";
    const { children } = $props();
</script>

<div class="flex flex-col min-h-screen bg-base-100 px-10 relative">
    {#if $page.url.pathname !== "/auth"}
        <Navbar
            class="z-30 bg-base-100 top-0 sticky"
            categories={[
                { name: "Crewneck", href: "/" },
                { name: "Jacket", href: "/" },
                { name: "Hoodie", href: "/" },
            ]}
        />
    {/if}
    {@render children()}
    <Toaster />
</div>
