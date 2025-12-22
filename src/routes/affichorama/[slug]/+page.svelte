<script lang="ts">
	import Markdown from '$lib/markdown.svelte';
	import { pocketbase } from '$lib/pocketbase';

	import IconArrowBoxLeftUp from '$lib/ui/icons/icon-arrow-box-left-up.svelte';
	import IconArrowBoxLeft from '$lib/ui/icons/icon-arrow-box-left.svelte';
	import IconArrowBoxRight from '$lib/ui/icons/icon-arrow-box-right.svelte';

	const { data } = $props();

	const { poster, prev, next } = $derived(data);
</script>

<div class="grid-12">
	<!-- <a href="/affichorama" class="col-span-full font-serif italic lg:col-span-4">Retour</a> -->
	<div
		class="col-span-10 mt-24 flex max-w-140 flex-col justify-between lg:col-span-4 lg:col-start-1"
	>
		<!-- <div class="whitespace-nowrap">
			<div class="col-span-6">
				{#if prev}
					<a href="/affichorama/{prev?.slug}" class="og-link flex items-center gap-1">
						<div class="shrink-0 text-2xl"><IconArrowBoxLeft /></div>
						<div class="truncate">{prev.title}</div>
					</a>
				{:else}
					<a href="/affichorama" class="og-link flex items-center gap-1">
						<div class="shrink-0 text-2xl"><IconArrowBoxLeftUp /></div>
						<div class="truncate">Retour à la liste</div>
					</a>
				{/if}
			</div>
			<div class="col-span-6">
				{#if next}
					<a href="/affichorama/{next?.slug}" class="og-link flex items-center gap-1 text-ellipsis">
						<div class="shrink-0 text-2xl"><IconArrowBoxRight /></div>
						<div class="truncate">{next.title}</div>
					</a>
				{:else}
					<a href="/affichorama" class="og-link flex items-center gap-1">
						<div class="shrink-0 text-2xl"><IconArrowBoxLeftUp /></div>
						<div class="truncate">Retour à la liste</div>
					</a>
				{/if}
			</div>
		</div> -->
		<div>
			<!-- <div>
				{format_date(poster.date)}
			</div> -->

			<div class="text-balance">
				<div class="text-2">{poster.title}</div>
				<Markdown content={poster?.body || ''} />
			</div>
		</div>

		<!-- <div class="whitespace-break-spaces">{@html marked(poster?.body || '')}</div> -->
	</div>
	<div class="col-span-full lg:col-span-8 lg:col-start-6">
		<div class="relative flex gap-2.5 overflow-x-auto md:h-[calc(100svh-4rem)]">
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

	<!-- <a
		class="col-span-full flex items-end justify-end font-serif italic lg:col-span-4 lg:col-start-1 lg:row-start-3 lg:justify-start"
		>Suivant</a
	> -->
	<!-- <div class="col-span-full flex items-end justify-end font-serif italic">
		{#if next_slug}
			<a class="" href="/affichorama/{next_slug}">Suivant</a>
		{/if}
	</div> -->
</div>

<svelte:head>
	<title>AGRAF 🧻 {poster.title}</title>
</svelte:head>
