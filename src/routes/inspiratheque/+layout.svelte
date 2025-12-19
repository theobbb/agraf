<script lang="ts">
	import { create_explorer } from './explorer.svelte';
	import type { ExpandedBookmarkFoldersRecord, ExpandedBookmarksRecord } from './types';

	import IconLink from '$lib/ui/icons/icon-link.svelte';
	import IconFolder from '$lib/ui/icons/icon-folder.svelte';

	import Button from '$lib/ui/button.svelte';
	import { pocketbase } from '$lib/pocketbase';
	import Emoji from '$lib/emoji.svelte';
	import IconAdd from '$lib/ui/icons/icon-add.svelte';
	import Markdown from '$lib/markdown.svelte';
	import Breadcrumbs from './breadcrumbs.svelte';
	import DialogCreate from './dialog-create.svelte';
	import Inspector from './inspector.svelte';
	import { goto } from '$app/navigation';
	import Recent from './recent.svelte';
	import IconExternalLink from '$lib/ui/icons/icon-external-link.svelte';

	const { data } = $props();

	const { bookmarks, folders, tags } = data;

	const items: (ExpandedBookmarksRecord | ExpandedBookmarkFoldersRecord)[] = [
		...bookmarks,
		...folders
	];

	const explorer = create_explorer<ExpandedBookmarkFoldersRecord | ExpandedBookmarkFoldersRecord>(
		items
	);

	const { navigation, breadcrumbs, inspecting, params, children_count } = $derived(explorer);

	type EditorType = 'folder' | 'bookmark';
	let creating_type: EditorType = $state('bookmark');

	let dialog_create: {
		open: boolean;
		parent: ExpandedBookmarkFoldersRecord | null;
	} = $state({
		open: false,
		parent: null
	});

	function new_item(folder_i: number) {
		let parent: ExpandedBookmarkFoldersRecord | null = null;

		if (folder_i > 0) {
			const parent_id = breadcrumbs[folder_i - 1]?.id;
			parent = folders.find((t) => t.id === parent_id) ?? null;
		}
		dialog_create = {
			open: true,
			parent
		};
	}
	// function new_sub_item(type: EditorType) {
	// 	if (!inspecting) return;
	// 	creating_type = type;
	// 	explorer.actions.new_sub_item(inspecting);
	// }

	function is_bookmark(
		item: ExpandedBookmarksRecord | ExpandedBookmarkFoldersRecord
	): item is ExpandedBookmarksRecord {
		return item.collectionName == 'bookmarks';
	}

	function inspect(id: string) {
		if (!id) goto('/inspiratheque');
		goto('/inspiratheque/' + id);
	}
</script>

<Emoji>🕺</Emoji>

<!-- <div class="mb-32">
	L'inspiratheque est une librairie de signets entretenue par les etudiants du programme.
</div> -->

<!-- <Recent bookmarks={bookmarks.slice(0, 5)} /> -->

<div class="flex flex-col justify-between">
	<div>
		<Breadcrumbs {breadcrumbs} />
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div class="grid-12 whitespace-nowrap select-none">
			{#each navigation as col, i}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<section class="col-span-2">
					<div class="flex">
						{@render new_item_button(i)}
					</div>

					{#each col as item}
						<div
							class={[
								'group flex w-full cursor-default items-center gap-layout-x px-2 py-1',
								params?.includes(item.id)
									? params?.[params.length - 1] == item.id
										? 'bg-current/20'
										: 'bg-current/10'
									: 'hover:bg-current/5',
								'border-b-2- border-transparent first:border-t-2',

								'transition-all duration-100'
							]}
							onclick={() => inspect(item.id)}
						>
							<div class="flex w-5 items-center justify-center">
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
								{:else}
									<div class="opacity-60"><IconFolder /></div>
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

	{#if inspecting}
		<Inspector bookmark={inspecting} />
		<!-- {#if is_bookmark(inspecting)}
					<InspectorBookmark {explorer} {inspecting} />
				{:else}
					<InspectorFolder {explorer} {inspecting} {new_sub_item} />
				{/if} -->
	{/if}
</div>
<div class="gap-1- my-24 flex flex-wrap whitespace-pre">
	{#each tags as tag}
		<div class="rounded py-0.5">{tag.name}, {' '}</div>
	{/each}
</div>
{#if dialog_create.open}
	<DialogCreate parent={dialog_create.parent} onclose={() => (dialog_create.open = false)} />
{/if}

{#snippet new_item_button(i: number)}
	<button
		class="flex items-center justify-center px-2 py-1 text-lg text-current/40 hover:bg-current/10 hover:text-current"
		onclick={() => new_item(i)}
		style="box-shadow: inset 0 0 0 1px var(--color-background);"
	>
		<IconAdd />
	</button>
{/snippet}

<div class="h-[1000px]"></div>
<svelte:head>
	<title>AGRAF 🕺 Inspirathèque</title>
	<style>
		html {
			--color-bg: #3c294b;
			--color-text: #bdde71;
		}
	</style>
</svelte:head>

<style>
	td {
		height: 1.8rem;
		padding: 0 0.6rem;
	}
	td:first-child {
		padding: 0;
		width: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
