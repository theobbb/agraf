<script lang="ts">
	import type { ExpandedBookmarkFoldersRecord, ExpandedBookmarksRecord } from './types';
	import Button from '$lib/ui/button.svelte';
	import Emoji from '$lib/emoji.svelte';

	import type { Windows } from './windows/types';
	import { get_window_manager } from '$lib/components/windows/window-manager.svelte';
	import WindowInfo from './windows/window-info.svelte';
	import WindowInstructions from './windows/window-instructions.svelte';
	import WindowSubmitter from './windows/window-submitter.svelte';

	import Footer from '../footer.svelte';
	import IconArrowBoxLeft from '$lib/ui/icons/icon-arrow-box-left.svelte';
	import IconArrowBoxRight from '$lib/ui/icons/icon-arrow-box-right.svelte';
	import IconArrowBoxUp from '$lib/ui/icons/icon-arrow-box-up.svelte';
	import IconInfo from '$lib/ui/icons/icon-info.svelte';
	import Input from '$lib/ui/input.svelte';
	import WindowTags from './windows/window-tags.svelte';
	import { setContext } from 'svelte';
	import { page } from '$app/state';

	const { data, children } = $props();

	type EditorType = 'folder' | 'bookmark';
	let creating_type: EditorType = $state('bookmark');

	let dialog_create: {
		open: boolean;
		parent: ExpandedBookmarkFoldersRecord | 'root';
	} = $state({
		open: false,
		parent: 'root'
	});

	function open_submitter() {
		// function get_parent() {
		// 	if (!page.params.id) return 'root';

		// 	if (!is_bookmark(inspecting)) return inspecting;

		// 	const parent = folders.find((f) => f.id == inspecting.parent);
		// 	if (!parent) return 'root';

		// 	return parent;
		// }

		dialog_create.parent = 'root';
		dialog_create.open = true;
	}

	function is_bookmark(
		item: ExpandedBookmarksRecord | ExpandedBookmarkFoldersRecord
	): item is ExpandedBookmarksRecord {
		return 'url' in item;
	}
	// function new_sub_item(type: EditorType) {
	// 	if (!inspecting) return;
	// 	creating_type = type;
	// 	explorer.actions.new_sub_item(inspecting);
	// }

	const window_manager = get_window_manager<Windows>('inspiratheque');

	setContext('window_manager', window_manager);
</script>

<a href="/inspiratheque/explorateur">explorateur</a>
<a href="/inspiratheque/liste">liste</a>
<Emoji>🕺</Emoji>
<div class="lg:col-start-10- col-span-full flex items-center justify-end lg:col-span-2">
	<Button size="md" onclick={open_submitter}>Soumettre un lien</Button>
</div>
{@render children?.()}
<!-- <div class=" fixed top-2 right-96 z-200">
	<Button variant="icon" class=" cursor-pointer text-3xl">
		<img src="/icons/help_book.webp" class="size-8" />
	
	</Button>
</div> -->

{#if dialog_create.open}
	<WindowSubmitter parent={dialog_create.parent} onclose={() => (dialog_create.open = false)} />
{/if}

<WindowInfo manager={window_manager} />
<WindowInstructions
	manager={window_manager}
	open_window_submitter={() => (dialog_create.open = true)}
/>
<!-- <WindowTags {tags} tag_count={explorer.tag_count} manager={window_manager} /> -->

<Footer {window_manager} />

<svelte:head>
	<title>AGRAF 🕺 Inspirathèque</title>
	<style>
		html {
			--color-bg: #3c294b;
			--color-text: #bdde71;
		}
	</style>
</svelte:head>
