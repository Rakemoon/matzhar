<script lang="ts">
    import IconClose from "@tabler/icons-svelte/icons/x";
    const {
        image = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    } = $props();
</script>

<label for="avatar-drawer" class="btn btn-circle btn-ghost">
    <div class="avatar">
        <div class="rounded-full w-8">
            <img src={image} alt="avatar" />
        </div>
    </div>
</label>
<div class="drawer drawer-end absolute">
    <input id="avatar-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-side">
        <label
            for="avatar-drawer"
            aria-label="close sidebar"
            class="drawer-overlay"
        ></label>
        <div class="bg-base-200 text-base-content min-h-full w-80 p-4">
            <div class="flex flex-row justify-between">
                <div class="flex flex-row gap-2">
                    <div class="avatar">
                        <div class="rounded-full w-12 h-12">
                            <img src={image} alt="avatar" />
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <h3 class="text-xl font-bold">YourBae</h3>
                        <h5 class="text-xs">Marguirete Lecate</h5>
                    </div>
                </div>
                <label
                    for="avatar-drawer"
                    aria-label="close sidebar"
                    class="drawer-overlay btn btn-ghost btn-circle right-0"
                    ><IconClose /></label
                >
            </div>
        </div>
        <!-- <ul class="menu bg-base-200 text-base-content min-h-full w-full p-4"> -->
        <!--   <li><a href="/">y</a></li> -->
        <!--   <li><a href="/">y</a></li> -->
        <!-- </ul> -->
    </div>
</div>
