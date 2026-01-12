<script lang="ts">
	import Pagination from '$lib/components/pagination.svelte';
	import Window from '$lib/components/windows/window.svelte';
	import Emoji from '$lib/emoji.svelte';
	import Markdown from '$lib/markdown.svelte';
	import Media from '$lib/media.svelte';
	import { pocketbase } from '$lib/pocketbase';

	const { data } = $props();

	const { posters } = $derived(data);

	const indexes: Record<string, number> = $state({});
	const opened: Record<string, true> = $state({});

	const dummy_pagination = $derived({
		...posters,
		totalItems: 300,
		totalPages: 20,
		items: []
	});
</script>

<Emoji>🧻</Emoji>

<!-- <Window id="t" title="Yo">
	
</Window> -->

<div class="grid-12 mb-24">
	{#each posters.items as poster}
		<div class="col-span-full md:col-span-4 lg:col-span-3">
			{#if poster.images?.length > 1}
				<button
					class="-translate-y-0.5 cursor-pointer"
					onclick={() =>
						(indexes[poster.id] =
							(indexes[poster.id] == null ? 1 : indexes[poster.id] + 1) % poster.images?.length)}
				>
					{indexes[poster.id] ? indexes[poster.id] + 1 : 1} / {poster.images?.length}
				</button>
			{:else}
				<div aria-hidden="true" class="invisible">*</div>
			{/if}

			<div>
				<a class="relative mb-1" href="/affichorama/{poster.slug}">
					{#if poster.images?.length}
						<Media
							src={pocketbase.files.getURL(poster, poster.images[indexes[poster.id] || 0])}
							alt="{poster.title} - image"
						/>
					{:else}
						<div class="absolute inset-0 bg-white/5"></div>
					{/if}
				</a>
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="mt-1" onclick={() => (opened[poster.id] = true)}>
					<div class="">{poster.title}</div>
					<div
						class={[
							'text-2 relative overflow-hidden text-ellipsis',
							opened[poster.id] ? '' : 'line-clamp-3'
						]}
					>
						<Markdown content={poster.body || ''} />
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>
<Pagination pagination={dummy_pagination} route="/affichorama" />

<svelte:head>
	<title>AGRAF 🧻 Affichorama</title>
</svelte:head>
