<script lang="ts">
	import Button from '$lib/ui/button.svelte';
	import Emoji from '$lib/emoji.svelte';

	import type { Windows } from './windows/types';
	import { use_window_manager } from '$lib/components/windows/window-manager.svelte';
	import WindowInfo from './windows/window-info.svelte';
	import WindowInstructions from './windows/window-instructions.svelte';
	import WindowSubmitter from './windows/window-submitter.svelte';

	import Footer from '../+/footer/footer.svelte';
	import WindowTags from './windows/window-filters.svelte';
	import { onMount, setContext } from 'svelte';
	import { page } from '$app/state';
	import { use_comments } from '$lib/cache/cache-comments.svelte';
	import Input from '$lib/ui/input.svelte';
	import Tabs, { type Tab } from '$lib/components/tabs.svelte';
	import Search from '$lib/components/search.svelte';
	import type { BookmarkFoldersRecord } from '$lib/pocketbase.types';
	import { init_flat_list } from './ctx.svelte';
	import { init_explorer } from './explorateur/ctx.svelte';
	import IconFilter from '$lib/ui/icons/icon-filter.svelte';

	const { data, children } = $props();
	const { tags, tag_groups, tags_map } = data;

	init_explorer();
	init_flat_list();

	const comments_service = use_comments();

	let dialog_create: {
		open: boolean;
		parent: BookmarkFoldersRecord | 'root';
	} = $state({
		open: false,
		parent: 'root'
	});

	function open_submitter() {
		dialog_create.parent = 'root';
		dialog_create.open = true;
	}

	const window_manager = use_window_manager<Windows>('inspiratheque');

	const tab_names = ['explorateur', 'liste', 'grille'];
	const tabs: Tab[] = [...tab_names].map((name) => ({
		name,
		href: `/inspiratheque/${name}`,
		type: 'link'
	}));
	const current_tab_i = $derived(tab_names.indexOf(page.url.pathname.split('/')[2]));

	function toggle_window(window_id: Windows) {
		window_manager.toggle_window(window_id);
	}

	const filter_sort = $derived(page.url.searchParams.get('sort-by'));
	const filter_tag = $derived(page.url.searchParams.get('tag'));

	const filter_sort_name = $derived(filter_sort == '-likes' ? '❤️' : 'plus récent');
	const filter_tag_name = $derived(filter_tag ? tags_map.get(filter_tag)?.name || '' : '');

	const filters = $derived([filter_sort_name, filter_tag_name].filter((f) => f != ''));

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
		<div class="col-span-full -mt-0.5 lg:col-span-3">
			<!-- <Tabs items={['explorateur', 'liste', 'grille']} active_item_i={current_view_i} border_t>
				{#snippet rendered(item, i)}
					<a class="capitalize" href="/inspiratheque/{item}{page.url.search}"> {item}</a>
				{/snippet}
			</Tabs> -->
			<Tabs {tabs} active_tab_i={current_tab_i}>
				{#snippet rendered(item: Tab, i: number)}
					<div class="capitalize">{item.name}</div>
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
		<div
			class="col-span-full flex flex-col-reverse items-end gap-1.5 whitespace-nowrap lg:col-span-6 lg:flex-row lg:items-center"
		>
			<div class="flex gap-1.5 whitespace-nowrap">
				{#each filters as filter}
					<div class="bg-text px-gap py-1.5 text-bg">{filter}</div>
				{/each}
			</div>
			<div>
				<Button class=" shrink-0" variant="icon" onclick={() => toggle_window('tags')}>
					<IconFilter />
				</Button>
			</div>
			<Search id="s" />
		</div>
		<div class="flex- col-span-2 hidden">
			<div class="flex shrink-0 items-center gap-2">
				<!-- <Button class="shrink-0" variant="icon" onclick={() => toggle_window('info')}>
					<img src="/icons/help_book.webp" class="size-6" />
				</Button> -->

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
		<div
			class="col-span-full flex items-center justify-end gap-0.5 text-right whitespace-nowrap max-lg:-order-1 max-lg:-mt-11 lg:col-span-3 lg:col-start-10"
		>
			<Button class="shrink-0" variant="icon" onclick={() => toggle_window('info')}>
				<img src="/icons/help_book.webp" class="size-6" />
			</Button>
			<Button size="md" onclick={open_submitter}>Soumettre un lien</Button>
		</div>
	</div>

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
