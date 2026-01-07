<script lang="ts">
	import Markdown from '$lib/markdown.svelte';
	import { pocketbase } from '$lib/pocketbase';
	import IconCopy from '$lib/ui/icons/icon-copy.svelte';
	import IconExternalLink from '$lib/ui/icons/icon-external-link.svelte';
	import IconLink from '$lib/ui/icons/icon-link.svelte';
	import IconFolderClosed from '$lib/ui/icons/static/icon-folder-closed.svelte';
	import IconFolderOpen from '$lib/ui/icons/static/icon-folder-open.svelte';

	import { format_date } from '$lib/utils/format-date';
	import Description from '../description.svelte';
	import type { ExpandedBookmarkFoldersRecord, ExpandedBookmarksRecord } from '../types';

	const {
		item
	}: {
		item: ExpandedBookmarksRecord | ExpandedBookmarkFoldersRecord | undefined;
	} = $props();

	function is_bookmark(
		item: ExpandedBookmarksRecord | ExpandedBookmarkFoldersRecord
	): item is ExpandedBookmarksRecord {
		return 'url' in item;
	}
</script>

<div class="h-full px-gap pt-1.5 pb-2">
	<div class="grid h-full grid-rows-[1fr_auto_auto] gap-6">
		{#if item}
			<Description {item} />
			{#if is_bookmark(item)}
				<div>
					<div class="flex items-center justify-between pb-1">
						<a href={item.url}>
							{item.url}
						</a>

						<!-- <a href={bookmark.url} target="_blank">{bookmark.url}</a> -->
						<div class="flex gap-2 text-2xl">
							<button class="flex">
								<IconCopy />
							</button>
							<a class="flex" href={item.url} target="_blank">
								<IconExternalLink />
							</a>
						</div>
					</div>
					<div class=" bg-black/10 max-lg:hidden" style="aspect-ratio: 128/80">
						{#if item.screenshot}
							<img src={pocketbase.files.getURL(item, item.screenshot)} alt="screenshot" />
						{/if}
					</div>
				</div>
			{/if}
		{/if}

		<div class="max-lg:hidden">
			{#if item}
				{#if is_bookmark(item)}
					<div class="flex gap-4 pb-2">
						{#each item.expand?.tags as tag}
							<div class="w-fit bg-text px-1 py-0.5 text-bg">{tag.name}</div>
						{/each}
					</div>
					<div class="grid-12 border-t pt-1">
						<div class="text-2 col-span-6">
							Ajouté le {format_date(item.created)}
						</div>
						<div class="col-span-6 space-y-0.5">
							<div>Lien brisé?</div>
							<div>Nouveau lien</div>
							<div>Suggérer une modification</div>
						</div>
					</div>
				{/if}
			{/if}

			<!-- <div class="text-right"><Button size="md" onclick={() => {}}>Suggérer un lien</Button></div> -->
		</div>
	</div>
</div>
