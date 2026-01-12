<script lang="ts">
	import Author from '$lib/components/author.svelte';
	import Comment from '$lib/components/comments/comment.svelte';
	import Comments from '$lib/components/comments/comments.svelte';
	import { pocketbase } from '$lib/pocketbase';
	import type { CommentsRecord } from '$lib/pocketbase.types';
	import IconCopy from '$lib/ui/icons/icon-copy.svelte';
	import IconExternalLink from '$lib/ui/icons/icon-external-link.svelte';
	import { format_time } from '$lib/utils/format-date';
	import { onDestroy } from 'svelte';
	import Description from '../+/description.svelte';
	import type { ExpandedBookmarksRecord } from '../types';
	import Buttons from '../+/buttons.svelte';
	import Likes from '../+/likes.svelte';

	const {
		item
	}: {
		item: ExpandedBookmarksRecord;
	} = $props();
</script>

<div class="grid- grid-rows-[1fr_auto_auto]- gap-6 pb-1">
	<div class="min-h-36">
		<Description {item} />
	</div>

	<div class="mb-1.5">
		<div class="flex items-center justify-between pb-1">
			<a href={item.url}>
				{item.url}
			</a>

			<!-- <a href={bookmark.url} target="_blank">{bookmark.url}</a> -->
			<Buttons {item} />
		</div>
		<div class="bg-black/10 max-lg:hidden" style="aspect-ratio: 128/80">
			{#if item.screenshot}
				<img src={pocketbase.files.getURL(item, item.screenshot)} alt="screenshot" />
			{/if}
		</div>
	</div>
	<div class="flex gap-1.5 pb-2">
		{#each item.expand?.tags as tag}
			<div class="w-fit bg-text px-1 py-0.5 text-bg lowercase">#{tag.name}</div>
		{/each}
	</div>
	<Likes {item} />

	<div class="mt-0.5 max-lg:hidden">
		<div class="mb-12">
			<div class="text-2 inline">[{format_time(item.created)}]</div>
			<div class="inline">Ajouté par <Author author={item.author} /></div>
		</div>
		<div class="mb-12">
			{#key item.id}
				<Comments parent={item.id} collection="bookmarks" />
			{/key}
		</div>

		<!-- {#if item}
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
			{/if} -->

		<!-- <div class="text-right"><Button size="md" onclick={() => {}}>Suggérer un lien</Button></div> -->
	</div>
</div>
