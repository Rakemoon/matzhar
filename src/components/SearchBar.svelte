<script lang="ts">
    import IconSearch from "~icons/ion/search";

    let modal: HTMLDialogElement;
    let value = $state("");

    function onSubmit() {
        modal.showModal();
    }

    function onClose() {
        value = "";
        modal.close();
    }
</script>

<dialog class="modal outline-none" bind:this={modal}>
    <div class="modal-box outline-none">
        You searched <small>{value}</small>
    </div>
    <button class="modal-backdrop outline-none" onclick={onClose}>u</button>
</dialog>

<form
    onsubmit={onSubmit}
    class="input inline-flex items-center gap-2 max-sm:hidden"
>
    <input type="text" placeholder="Search..." bind:value />
    <IconSearch class="text-xl" />
</form>
