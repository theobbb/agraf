<script lang="ts">
	import type { WindowManager } from '$lib/components/windows/window-manager.svelte';
	import Window from '$lib/components/windows/window.svelte';
	import Markdown from '$lib/markdown.svelte';
	import { pocketbase } from '$lib/pocketbase';
	import IconCopy from '$lib/ui/icons/icon-copy.svelte';
	import IconExternalLink from '$lib/ui/icons/icon-external-link.svelte';
	import IconLink from '$lib/ui/icons/icon-link.svelte';
	import Input from '$lib/ui/input.svelte';
	import { format_date } from '$lib/utils/format-date';
	import type { ExpandedBookmarkFoldersRecord, ExpandedBookmarksRecord } from '../types';
	import type { Windows } from './types';

	const {
		item,
		manager
	}: {
		item: ExpandedBookmarksRecord | ExpandedBookmarkFoldersRecord | undefined;
		manager: WindowManager<Windows>;
	} = $props();
</script>

<div class="absolute right-12 bottom-24">
	<Window class="h-96- w-xl" hidden={!item} title={item?.title || ''} {manager} id="inspector">
		{#snippet header()}
			{#if item}
				<div class="flex items-center gap-2">
					{#if item.favicon}
						<div>
							<img alt="favicon" class="size-4" src={pocketbase.files.getURL(item, item.favicon)} />
						</div>
					{:else}
						<div class="opacity-60"><IconLink /></div>
					{/if}
					<div>{item.title}</div>
				</div>
			{/if}
		{/snippet}
		{#if item}
			<div class="mt-1 mb-12">
				<div class="grid-12">
					<div class="col-span-8 flex gap-layout-x">
						<div class="max-w-md">
							<div>
								<div class="text-2">
									<Markdown content={item.description || ''} />
								</div>
							</div>
						</div>
					</div>
					<div class="col-span-4 mb-12 text-right">
						<!-- <a href={bookmark.url} target="_blank">{bookmark.url}</a> -->
						<div class="mt-2 flex justify-end gap-2 text-2xl">
							<button>
								<IconCopy />
							</button>
							<a href={item.url} target="_blank">
								<IconExternalLink />
							</a>
						</div>
					</div>
				</div>
				<div class="flex gap-4 pb-2">
					{#each item.expand?.tags as tag}
						<div class="w-fit bg-text px-1 py-0.5 text-bg">{tag.name}</div>
					{/each}
				</div>
				<div class="grid-12 border-t pt-1">
					<div class="text-2 col-span-6">
						Ajouté le {format_date(item.created)}
					</div>
					<div class="col-span-6">
						<div>Lien brisé?</div>
						<div>Nouveau lien</div>
						<div>Suggérer une modification</div>
					</div>
				</div>
			</div>
		{/if}
	</Window>
</div>
