<script lang="ts">
	import { goto } from '$app/navigation';
	import { pocketbase } from '$lib/pocketbase';
	import IconExternalLink from '$lib/ui/icons/icon-external-link.svelte';
	import IconFolder from '$lib/ui/icons/icon-folder.svelte';
	import IconLink from '$lib/ui/icons/icon-link.svelte';
	import Breadcrumbs from './breadcrumbs.svelte';
	import type { Explorer } from './explorer.svelte';
	import type { ExpandedBookmarkFoldersRecord, ExpandedBookmarksRecord } from './types';

	const {
		explorer
	}: { explorer: Explorer<ExpandedBookmarksRecord | ExpandedBookmarkFoldersRecord> } = $props();

	const { navigation, breadcrumbs, inspecting, params, children_count } = $derived(explorer);

	function is_bookmark(
		item: ExpandedBookmarksRecord | ExpandedBookmarkFoldersRecord
	): item is ExpandedBookmarksRecord {
		return 'url' in item;
	}

	function inspect(id: string) {
		if (!id) goto('/inspiratheque');
		goto('/inspiratheque/' + id);
	}

	// 	function new_item(folder_i: number) {
	// 	let parent: ExpandedBookmarkFoldersRecord | null = null;

	// 	if (folder_i > 0) {
	// 		const parent_id = breadcrumbs[folder_i - 1]?.id;
	// 		parent = folders.find((t) => t.id === parent_id) ?? null;
	// 	}
	// 	dialog_create = {
	// 		open: true,
	// 		parent
	// 	};
	// }
</script>

<div>
	<Breadcrumbs {breadcrumbs} />
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div class="grid-12 mt-6 whitespace-nowrap select-none">
		{#each navigation as col, i}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<section class="col-span-2">
				<!-- <div class="flex">
						{@render new_item_button(i)}
					</div> -->

				{#each col as item}
					<div
						class={[
							'group cursor-default- flex w-full cursor-pointer items-center gap-layout-x border-b px-2 py-1 hover:border-current',
							params?.includes(item.id)
								? params?.[params.length - 1] == item.id
									? 'border-current bg-current/20'
									: 'border-current bg-current/10'
								: 'underline- border-transparent hover:bg-current/5 ',
							''
						]}
						onclick={() => inspect(item.id)}
					>
						<div class="flex w-6 items-center justify-center">
							{#if is_bookmark(item)}
								{#if item.favicon}
									<div>
										<img
											alt="favicon"
											class="size-4"
											src={pocketbase.files.getURL(item, item.favicon)}
										/>
									</div>
								{:else}
									<div class="opacity-60"><IconLink /></div>
								{/if}
							{:else if params?.includes(item.id)}
								<img src="/icons/folder_open.webp" alt="icon-folder-open" />
							{:else}
								<img src="/icons/folder_closed.webp" alt="icon-folder-closed" />
							{/if}
						</div>
						<div class="relative w-full max-w-full min-w-0 overflow-hidden text-ellipsis">
							{item.title}
						</div>

						<div class="text-2 text-right hover:text-text">
							{#if is_bookmark(item)}
								<div class="invisible -mr-1 flex justify-end text-lg group-hover:visible">
									<a target="_blank" href={item.url}>
										<IconExternalLink />
									</a>
								</div>
							{:else if children_count.get(item.id)}
								+{children_count.get(item.id)}
							{/if}
						</div>
					</div>
				{/each}
			</section>
		{/each}
		<!-- <section>
				<table>
					<tbody>
						<tr>
							<td>
								{@render new_item_button(navigation.length)}
							</td>
						</tr>
					</tbody>
				</table>
			</section> -->
	</div>
</div>
