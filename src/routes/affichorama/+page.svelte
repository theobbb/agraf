<script lang="ts">
	import Emoji from '$lib/emoji.svelte';
	import { pocketbase } from '$lib/pocketbase';
	import { get_image_url } from '$lib/utils/get-image-url';
	import { dummy } from './dummy';

	const { data } = $props();

	const { posters } = $derived(data);

	const indexes: Record<string, number> = $state({});
	$inspect(posters);
</script>

<Emoji>🧻</Emoji>

<div class="grid-12">
	{#each posters.items as poster}
		<div class="col-span-6 md:col-span-4 lg:col-span-3">
			{#if poster.images?.length > 1}
				<button
					onclick={() =>
						(indexes[poster.id] =
							(indexes[poster.id] == null ? 1 : indexes[poster.id] + 1) % poster.images?.length)}
				>
					{indexes[poster.id] ? indexes[poster.id] + 1 : 1} / {poster.images?.length}
				</button>
			{:else}
				<div aria-hidden="true" class="invisible">*</div>
			{/if}

			<a href="/affichorama/{poster.slug}">
				<div class="relative mb-2.5">
					{#if poster.images?.length}
						<!-- <img
							loading="lazy"
							class="object-contain"
							src={get_image_url(
								poster.collectionId,
								poster.id,
								poster.images[indexes[poster.id] || 0]
							)}
							alt="{poster.title} - 0"
						/> -->
						{#if poster.images[indexes[poster.id] || 0].endsWith('.mp4')}
							<video src={pocketbase.files.getURL(poster, poster.images[indexes[poster.id] || 0])}
							></video>
						{:else}
							<img
								loading="lazy"
								class="object-contain"
								src={pocketbase.files.getURL(poster, poster.images[indexes[poster.id] || 0], {
									format: 'webp'
								})}
								alt="{poster.title} - 0"
							/>
						{/if}
					{:else}
						<div class="absolute inset-0 bg-white/5"></div>
					{/if}
				</div>
				<div class="mb-0.5-">{poster.title}</div>
				<div
					class="relative line-clamp-6 overflow-hidden text-ellipsis whitespace-pre-line text-white/50"
				>
					{poster.body}
				</div>
				<div class="invisible">*</div>
			</a>
		</div>
	{/each}
</div>

<svelte:head>
	<title>AGRAF 🧻 Affichorama</title>
</svelte:head>
