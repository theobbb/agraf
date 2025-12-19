<script lang="ts">
	import Markdown from '$lib/markdown.svelte';
	import { pocketbase } from '$lib/pocketbase';
	import IconCopy from '$lib/ui/icons/icon-copy.svelte';
	import IconExternalLink from '$lib/ui/icons/icon-external-link.svelte';
	import IconLink from '$lib/ui/icons/icon-link.svelte';
	import type { ExpandedBookmarksRecord } from './types';

	const { bookmark }: { bookmark: ExpandedBookmarksRecord } = $props();
</script>

<div class="grid-12 mt-24 border-t pt-1.5">
	<div class="col-span-3">
		<a href={bookmark.url} target="_blank">{bookmark.url}</a>
		<div class="mt-2 flex gap-2 text-2xl">
			<button>
				<IconCopy />
			</button>
			<a href={bookmark.url} target="_blank">
				<IconExternalLink />
			</a>
		</div>
	</div>

	<div class="col-span-4 flex gap-layout-x">
		<div>
			{#if bookmark.favicon}
				<div>
					<img
						alt="favicon"
						class="size-4"
						src={pocketbase.files.getURL(bookmark, bookmark.favicon)}
					/>
				</div>
			{:else}
				<div class="opacity-60"><IconLink /></div>
			{/if}
		</div>
		<div class="max-w-md">
			<div>{bookmark.title}</div>
			<div>
				<div class="text-2">
					<Markdown content={bookmark.description || ''} />
				</div>
			</div>
		</div>
	</div>

	<div class="col-span-4">
		{#each bookmark.expand?.tags as tag}
			<div class="w-fit bg-text px-1 text-bg">{tag.name}</div>
		{/each}
	</div>
	<div>
		<div>Report broken link</div>
		<div>Nouveau lien</div>
		<div>Suggerer une modification</div>
	</div>
</div>
