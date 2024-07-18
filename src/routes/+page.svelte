<script lang="ts">
  import { CartState } from "$lib/states/CartState.svelte";
  import { pushPopUp } from "$lib/states/PopUpState.svelte";
  import products from "$products";
  function addToChart(product: string) {
    const index = CartState.findIndex(x => x.name === product);
    if (index < 0) CartState.push({ name: product, amount: 1 });
    else CartState[index].amount++;
    pushPopUp({ message: `${product} added to chart`, type: "warn" });
  }
</script>

<h1>Hello ! do you wanna sum of this product ?</h1>
{#each products as product}
  <li><button onclick={() => addToChart(product.name)}>{product.name}</button></li>
{/each}
