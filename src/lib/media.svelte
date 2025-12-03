<script lang="ts">
	const { src, alt, autoplay = false } = $props();

	const image_src = src + '?format=webp';
</script>

{#if src.endsWith('.mp4')}
	<video muted loop {autoplay} class="h-full w-full object-cover" {src}></video>
{:else}
	<img loading="lazy" class="h-full w-full object-contain" src={image_src} {alt} />
{/if}
