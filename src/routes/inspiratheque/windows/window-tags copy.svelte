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
				<div>
					{#each tag_groups as group}
						{group.name}
					{/each}
				</div>
				{#each tags as { id, name, bookmark_count }}
					<div class="flex gap-2 px-1">
						<input {id} type="checkbox" />
						<label class="flex w-full items-center justify-between gap-2" for={id}>
							<div>{name}</div>
							<div class="text-2">+{bookmark_count}</div>
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
