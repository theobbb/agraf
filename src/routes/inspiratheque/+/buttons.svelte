<script lang="ts">
	import type { BookmarksRecord } from '$lib/pocketbase.types';
	import IconCopy from '$lib/ui/icons/icon-copy.svelte';
	import IconExternalLink from '$lib/ui/icons/icon-external-link.svelte';

	const { item }: { item: BookmarksRecord } = $props();
</script>

<div class="flex gap-1 text-2xl">
	<button
		onclick={() => navigator.clipboard.writeText(item.url)}
		class="flex cursor-pointer p-0.5 hover:bg-text hover:text-bg"
	>
		<IconCopy />
	</button>
	<a class="flex p-0.5 hover:bg-text hover:text-bg" href={item.url} target="_blank">
		<IconExternalLink />
	</a>
</div>
