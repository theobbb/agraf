<script lang="ts">
	import type { WindowManager } from '$lib/components/windows/window-manager.svelte';
	import Window from '$lib/components/windows/window.svelte';
	import type { BookmarkTagsRecord } from '$lib/pocketbase.types';
	import Button from '$lib/ui/button.svelte';
	import type { ExpandedBookmarksRecord } from '../types';
	import type { Windows } from './types';

	const {
		tags: unorded_tags,
		tag_count,
		manager
	}: {
		tags: BookmarkTagsRecord[];
		tag_count: Map<string, number> | null;
		manager: WindowManager<Windows>;
	} = $props();

	const tags = $derived(
		unorded_tags
			.sort((a, b) => (tag_count?.get(b.id) || 0) - (tag_count?.get(a.id) || 0))
			.filter((tag) => tag_count?.get(tag.id))
	);

	$inspect(tag_count);
	function onclose() {
		console.log('close');
	}
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
							<div class="text-2">+{tag_count?.get(id)}</div>
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
