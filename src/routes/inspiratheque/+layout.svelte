<script lang="ts">
	import { create_explorer } from './explorer.svelte';
	import type { ExpandedBookmarkFoldersRecord, ExpandedBookmarksRecord } from './types';
	import Button from '$lib/ui/button.svelte';
	import Emoji from '$lib/emoji.svelte';
	import IconAdd from '$lib/ui/icons/icon-add.svelte';
	import DialogCreate from './dialog-create.svelte';
	import { goto } from '$app/navigation';
	import IconInfo from '$lib/ui/icons/icon-info.svelte';

	import Window from '$lib/components/windows/window.svelte';
	import Table from './table.svelte';
	import WindowSearch from './windows/window-search.svelte';
	import WindowInspector from './windows/window-inspector.svelte';
	import type { Windows } from './windows/types';
	import { get_window_manager } from '$lib/components/windows/window-manager.svelte';
	import WindowInfo from './windows/window-info.svelte';
	import WindowInstructions from './windows/window-instructions.svelte';
	import WindowSubmitter from './windows/window-submitter.svelte';
	import Taskbar from '$lib/components/windows/taskbar.svelte';
	import Inspector from './inspector.svelte';
	import Breadcrumbs from './breadcrumbs.svelte';
	import Footer from '../footer.svelte';
	import Input from '$lib/ui/input.svelte';
	import IconArrowBoxLeft from '$lib/ui/icons/icon-arrow-box-left.svelte';
	import IconArrowBoxRight from '$lib/ui/icons/icon-arrow-box-right.svelte';
	import IconArrowBoxUp from '$lib/ui/icons/icon-arrow-box-up.svelte';

	const { data } = $props();

	const { bookmarks, folders, tags } = data;

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

	const window_manager = get_window_manager<Windows>('inspiratheque');
</script>

<!-- <button class="cursor-pointer text-4xl" onclick={() => window_manager.open_window('intro')}>
	<IconInfo />
</button> -->
<Emoji>🕺</Emoji>
<!-- <Recent bookmarks={bookmarks.slice(0, 5)} /> -->
<div class="grid h-[calc(100vh-9rem)] grid-rows-[auto_1fr]">
	<!-- <div class="mb-12 flex gap-4">
		<div>
			<Button size="md" onclick={() => (dialog_create.open = true)}>Suggérer un lien</Button>
		</div>
	</div> -->
	<div class="grid-12 mb-3">
		<div class="flex items-center gap-2 text-2xl">
			<IconArrowBoxLeft />
			<IconArrowBoxRight />

			<IconArrowBoxUp />
		</div>
		<div class="col-span-4 flex items-center">
			<Breadcrumbs {breadcrumbs} />
		</div>
		<!-- <div class="col-span-5 flex gap-3">
			{#each tags as tag}
				<div>{tag.name}</div>
			{/each}
		</div> -->
		<!-- <div class="col-span-4">
			<Input id="search" name="search" placeholder="Rechercher..." />
		</div> -->
		<div class="col-span-3 col-start-10 flex items-center justify-end">
			<Button size="md" onclick={open_submitter}>Suggérer un lien</Button>
		</div>
	</div>
	<div class="grid grid-cols-[1fr_auto] border-t">
		<Table {explorer} {tags} />
		<div class="w-lg border-l">
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
{#if dialog_create.open}
	<WindowSubmitter parent={dialog_create.parent} onclose={() => (dialog_create.open = false)} />
{/if}

<WindowInfo manager={window_manager} />
<WindowInstructions
	manager={window_manager}
	open_window_submitter={() => (dialog_create.open = true)}
/>
<Footer {window_manager} />
<!-- <WindowInspector item={inspecting} manager={window_manager} /> -->
<!-- 
<Taskbar manager={window_manager} /> -->

<svelte:head>
	<title>AGRAF 🕺 Inspirathèque</title>
	<style>
		html {
			--color-bg: #3c294b;
			--color-text: #bdde71;
		}
	</style>
</svelte:head>
