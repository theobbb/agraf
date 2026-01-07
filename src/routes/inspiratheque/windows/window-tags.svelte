<script lang="ts">
	import type { WindowManager } from '$lib/components/windows/window-manager.svelte';
	import Window from '$lib/components/windows/window.svelte';
	import type { BookmarkTagCountsRecord, BookmarkTagsRecord } from '$lib/pocketbase.types';
	import Button from '$lib/ui/button.svelte';
	import { onMount } from 'svelte';
	import type { ExpandedBookmarksRecord } from '../types';
	import type { Windows } from './types';
	import { pocketbase } from '$lib/pocketbase';

	const {
		tags: unorded_tags,

		manager
	}: {
		tags: BookmarkTagsRecord[];

		manager: WindowManager<Windows>;
	} = $props();

	let tag_counts: BookmarkTagCountsRecord[] = $state([]);
	const counts = $derived(
		Object.fromEntries(tag_counts.map(({ id, bookmark_count }) => [id, bookmark_count]))
	);

	const tags = $derived(
		unorded_tags
			?.filter((tag) => counts[tag.id])
			.sort((a, b) => (counts[b.id] || 0) - (counts[a.id] || 0)) || []
	);
	$inspect(tags);
	// const tags = $derived(
	// 	unorded_tags
	// 		.sort((a, b) => (tag_count?.get(b.id) || 0) - (tag_count?.get(a.id) || 0))
	// 		.filter((tag) => tag_count?.get(tag.id))
	// );

	function onclose() {
		console.log('close');
	}

	async function fetch_count() {
		tag_counts = await pocketbase.collection('bookmark_tag_counts').getFullList();
	}
	onMount(() => {
		fetch_count();
	});
</script>

<div class="grid-12 pointer-events-none absolute top-24 right-gap left-gap">
	<Window
		class="col-span-full lg:col-span-3 lg:col-start-1"
		title="Catégories"
		id="tags"
		hidden
		{manager}
		{onclose}
	>
		<div class="mb-2.5">
			<div class="relative max-h-96 space-y-0.5 overflow-y-auto border-b py-2 pb-3">
				{#each tags as { id, name }}
					<div class="flex gap-2 px-1">
						<input {id} type="checkbox" />
						<label class="flex w-full items-center justify-between gap-2" for={id}>
							<div>{name}</div>
							<div class="text-2">+{counts[id]}</div>
						</label>
					</div>
				{/each}
			</div>
			<div class="mt-2.5 text-right">
				<Button onclick={() => manager.open_window('instructions')}>Trier</Button>
			</div>
		</div>
	</Window>
</div>
