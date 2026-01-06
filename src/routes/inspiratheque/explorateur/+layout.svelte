<script lang="ts">
	import { create_explorer } from './explorer.svelte';
	import type { ExpandedBookmarkFoldersRecord, ExpandedBookmarksRecord } from '../types';
	import Button from '$lib/ui/button.svelte';
	import Emoji from '$lib/emoji.svelte';
	import Table from './table.svelte';

	import {
		get_window_manager,
		type WindowManager
	} from '$lib/components/windows/window-manager.svelte';

	import Inspector from './inspector.svelte';
	import Breadcrumbs from './breadcrumbs.svelte';

	import IconArrowBoxLeft from '$lib/ui/icons/icon-arrow-box-left.svelte';
	import IconArrowBoxRight from '$lib/ui/icons/icon-arrow-box-right.svelte';
	import IconArrowBoxUp from '$lib/ui/icons/icon-arrow-box-up.svelte';
	import IconInfo from '$lib/ui/icons/icon-info.svelte';
	import Input from '$lib/ui/input.svelte';
	import { getContext } from 'svelte';
	import type { Windows } from '../windows/types';

	const { data } = $props();

	const { bookmarks, folders, tags } = data;

	// const window_manager: WindowManager<Windows> = getContext('window_manager');
	// window_manager.open_window('info');

	const items: (ExpandedBookmarksRecord | ExpandedBookmarkFoldersRecord)[] = [
		...folders,
		...bookmarks
	];

	const explorer = create_explorer<ExpandedBookmarksRecord | ExpandedBookmarkFoldersRecord>(items);

	const { navigation, breadcrumbs, inspecting, params, children_count } = $derived(explorer);

	type EditorType = 'folder' | 'bookmark';
	let creating_type: EditorType = $state('bookmark');

	let dialog_create: {
		open: boolean;
		parent: ExpandedBookmarkFoldersRecord | 'root';
	} = $state({
		open: false,
		parent: 'root'
	});

	// function new_sub_item(type: EditorType) {
	// 	if (!inspecting) return;
	// 	creating_type = type;
	// 	explorer.actions.new_sub_item(inspecting);
	// }

	function open_submitter() {
		function get_parent() {
			if (!inspecting) return 'root';

			if (!is_bookmark(inspecting)) return inspecting;

			const parent = folders.find((f) => f.id == inspecting.parent);
			if (!parent) return 'root';

			return parent;
		}

		dialog_create.parent = get_parent();
		dialog_create.open = true;
	}

	function is_bookmark(
		item: ExpandedBookmarksRecord | ExpandedBookmarkFoldersRecord
	): item is ExpandedBookmarksRecord {
		return 'url' in item;
	}

	// function toggle_info() {
	// 	if (window_manager.windows['info']?.closed) window_manager.open_window('info');
	// 	else window_manager.close_window('info');
	// }

	// function toggle_window_tags() {
	// 	if (window_manager.windows['tags']?.closed) {
	// 		if (!explorer.tag_count) {
	// 			explorer.set_tag_count(expand_tags());
	// 		}
	// 		window_manager.open_window('tags');
	// 	} else window_manager.close_window('tags');
	// }

	function expand_tags() {
		const count = new Map();
		for (const bookmark of bookmarks) {
			for (const tag of bookmark.expand?.tags ?? []) {
				count.set(tag.id, (count.get(tag.id) || 0) + 1);
			}
		}
		console.log(count);
		return count;
	}
</script>

<!-- <div class=" fixed top-2 right-96 z-200">
	<Button variant="icon" class=" cursor-pointer text-3xl">
		<img src="/icons/help_book.webp" class="size-8" />
	
	</Button>
</div> -->

<!-- <Recent bookmarks={bookmarks.slice(0, 5)} /> -->
<div class="grid h-[calc(100vh-9rem)] grid-rows-[auto_1fr] pb-gap max-lg:-mt-10">
	<!-- <div class="mb-12 flex gap-4">
		<div>
			<Button size="md" onclick={() => (dialog_create.open = true)}>Suggérer un lien</Button>
		</div>
	</div> -->
	<div class="grid-12 mb-3">
		<div class="col-span-5 flex items-center gap-4 max-lg:order-2">
			<!-- <div class="flex items-center gap-2 text-2xl max-lg:hidden">
				<IconArrowBoxLeft />
				<IconArrowBoxRight />

				<IconArrowBoxUp />
			</div> -->
			<Breadcrumbs {breadcrumbs} />
		</div>
		<!-- <div class="col-span-5 flex gap-3">
			{#each tags as tag}
				<div>{tag.name}</div>
			{/each}
		</div> -->

		<div class="items-center- col-span-5 flex gap-2">
			<!-- <div class="shrink-0"><Button class="aspect-square h-full" variant="icon">(+)</Button></div> -->

			<div class="flex shrink-0 items-center gap-2">
				<!-- <Button onclick={toggle_window_tags} class="aspect-square h-full shrink-0" variant="icon"
					>#</Button
				> -->
				<Button class="shrink-0" variant="icon"
					><img src="/icons/folder-search.webp" class="size-6" /></Button
				>
				<!-- <Button class="shrink-0" onclick={() => toggle_info()} variant="icon"
					><img src="/icons/help_book.webp" class="size-6" /></Button
				> -->
			</div>
			<!-- <div
				class="relative flex items-center gap-1 overflow-x-auto border-x px-2 py-4 whitespace-nowrap"
			>
				{#each tags as tag}
					<div class="bg-text px-1 text-bg">{tag.name}</div>
				{/each}
			</div> -->
			<!-- <Input id="search" name="search" placeholder="Rechercher..." /> -->
			<!-- <div class="shrink-0">{bookmarks.length} liens</div> -->
		</div>

		<!-- <div class="lg:col-start-10- col-span-full flex items-center justify-end lg:col-span-2">
			<Button size="md" onclick={open_submitter}>Soumettre un lien</Button>
		</div> -->
	</div>
	<div
		class="relative grid h-full border-t max-lg:-mx-gap max-lg:grid-rows-[1fr_20vh] lg:-ml-gap lg:grid-cols-[5fr_2fr]"
	>
		<Table {explorer} {tags} />
		<div class=" max-lg:border-t lg:border-l">
			<Inspector item={inspecting} />
		</div>
	</div>
	<!-- {#if inspecting}
		<Inspector bookmark={inspecting} />

	{/if} -->
</div>
<!-- <div class="gap-1- my-24 flex flex-wrap whitespace-pre">
	{#each tags as tag}
		<div class="rounded py-0.5">{tag.name}, {' '}</div>
	{/each}
</div> -->

<svelte:head>
	<title>AGRAF 🕺 Inspirathèque</title>
	<style>
		html {
			--color-bg: #3c294b;
			--color-text: #bdde71;
		}
	</style>
</svelte:head>
