<script lang="ts">
    import type { PageData } from "./$types";

    const { data }: { data: PageData } = $props();
</script>

<h1>{data.name}</h1>
<h2>{data.description}</h2>
<h3>{data.price}</h3>
