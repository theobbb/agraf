<script lang="ts">
	import Table from './table.svelte';
	import InspectorBookmark from './inspector-bookmark.svelte';
	import InspectorFolder from './inspector-folder.svelte';
	import type { BookmarksRecord } from '$lib/pocketbase.types';
	import { use_explorer } from './ctx.svelte';
	import { is_bookmark } from '../ctx.svelte';
	import Breadcrumbs from './breadcrumbs.svelte';

	const { data } = $props();
	const { bookmarks, folders, folder_count, tags } = data;

	// const items: (ExpandedBookmarksRecord | ExpandedBookmarkFoldersRecord)[] = $derived([
	// 	...folders,
	// 	...bookmarks
	// ]);

	const explorer = use_explorer();
	if (!explorer.initialized) explorer.init({ bookmarks, folders, folder_count });

	const { inspecting, breadcrumbs } = $derived(explorer);

	function onkeydown(event: KeyboardEvent) {
		const keys = {
			ArrowUp: 'up',
			ArrowDown: 'down',
			ArrowLeft: 'left',
			ArrowRight: 'right'
		} as const;
		const key = event.key as keyof typeof keys;

		if (keys[key]) {
			event.preventDefault();
			// 2. keys[key] is now strictly 'top' | 'down' | 'left' | 'right'
			explorer.navigate(keys[key]);
		}
	}
	$effect(() => {
		window.addEventListener('keydown', onkeydown);
		return () => {
			window.removeEventListener('keydown', onkeydown);
		};
	});
</script>

<div
	class="overflow-hidden- grid h-[calc(100vh-10.5rem)] grid-rows-[auto_1fr] pb-gap max-lg:-mt-10"
>
	<div class="grid-12 mb-gap">
		<div class="col-span-5 flex items-center gap-4 max-lg:order-2">
			<Breadcrumbs {breadcrumbs} />
		</div>
	</div>
	<div
		class="relative grid h-full border-t max-lg:-mx-gap max-lg:grid-rows-[1fr_20vh] lg:-ml-gap lg:grid-cols-[5fr_2fr]"
	>
		<Table {explorer} {tags} />
		<div class="relative h-full min-h-0 max-lg:border-t lg:border-l">
			<div class="relative -mr-gap h-full overflow-y-auto pr-gap">
				<div class="absolute inset-0 px-gap pt-1.5 pb-2">
					{#if inspecting}
						{#if is_bookmark(inspecting)}
							<InspectorBookmark item={inspecting} />
						{:else}
							<InspectorFolder item={inspecting} />
						{/if}
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<svelte:head>
	<title>AGRAF 🕺 Inspirathèque</title>
	<style>
		html {
			--color-bg: #3c294b;
			--color-text: #bdde71;
		}
	</style>
</svelte:head>
