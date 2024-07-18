<script lang="ts">
  import IconHome from "@tabler/icons-svelte/icons/home";
  import IconCart from "@tabler/icons-svelte/icons/shopping-cart";
  import IconAuth from "@tabler/icons-svelte/icons/auth-2fa";
  interface NavbarProp {
    currentPath?: string
  }

  interface Page {
    path: string;
    label: string;
    icon: typeof IconHome
  }

  let { currentPath }: NavbarProp = $props();

  const pages: Page[] = [
    {
      path: "/",
      label: "Home",
      icon: IconHome
    },
    {
      path: "/cart",
      label: "Cart",
      icon: IconCart
    },
    {
      path: "/auth",
      label: "Auth",
      icon: IconAuth
    }
  ];
</script>

<div>
  <ul class="nav-list">
    {#each pages as page }
      <li class="nav-item" aria-current={currentPath === page.path ? "page" : undefined}>
        <a href={page.path}>
          <svelte:component this={page.icon} size={20} stroke={1}></svelte:component>
          <span>{page.label}</span>
        </a>
      </li>
    {/each}
  </ul>
</div>

<style>
  .nav-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 10%;
    height: 100%;
    position: fixed;
    overflow: true;
    background-color: #f1f1f1;
  }

  .nav-item a {
    text-decoration: none;
    display: flex;
    color: black;
    padding: 8px 16px;
    align-items: center;
  }

  .nav-item span {
    padding-left:4px;
  }

  .nav-item:hover {
    background-color: darkgrey;
  }

  .nav-item[aria-current=page] {
    background: greenyellow;
  }
</style>
