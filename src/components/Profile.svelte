<script lang="ts">
    import { loginInfo } from "$lib/states/index.svelte";
    import IconLogout from "~icons/ion/log-out";
    import IconLogin from "~icons/ion/log-in";
    const themes = [
        ["default", "System"],
        ["light", "Light"],
        ["dark", "Dark"],
        ["valentine", "Valentine"],
    ];
</script>

{#snippet avatarImage()}
    <div class="avatar">
        <div class="w-8 rounded-full aspect-square">
            <img src={loginInfo.user.image} alt="user" class="object-cover" />
        </div>
    </div>
{/snippet}

<div class="dropdown dropdown-hover dropdown-left">
    <button class="btn btn-circle btn-ghost">
        {@render avatarImage()}
    </button>
    <ul class="dropdown-content menu bg-base-200 rounded-box w-max z-10">
        <div
            class="menu-title inline-flex gap-2.5 items-center border-b-2 border-neutral mb-2"
        >
            {@render avatarImage()}
            <span class="text-base-content">{loginInfo.user.name}</span>
        </div>
        <li>
            <details>
                <summary>Change Theme</summary>
                <ul>
                    {#each themes as [theme, label]}
                        <li>
                            <input
                                type="radio"
                                name="theme-dropdown"
                                class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                                aria-label={label}
                                value={theme}
                            />
                        </li>
                    {/each}
                </ul>
            </details>
        </li>
        <li>
            {#if loginInfo.isLoggedIn}
                <button
                    class="inline-flex items-center text-error"
                    onclick={() => (loginInfo.isLoggedIn = false)}
                >
                    <IconLogout /> Logout
                </button>
            {:else}
                <a href="/auth" class="inline-flex items-center text-success">
                    <IconLogin /> Login
                </a>
            {/if}
        </li>
    </ul>
</div>
