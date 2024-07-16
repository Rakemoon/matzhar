<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import { page } from "$app/stores";
  let { children } = $props();
</script>

<Navbar currentPath={$page.route.id!}/>
<div class="route-display">
  {@render children()}
</div>

<style>
  .route-display {
    margin-left: 25%;
    padding: 1px 16px;
    height: 1000px;
  }
</style>
