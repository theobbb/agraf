<!-- <script lang="ts">
	const { src, alt, autoplay = false } = $props();

	const image_src = src + '?format=webp';
</script>

{#if src.endsWith('.mp4')}
	<video muted loop {autoplay} class="h-full w-full object-cover" {src}></video>
{:else}
	<img loading="lazy" class="h-full w-full object-contain" src={image_src} {alt} />
{/if} -->

<script lang="ts">
	const {
		src,
		alt,
		thumbnail = false
	}: { src: string; alt: string; thumbnail?: boolean } = $props();

	const url: string = $derived.by(() => {
		if (src.startsWith('blob')) return src;
		if (src.endsWith('.mp4')) return src;
		const url = new URL(src);
		url.searchParams.set('format', 'webp');
		if (thumbnail) url.searchParams.set('thumb', '100x100');
		return url.toString();
	});
</script>

{#if src}
	{#if src.endsWith('.mp4')}
		<video muted autoplay class="h-full w-full object-contain" src={url}></video>
	{:else}
		<img loading="lazy" class="h-full w-full object-contain" src={url} {alt} />
	{/if}
{:else}
	:(
{/if}
