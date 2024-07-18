<script lang="ts">
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
<style>
  .route-display {
    margin-left: 10%;
    padding: 1px 16px;
    height: 1000px;
  }
</style>
