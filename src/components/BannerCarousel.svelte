<script lang="ts">
    type Item = {
        image: string;
        title: string;
        description: string;
        link: [name: string, href: string];
    };
    type BannerCarouselProps = {
        items: Item[];
        class?: string;
    };

    const { items, class: className = "" }: BannerCarouselProps = $props();
</script>

<div
    class="carousel rounded-box w-full h-full max-md:h-max shadow-md border border-neutral {className}"
>
    {#each items as item}
        <div class="carousel-item w-full">
            <div class="card md:card-side w-full rounded-none">
                <figure>
                    <img src={item.image} alt="banner" class="h-full" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">{item.title}</h2>
                    <p>{item.description}</p>
                    <div class="card-actions">
                        <a href={item.link[1]} class="btn btn-primary"
                            >{item.link[0]}</a
                        >
                    </div>
                </div>
            </div>
        </div>
    {/each}
</div>
