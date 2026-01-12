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
	import Description from '../description.svelte';
	import type { ExpandedBookmarksRecord } from '../types';

	const {
		item
	}: {
		item: ExpandedBookmarksRecord;
	} = $props();

	// 2. Tracking variables for debouncing
	let accumulatedIncrement = 0;
	let timer: ReturnType<typeof setTimeout> | undefined;

	async function save_likes_to_db() {
		console.log('saving likes');
		if (accumulatedIncrement === 0) return;

		const amountToAdd = accumulatedIncrement;
		// Reset the accumulator immediately to handle clicks
		// that happen while the request is in flight
		accumulatedIncrement = 0;

		try {
			await pocketbase.collection('bookmarks').update(item.id, {
				'likes+': amountToAdd
			});
		} catch (error) {
			console.error('Failed to save likes:', error);
			// Optional: Rollback UI state if the request fails
			// likes -= amountToAdd;
		}
	}

	function like() {
		// Update UI instantly
		if (!item.likes) item.likes = 0;
		item.likes++;

		// Add to the batch update
		accumulatedIncrement++;

		// Clear existing timer and start a new one
		clearTimeout(timer);
		timer = setTimeout(save_likes_to_db, 1000); // Wait 1 second of inactivity
	}

	// 3. Cleanup: If the user leaves the page, try to save immediately
	onDestroy(() => {
		if (timer) {
			clearTimeout(timer);
			save_likes_to_db();
		}
	});
	// as CommentsRecord
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
			<div class="flex gap-2 text-2xl">
				<button
					onclick={() => navigator.clipboard.writeText(item.url)}
					class="flex p-0.5 hover:bg-text hover:text-bg"
				>
					<IconCopy />
				</button>
				<a class="flex p-0.5 hover:bg-text hover:text-bg" href={item.url} target="_blank">
					<IconExternalLink />
				</a>
			</div>
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
	<button
		onclick={like}
		class="group flex w-full cursor-pointer items-center justify-between gap-0.5 p-0.5 text-4xl hover:bg-text hover:text-bg"
	>
		<span class="invisible px-1 font-serif group-hover:visible">+1</span>

		<div class="flex items-center p-0.5 px-2.5">
			<span class="text-4xl">❤️</span>
			<span class="font-serif">
				{item.likes || 0}
			</span>
		</div>
	</button>

	<div class="mt-0.5 max-lg:hidden">
		<div class="mb-12">
			<div class="text-2 inline">[{format_time(item.created)}]</div>
			<div class="inline">Ajouté par <Author author={item.author} /></div>
		</div>
		<div class="mb-12">
			{#key item.id}
				<Comments
					parent={item.id}
					collection="bookmarks"
					system_ctx_comment={{
						body: `Lien ajouté par <${item.author}>`,
						created: item.created
					}}
				/>
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
