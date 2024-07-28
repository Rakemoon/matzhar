<script lang="ts">
  import "../app.css";
  import Navbar from "$lib/components/Navbar.svelte";
  import PopUps from "$lib/components/PopUps.svelte";
  import { PopUpState } from "$lib/states/PopUpState.svelte";
  import { page } from "$app/stores";
  let { children } = $props();
</script>

<Navbar currentPath={$page.route.id!}/>
<PopUps list={PopUpState}/>
<div class="route-display">
  {@render children()}
</div>

<style lang="postcss">
  :global(html, body) {
    padding: 0;
    height: 100%;
  }
</style>
