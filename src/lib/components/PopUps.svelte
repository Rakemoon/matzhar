<script lang="ts">
  import type { PopUpItem } from "$lib/states/PopUpState.svelte";

  let { list }: { list: PopUpItem[] } = $props();
</script>

<div class="popup-container">
  <ul>
    {#each list as item}
      <div class="popup-item">{item.message}</div>
    {/each}
  </ul>
</div>

<style>
  .popup-container {
    position: absolute;
    top: 20%;
    left: 70%;
  }
</style>
