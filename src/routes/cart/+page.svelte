<script lang="ts">
    import { CartState, type CartItem } from "$lib/states/CartState.svelte";
    import { currencyFormat } from "$lib/util/string";
    import products from "$products";

    function addAmount(name: string) {
        CartState.find((x) => x.name === name)!.amount++;
    }

    function decreaseAmount(name: string) {
        const index = CartState.findIndex((x) => x.name === name)!;
        CartState[index].amount = Math.max(0, CartState[index].amount - 1);
        if (CartState[index].amount === 0) CartState.splice(index, 1);
    }

    function listenInput(
        event: KeyboardEvent & {
            currentTarget: EventTarget & HTMLInputElement;
        },
        item: CartItem,
    ): void {
        if (event.key !== "Enter") return;
        const value = parseInt(event.currentTarget.value);
        event.currentTarget.value = "";
        if (isNaN(value)) return;
        item.amount = Math.max(0, value);
    }
</script>

<h1>Cart</h1>
<ul>
    {#each CartState as cart}
        {@const cartdata = products.find((x) => x.name === cart.name)!}
        <li>
            <span>Product: {cart.name}</span>
            <p>Amount: {cart.amount}</p>
            <p>Price: {currencyFormat(cartdata.price)}</p>
            <p>Total: {currencyFormat(cartdata.price * cart.amount)}</p>
            <button onclick={() => addAmount(cart.name)}>+</button>
            <button onclick={() => decreaseAmount(cart.name)}>-</button>
            <input onkeydowncapture={(ev) => listenInput(ev, cart)} />
        </li>
    {/each}
</ul>
