<script lang="ts">
	import Markdown from '$lib/markdown.svelte';
	import { pocketbase } from '$lib/pocketbase';
	import type { PageProps } from './$types';
	import { marked } from 'marked';

	const { data }: PageProps = $props();

	const { poster } = $derived(data);
</script>

<div class="grid-12">
	<a href="/affichorama" class="col-span-full font-serif italic lg:col-span-4">Retour</a>

	<div class="col-span-full lg:col-span-8 lg:col-start-6 lg:row-span-2 lg:row-start-2">
		<div class="relative flex gap-2.5 overflow-x-auto md:h-[calc(100svh-9rem)]">
			{#each poster.images as image}
				{#if image.endsWith('.mp4')}
					<video autoplay muted src={pocketbase.files.getURL(poster, image)}></video>
				{:else}
					<img
						class="md:mb-2.5- max-h-full object-contain"
						src={pocketbase.files.getURL(poster, image, {
							format: 'webp'
						})}
						alt=""
					/>
				{/if}
			{/each}
		</div>
	</div>
	<div class="space col-span-10 max-w-160 lg:col-span-4 lg:col-start-1 lg:row-start-2">
		<div class="text-2">{poster.title}</div>
		<Markdown content={poster?.body || ''} />
		<!-- <div class="whitespace-break-spaces">{@html marked(poster?.body || '')}</div> -->
	</div>
	<!-- <a
		class="col-span-full flex items-end justify-end font-serif italic lg:col-span-4 lg:col-start-1 lg:row-start-3 lg:justify-start"
		>Suivant</a
	> -->
	<a class="col-span-full flex items-end justify-end font-serif italic">Suivant</a>
</div>

<svelte:head>
	<title>AGRAF 🧻 {poster.title}</title>
</svelte:head>
