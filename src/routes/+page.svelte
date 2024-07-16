<script lang="ts">
  import { CartState } from "$lib/states/CartState.svelte";
  import products from "$products";
  function addToChart(product: string) {
    const index = CartState.findIndex(x => x.name === product);
    if (index < 0) CartState.push({ name: product, amount: 1 });
    else CartState[index].amount++;
    alert("product added to cart!")
  }
</script>

<h1>Hello ! do you wanna sum of this product ?</h1>
{#each products as product}
  <li><button onclick={() => addToChart(product.name)}>{product.name}</button></li>
{/each}
