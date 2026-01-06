<script lang="ts">
	import type { ExpandedBookmarksRecord } from './types';

	const { bookmarks }: { bookmarks: ExpandedBookmarksRecord[] } = $props();
</script>

<div class="flex gap-8">
	{#each bookmarks as bookmark}
		<div>{bookmark.title}</div>
	{/each}
</div>
