<script lang="ts">
	import IconFolderClosed from '$lib/ui/icons/static/icon-folder-closed.svelte';
	import IconFolderOpen from '$lib/ui/icons/static/icon-folder-open.svelte';
	import type { ExpandedBookmarkFoldersRecord, ExpandedBookmarksRecord } from '../types';

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
	<a
		href="/inspiratheque/explorateur"
		class={['link-hover flex items-center gap-1', folders.length ? 'text-2' : '']}
	>
		<img src="/icons/people.webp" alt="root" class="size-8" />:
	</a>
	{#each folders as crumb, i}
		<span class="mx-2- text-current/20">\</span>

		{#if i < folders.length - 1}
			<IconFolderClosed />
			<a href="/inspiratheque/explorateur/{crumb.id}" class="text-2 hover:underline">
				{crumb.title}
			</a>
		{:else}
			<IconFolderOpen />
			<a href="/inspiratheque/explorateur/{crumb.id}" class="text-current hover:underline"
				>{crumb.title}</a
			>
		{/if}
	{/each}
</nav>
