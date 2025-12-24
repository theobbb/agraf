<script lang="ts">
	import type { ExpandedBookmarkFoldersRecord, ExpandedBookmarksRecord } from './types';

	const {
		breadcrumbs
	}: { breadcrumbs: (ExpandedBookmarksRecord | ExpandedBookmarkFoldersRecord)[] } = $props();

	const folders: ExpandedBookmarkFoldersRecord[] = $derived(
		breadcrumbs.filter((item) => !is_bookmark(item))
	);

	function is_bookmark(
		item: ExpandedBookmarksRecord | ExpandedBookmarkFoldersRecord
	): item is ExpandedBookmarksRecord {
		return 'url' in item;
	}
</script>

<nav class="flex items-center gap-2">
	<a href="/inspiratheque" class={['link-hover', folders.length ? 'text-2' : '']}>A:</a>
	{#each folders as crumb, i}
		<span class="mx-2- text-current/20">\</span>

		{#if i < folders.length - 1}
			<a href="/inspiratheque/{crumb.id}" class="text-2 hover:underline">
				{crumb.title}
			</a>
		{:else}
			<span class="text-current">{crumb.title}</span>
		{/if}
	{/each}
</nav>
