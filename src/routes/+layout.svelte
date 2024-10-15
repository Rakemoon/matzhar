<script lang="ts">
    import Navbar from "$components/Navbar.svelte";
    import "../app.css";
    const { children } = $props();
</script>

<div class="flex flex-col min-h-screen bg-base-100 px-10">
    <Navbar
        class="sticky top-0 left-0 z-30"
        categories={[
            { name: "Crewneck", href: "/" },
            { name: "Jacket", href: "/" },
            { name: "Hoodie", href: "/" },
        ]}
    />
    {@render children()}
</div>
