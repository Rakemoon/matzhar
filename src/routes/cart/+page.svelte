<script lang="ts">
  import { CartState } from "$lib/states/CartState.svelte";
    import { currencyFormat } from "$lib/util/string";
  import products from "$products";
</script>

<h1>Cart</h1>
<ul>
  {#each CartState as cart}
  {@const cartdata = products.find(x => x.name === cart.name)!}
    <li>
      <span>Product: {cart.name}</span>
        <p>Amount: {cart.amount}</p>
        <p>Price: {currencyFormat(cartdata.price)}</p>
        <p>Total: {currencyFormat(cartdata.price * cart.amount)}</p>
    </li>
  {/each}
</ul>
