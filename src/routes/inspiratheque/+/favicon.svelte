<script lang="ts">
	import type { BookmarksRecord } from '$lib/pocketbase.types';
	import IconLink from '$lib/ui/icons/icon-link.svelte';

	const { bookmark }: { bookmark: BookmarksRecord } = $props();
</script>

{#if bookmark.favicon}
	<div>
		<img
			alt="favicon-{bookmark.title}"
			class="size-4"
			src="https://api.agraf.xyz/api/files/bookmarks/{bookmark.id}/{bookmark.favicon}"
		/>
	</div>
{:else}
	<div class="opacity-60"><IconLink /></div>
{/if}
