<script lang="ts">
	import type { WindowManager } from '$lib/components/windows/window-manager.svelte';
	import Window from '$lib/components/windows/window.svelte';
	import type {
		BookmarkTagCountsRecord,
		BookmarkTagGroupsRecord,
		BookmarkTagsRecord
	} from '$lib/pocketbase.types';
	import Button from '$lib/ui/button.svelte';
	import { onMount } from 'svelte';
	import type { ExpandedBookmarksRecord } from '../types';
	import type { Windows } from './types';
	import { pocketbase } from '$lib/pocketbase';

	const {
		tags,
		tag_groups,
		manager
	}: {
		tags: BookmarkTagsRecord[];
		tag_groups: BookmarkTagGroupsRecord[];
		manager: WindowManager<Windows>;
	} = $props();

	function onclose() {
		console.log('close');
	}

	function group() {
		const groupsMap = tags?.reduce(
			(acc, tag) => {
				const group_id = tag.parent || 'ungrouped';

				if (!acc[group_id]) {
					// Find the actual metadata from your tag_groups collection
					const groupRecord = tag_groups.find((g) => g.id === group_id);

					acc[group_id] = {
						// Spread the record if found, otherwise provide defaults for 'ungrouped'
						...(groupRecord || {
							id: 'ungrouped',
							name: 'Ungrouped',
							created: '',
							updated: ''
						}),
						items: []
					};
				}

				acc[group_id].items.push(tag);
				return acc;
			},
			{} as Record<string, BookmarkTagGroupsRecord & { items: BookmarkTagsRecord[] }>
		);

		// 2. Return the final array (The "Value" of the derived rune)
		return Object.values(groupsMap);
	}

	const grouped: (BookmarkTagGroupsRecord & { items: BookmarkTagsRecord[] })[] = group();
</script>

<div class="grid-12 pointer-events-none absolute top-24 right-gap left-gap">
	<Window
		class="col-span-full lg:col-span-6 lg:col-start-1"
		title="Catégories"
		id="tags"
		hidden
		{manager}
		{onclose}
	>
		<div class="mb-2.5">
			<div class="overflow-y-auto- relative max-h-96 space-y-0.5 border-b py-2 pb-3">
				{#each grouped as group}
					<div class="">{group.name} ({group.tag_count})</div>
					<div class="mb-12 font-serif">
						{#each group.items as item}
							<div>{item.name} ({item.bookmark_count})</div>
						{/each}
					</div>
				{/each}
				<!-- <div>
					{#each tag_groups as group}
						{group.name}
					{/each}
				</div>
				{#each tags as { id, name, bookmark_count }}
					<div class="flex gap-2 px-1">
						<input {id} type="checkbox" />
						<label class="justify-between- flex w-full items-center gap-2" for={id}>
							<div>{name}</div>
							<div class="text-2">({bookmark_count})</div>
						</label>
					</div>
				{/each} -->
			</div>
			<div class="mt-2.5 text-right">
				<Button onclick={() => manager.open_window('instructions')}>Trier</Button>
			</div>
		</div>
	</Window>
</div>
