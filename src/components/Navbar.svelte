<script lang="ts">
    import IconChevronDown from "~icons/ion/chevron-down";
    import IconCart from "~icons/ion/cart";
    import Logo from "./Logo.svelte";
    import SearchBar from "./SearchBar.svelte";
    import Profile from "./Profile.svelte";

    type Category = {
        name: string;
        href: string;
    };

    type NavbarProps = {
        class?: string;
        categories: Category[];
    };

    const { class: className, categories }: NavbarProps = $props();
</script>

<nav class="navbar border-b-2 border-neutral p-0 {className}">
    <div class="navbar-start flex gap-5">
        <Logo />
        <ul class="flex justify-between">
            <li>
                <button class="btn btn-ghost">Products</button>
            </li>
            <li>
                <div class="dropdown dropdown-hover group">
                    <button class="btn btn-ghost flex-nowrap">
                        Categories
                        <IconChevronDown
                            class="group-hover:rotate-180 transition-transform"
                        />
                    </button>
                    <ul
                        class="dropdown-content menu bg-base-200 rounded-box w-max"
                    >
                        {#each categories as category}
                            <li>
                                <a href={category.href}>
                                    {category.name}
                                </a>
                            </li>
                        {/each}
                    </ul>
                </div>
            </li>
            <li>
                <button class="btn btn-ghost"> Blog </button>
            </li>
        </ul>
    </div>
    <div class="navbar-end">
        <div class="flex gap-2.5">
            <SearchBar />
            <div class="tooltip tooltip-bottom" data-tip="Cart">
                <button class="btn btn-ghost btn-circle">
                    <IconCart class="text-xl" />
                </button>
            </div>
            <Profile name="Mathzar" />
        </div>
    </div>
</nav>
