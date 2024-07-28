<script lang="ts">
  import ThemeButton from "./button/ThemeButton.svelte";
  import ProfileButton from "./button/ProfileButton.svelte"
  import CartButton from "./button/CartButton.svelte";
  interface NavbarProp {
    currentPath?: string
  }
  let { currentPath }: NavbarProp = $props();
</script>

<nav class="navbar bg-base-100 shadow-base-100 drop-shadow-lg">
  <div class="navbar-start">
    <CartButton />
  </div>
  <div class="navbar-center">
    <a href="/" class="btn btn-ghost text-xl">Mathzar</a>
  </div>
  <div class="navbar-end gap-2">
    <ThemeButton />
    <ProfileButton />
  </div>
</nav>
