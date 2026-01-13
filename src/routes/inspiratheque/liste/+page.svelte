<script lang="ts">
	import { format_time } from '$lib/utils/format-date';
	import Button from '$lib/ui/button.svelte';
	import Pagination from '$lib/components/pagination.svelte';
	import Description from '../+/description.svelte';
	import Author from '$lib/components/author.svelte';
	import Buttons from '../+/buttons.svelte';
	import { use_flat_list } from '../ctx.svelte';
	import IconFolderClosed from '$lib/ui/icons/static/icon-folder-closed.svelte';

	const { data } = $props();
	const { bookmarks, tags_map } = data;

	const list_ctx = use_flat_list();
	if (!list_ctx.initialized) list_ctx.init(bookmarks);

	const { list } = $derived(list_ctx);

	// const window_manager: WindowManager<Windows> = getContext('window_manager');
	// window_manager.close_window('info');
</script>

<!-- <Input placeholder="Rechercher..." /> -->
<!-- <div class="mb-24">
	
	<div class="">
		<div class="flex flex-wrap gap-x-4 font-serif">
			{#each data.tags as tag}
				<div class="flex items-center gap-1 whitespace-nowrap">
					<div>#</div>
					<div>{tag.name}</div>
				</div>
			{/each}
		</div>
	</div>
</div> -->
<!-- <div class="font-serif">{data.pagination_bookmarks.totalItems} liens</div> -->
<div class="mt-8 space-y-2.5 divide-y divide-dashed">
	{#each list.items as item}
		<div class="grid-12">
			<div class="col-span-full text-balance lg:col-span-3">
				<Description {item} />
				<!-- <div>{item.title}</div>
				<div class="text-2">{item.description}</div>

				<div></div> -->
			</div>

			<a class="col-span-full aspect-128/80 lg:col-span-2" style="" href={item.url} target="_blank">
				{#if item.screenshot}
					<img
						class="max-h-48 object-contain"
						src="https://api.agraf.xyz/api/files/bookmarks/{item.id}/{item.screenshot}"
						loading="lazy"
						alt="screenshot-{item.title}"
					/>
				{:else}
					<div class="h-full w-full bg-black/10"></div>
				{/if}
			</a>

			<div class="col-span-full lg:col-span-4">
				<Buttons {item} />
				<!-- <div>{item.expand.parent?.path}</div>

				<div class="flex items-center gap-2">
					<IconFolderClosed />
					<a href="/inspiratheque/explorateur/{item.parent || ''}" class="hover:underline">
						{item.expand.parent?.title || 'root'}
					</a>
				</div> -->

				<div>
					{#each item.tags as tag_id}
						<a href="/inspiratheque/liste?tag={tag_id}">#{tags_map.get(tag_id)?.name}</a>
					{/each}
				</div>

				<div class="hidden">
					<Button variant="icon">
						<!-- <div class="flex size-5 items-center justify-center">+</div> -->
						<img src="/icons/search.webp" class="size-5" />
					</Button>
				</div>
			</div>
			<div class="col-span-full lg:col-span-3">
				<div class="text-2 inline-">[{format_time(item.created)}]</div>
				<div class="inline-">Ajouté par <Author author={item.author} /></div>
			</div>
		</div>
	{/each}
</div>
<Pagination pagination={list} route="/inspiratheque/liste" />
