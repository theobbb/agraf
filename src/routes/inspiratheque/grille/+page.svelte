<script lang="ts">
	import { pocketbase } from '$lib/pocketbase';
	import Pagination from '$lib/components/pagination.svelte';
	import Description from '../+/description.svelte';
	import { use_flat_list } from '../ctx.svelte';

	const { data } = $props();

	const list_ctx = use_flat_list();
	if (!list_ctx.initialized) list_ctx.init(data.bookmarks);

	const { list } = $derived(list_ctx);
</script>

<div class="grid-12 mt-8">
	{#each list.items as item}
		<div class="col-span-6 sm:col-span-6 lg:col-span-4 xl:col-span-3">
			<a href={item.url} target="_blank">
				<div class="" style="aspect-ratio: 128/80">
					{#if item.screenshot}
						<img
							class="max-h-48- object-contain"
							src="https://api.agraf.xyz/api/files/bookmarks/{item.id}/{item.screenshot}"
							loading="lazy"
							alt="screenshot-{item.title}"
						/>
					{:else}
						<div class="h-full w-full bg-black/10"></div>
					{/if}
				</div>
			</a>
			<div class="mr-12- col-span-3 mt-1 text-balance">
				<Description {item} />
			</div>
			<br />
			<!-- <div class="col-span-4">
				<a href={item.url}>{item.url}</a>
				<div>{item.expand.parent?.path}</div>

				<div class="flex items-center gap-2">
					<IconFolderClosed />
					<a href="/inspiratheque/explorateur/{item.parent || ''}" class="hover:underline">
						{item.expand.parent?.title || 'root'}
					</a>
				</div>

				<div>
					{#each item.expand.tags as tag}
						<a href="/inspiratheque/liste?tag={tag.id}">#{tag.name}</a>
					{/each}
				</div>
			</div> -->
		</div>

		<!-- <div class="col-span-2">
			<div>{format_date(item.created)}</div>
			<div class="">&lt;{item.author || 'anonyme'}&gt;</div>
		</div> -->
	{/each}
</div>
<Pagination pagination={list} route="/inspiratheque/liste" />
