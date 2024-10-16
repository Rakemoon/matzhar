<script lang="ts">
    import IconLogout from "~icons/ion/log-out";
    type ProfileProps = {
        name: string;
        avatar?: string;
    };
    const { name, avatar }: ProfileProps = $props();
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
            <img
                src={avatar ??
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                alt="user"
                class="object-cover"
            />
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
            <span class="text-base-content">{name}</span>
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
            <a href="/" class="inline-flex items-center text-error">
                <IconLogout /> Logout
            </a>
        </li>
    </ul>
</div>
