<script lang="ts">
	import { pocketbase } from '$lib/pocketbase';
	import Pagination from '$lib/components/pagination.svelte';
	import Description from '../description.svelte';

	const { data } = $props();
</script>

<div class="grid-12 mt-8">
	{#each data.pagination_bookmarks.items as item}
		<div class="col-span-6 sm:col-span-6 lg:col-span-4 xl:col-span-3">
			<a href={item.url} target="_blank">
				<div class="" style="aspect-ratio: 128/80">
					{#if item.screenshot}
						<img
							class="max-h-48- object-contain"
							src={pocketbase.files.getURL(item, item.screenshot)}
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
<Pagination pagination={data.pagination_bookmarks} route="/inspiratheque/liste" />
