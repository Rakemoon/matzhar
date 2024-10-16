<script lang="ts">
    import { page } from "$app/stores";
    import Navbar from "$components/Navbar.svelte";
    import Toaster from "$components/Toaster.svelte";
    import "../app.css";
    const { children } = $props();
</script>

<div class="flex flex-col min-h-screen bg-base-100 px-10">
    {#if $page.url.pathname !== "/auth"}
        <Navbar
            class="sticky top-0 left-0 z-30"
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
