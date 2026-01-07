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

	const current_view = $derived(page.url.pathname.split('/')[2]);

	// 	function toggle_window_tags() {
	// 	if (window_manager.windows['tags']?.closed) {
	// 		if (!explorer.tag_count) {
	// 			explorer.set_tag_count(expand_tags());
	// 		}
	// 		window_manager.open_window('tags');
	// 	} else window_manager.close_window('tags');
	// }

	function toggle_window(window_id: Windows) {
		if (window_manager.windows[window_id]?.closed) window_manager.open_window(window_id);
		else window_manager.close_window(window_id);
	}
</script>

<Emoji>🕺</Emoji>
<div class="mb-3 -ml-gap flex items-end justify-between border-b pl-gap">
	<div class="col-span-6">
		{#each ['explorateur', 'liste', 'grille'] as view}
			<a
				class={[
					'inline-block translate-y-px border px-3 py-1 capitalize not-first:border-l-0',
					view == current_view ? 'border-b-bg' : 'bg-black/20-'
				]}
				href="/inspiratheque/{view}"
				><div class={[view == current_view ? '' : 'text-2']}>{view}</div></a
			>
		{/each}
	</div>
	<div>
		<div class="flex shrink-0 items-center gap-2">
			<Button class="shrink-0" variant="icon" onclick={() => toggle_window('info')}>
				<img src="/icons/help_book.webp" class="size-6" />
			</Button>

			<Button class="shrink-0" variant="icon">
				<img src="/icons/folder-search.webp" class="size-6" />
			</Button>
			<Button
				class="aspect-square  h-full shrink-0"
				variant="icon"
				onclick={() => toggle_window('tags')}
			>
				<div class="flex size-6 items-center justify-center">#</div>
			</Button>
		</div>
		<!-- <div class="">
			<Button variant="icon" class=" cursor-pointer text-3xl">
				<img src="/icons/help_book.webp" class="size-6" />
			</Button>
		</div> -->
	</div>
	<div class="">
		<Button size="md" onclick={open_submitter}>Soumettre un lien</Button>
	</div>
</div>
<!-- <a href="/inspiratheque/explorateur">explorateur</a>
<a href="/inspiratheque/liste">liste</a> -->

<!-- <div class="lg:col-start-10- col-span-full flex items-center justify-end lg:col-span-2">
	<Button size="md" onclick={open_submitter}>Soumettre un lien</Button>
</div> -->
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
<WindowTags tags={data.tags} manager={window_manager} />

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
