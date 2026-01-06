<script lang="ts">
	import type { WindowManager } from '$lib/components/windows/window-manager.svelte';
	import { pocketbase } from '$lib/pocketbase';
	import Input from '$lib/ui/input.svelte';
	import { format_date } from '$lib/utils/format-date';
	import { getContext } from 'svelte';
	import Breadcrumbs from '../explorateur/breadcrumbs.svelte';
	import type { Windows } from '../windows/types';
	import IconFolderClosed from '$lib/ui/icons/static/icon-folder-closed.svelte';
	import Button from '$lib/ui/button.svelte';

	const { data } = $props();

	// const window_manager: WindowManager<Windows> = getContext('window_manager');
	// window_manager.close_window('info');
</script>

<div class="mb-24">
	<!-- <Input placeholder="Rechercher..." /> -->
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
</div>
<div class="space-y-2.5">
	{#each data.pagination_bookmarks.items as item}
		<div class="grid-12">
			<div class="col-span-3 mr-12 text-balance">
				<div>{item.title}</div>
				<div class="text-2">{item.description}</div>

				<div></div>
			</div>

			<div class="col-span-2" style="aspect-ratio: 128/80">
				{#if item.screenshot}
					<img
						class="max-h-48 object-contain"
						src={pocketbase.files.getURL(item, item.screenshot)}
						loading="lazy"
						alt="screenshot-{item.title}"
					/>
				{:else}
					<div class="h-full w-full bg-black/10"></div>
				{/if}
			</div>
			<div class="col-span-4">
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
						<div>{tag.name}</div>
					{/each}
				</div>

				<div class="hidden">
					<Button variant="icon">
						<!-- <div class="flex size-5 items-center justify-center">+</div> -->
						<img src="/icons/search.webp" class="size-5" />
					</Button>
				</div>
			</div>
			<div class="col-span-2">
				<div>{format_date(item.created)}</div>
				<div class="">&lt;{item.author || 'anonyme'}&gt;</div>
			</div>
		</div>
	{/each}
</div>
