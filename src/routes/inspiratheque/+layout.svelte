<script lang="ts">
	import type { ExpandedBookmarkFoldersRecord } from './types';
	import Button from '$lib/ui/button.svelte';
	import Emoji from '$lib/emoji.svelte';

	import type { Windows } from './windows/types';
	import { use_window_manager } from '$lib/components/windows/window-manager.svelte';
	import WindowInfo from './windows/window-info.svelte';
	import WindowInstructions from './windows/window-instructions.svelte';
	import WindowSubmitter from './windows/window-submitter.svelte';

	import Footer from '../+/footer/footer.svelte';
	import WindowTags from './windows/window-tags.svelte';
	import { onMount, setContext } from 'svelte';
	import { page } from '$app/state';
	import { use_comments } from '$lib/cache/cache-comments.svelte';
	import Input from '$lib/ui/input.svelte';
	import Tabs from '$lib/components/tabs.svelte';
	import Search from '$lib/components/search.svelte';

	const { data, children } = $props();

	const comments_service = use_comments();

	type EditorType = 'folder' | 'bookmark';

	let dialog_create: {
		open: boolean;
		parent: ExpandedBookmarkFoldersRecord | 'root';
	} = $state({
		open: false,
		parent: 'root'
	});

	const { tags, tag_groups } = $derived(data);

	function open_submitter() {
		dialog_create.parent = 'root';
		dialog_create.open = true;
	}

	const window_manager = use_window_manager<Windows>('inspiratheque');

	// setContext('window_manager', window_manager);

	const views = ['explorateur', 'liste', 'grille'];
	const current_view_i = $derived(views.indexOf(page.url.pathname.split('/')[2]));

	function toggle_window(window_id: Windows) {
		if (window_manager.windows[window_id]?.closed) window_manager.open_window(window_id);
		else window_manager.close_window(window_id);
	}

	onMount(() => {
		comments_service.subscribe('bookmarks');
		return () => {
			comments_service.unsubscribe();
		};
	});
</script>

<div>
	<Emoji>🕺</Emoji>

	<div class="grid-12 mb-gap -ml-gap pb-gap pl-gap">
		<div class="col-span-3 -mt-0.5">
			<Tabs items={['explorateur', 'liste', 'grille']} active_item_i={current_view_i} border_t>
				{#snippet rendered(item, i)}
					<a class="capitalize" href="/inspiratheque/{item}"> {item}</a>
				{/snippet}
			</Tabs>
		</div>

		<!-- <div class="self-end">
			{#each ['explorateur', 'liste', 'grille'] as view, i}
				<a
					class={[
						'inline-block translate-y-px border px-3 py-1 capitalize not-first:border-l-0',
						i == current_view_i ? 'border-b-bg' : 'bg-black/20-'
					]}
					href="/inspiratheque/{view}"
					><div class={[i == current_view_i ? '' : 'text-2']}>{view}</div></a
				>
			{/each}
		</div> -->
		<div class="col-span-4">
			<Search id="s" />
		</div>
		<div class="col-span-2 flex">
			<div class="flex shrink-0 items-center gap-2">
				<Button class="shrink-0" variant="icon" onclick={() => toggle_window('info')}>
					<img src="/icons/help_book.webp" class="size-6" />
				</Button>
				<Button size="sm" class="shrink-0" onclick={() => toggle_window('tags')}>Filtres</Button>
				<!-- <Button class="aspect-square shrink-0" variant="icon" onclick={() => toggle_window('tags')}>
					<div class="flex size-6 items-center justify-center text-lg">#</div>
				</Button> -->
				<!-- <Button class="shrink-0" variant="icon">
					<img src="/icons/folder-search.webp" class="size-6" />
				</Button> -->
				<!-- <Button class="aspect-square shrink-0" variant="icon" onclick={() => toggle_window('tags')}>
					<div class="flex size-6 items-center justify-center text-lg">#</div>
				</Button> -->
			</div>

			<!-- <div class="">
				<Button variant="icon" class=" cursor-pointer text-3xl">
					<img src="/icons/help_book.webp" class="size-6" />
				</Button>
			</div> -->
		</div>

		<!-- <div class="flex items-center gap-1">
			<Input name="search" class="w-full" placeholder="Rechercher..." />
			<div class="flex gap-1">
				<Button class="shrink-0">Rechercher</Button>
				<Button class="shrink-0">Ré</Button>
			</div>
		</div> -->
		<div class="col-span-3 text-right">
			<Button size="md" onclick={open_submitter}>Soumettre un lien</Button>
		</div>
	</div>
	<!-- <a href="/inspiratheque/explorateur">explorateur</a>
	<a href="/inspiratheque/liste">liste</a> -->

	<!-- <div class="lg:col-start-10- col-span-full flex items-center justify-end lg:col-span-2">
		<Button size="md" onclick={open_submitter}>Soumettre un lien</Button>
	</div> -->
	{@render children?.()}
</div>
<!-- <div class=" fixed top-2 right-96 z-200">
	<Button variant="icon" class=" cursor-pointer text-3xl">
		<img src="/icons/help_book.webp" class="size-8" />
	
	</Button>
</div> -->

<div>
	{#if dialog_create.open}
		<WindowSubmitter parent={dialog_create.parent} onclose={() => (dialog_create.open = false)} />
	{/if}

	<WindowInfo manager={window_manager} />
	<WindowInstructions
		manager={window_manager}
		open_window_submitter={() => (dialog_create.open = true)}
	/>
	<WindowTags {tags} {tag_groups} manager={window_manager} />
</div>

<svelte:head>
	<title>AGRAF 🕺 Inspirathèque</title>
	<style>
		html {
			--color-bg: #3c294b;
			--color-text: #bdde71;
		}
	</style>
</svelte:head>
