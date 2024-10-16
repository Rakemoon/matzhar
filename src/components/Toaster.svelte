<script>
    import { toasts } from "$lib/states/index.svelte";
</script>

<div class="toast">
    {#each toasts as toast}
        <div
            class="alert"
            class:alert-success={toast.type === "success"}
            class:alert-info={toast.type === "info"}
            class:alert-error={toast.type === "error"}
            class:alert-warning={toast.type === "warning"}
        >
            <span>{toast.summary}</span>
        </div>
    {/each}
</div>
