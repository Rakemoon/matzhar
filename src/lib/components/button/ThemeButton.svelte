<script lang="ts">
    import IconSun from "@tabler/icons-svelte/icons/sun";
    import IconMoon from "@tabler/icons-svelte/icons/moon";
    import { onMount } from "svelte";

    let isDarkTheme = $state<boolean>(false);

    onMount(() => {
        isDarkTheme = matchMedia("(prefers-color-scheme: dark)").matches;
    });

    $effect(() => {
        document
            .getElementsByTagName("html")
            .item(0)
            ?.setAttribute("data-theme", isDarkTheme ? "dark" : "valentine");
    });
</script>

<label class="swap swap-rotate lg:hidden">
    <input
        type="checkbox"
        value="dark"
        onclick={() => (isDarkTheme = !isDarkTheme)}
        checked={isDarkTheme}
    />
    <IconSun class="swap-off" />
    <IconMoon class="swap-on" />
</label>

<label class="cursor-pointer gap-2 hidden lg:flex">
    <span class="label-text">Theme</span>
    <IconSun />
    <input
        type="checkbox"
        value="dark"
        class="toggle"
        onclick={() => (isDarkTheme = !isDarkTheme)}
        checked={isDarkTheme}
    />
    <IconMoon />
</label>
