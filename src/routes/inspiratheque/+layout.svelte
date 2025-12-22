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

	const window_manager = get_window_manager<Windows>('inspiratheque');
</script>

<Emoji>🕺</Emoji>

<!-- <button class="cursor-pointer text-4xl" onclick={() => window_manager.open_window('intro')}>
	<IconInfo />
</button> -->

<!-- <Recent bookmarks={bookmarks.slice(0, 5)} /> -->
<div class="mt-12 grid h-[calc(100vh-12rem)] grid-rows-[auto_1fr]">
	<div class="mb-12 flex gap-4">
		<div>
			<Button size="md" onclick={() => (dialog_create.open = true)}>Suggérer un lien</Button>
		</div>
	</div>
	<Table {explorer} />
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

<WindowSearch manager={window_manager} />
<WindowInfo manager={window_manager} />
<WindowInstructions
	manager={window_manager}
	open_window_submitter={() => (dialog_create.open = true)}
/>

<WindowInspector item={inspecting} manager={window_manager} />

<div class="grid-12 pointer-events-none absolute top-24">
	<!-- <Window class="col-span-4 col-start-7" title="Inspirathèque" manager={window_manager} id="intro">
		<div class="mt-1 mb-2.5">
			<div class="text-3xl">
				<IconInfo />
			</div>
			<div class="mt-1">
				L’Inspirathèque est une librairie communautaire d’adresses URL, entretenue par les
				étudiant·es du programme.
			</div>
			<br />
			<div>
				Elle rassemble une collection semi-organisée de liens semi-inspirants qui ont un
				semi-rapport avec le design graphique.
			</div>
			<br />
			<div>Participe STP !!!</div>
			<div class="mt-4 text-right">
				<Button onclick={() => window_manager.open_window('instructions')}
					>Comment contribuer !!??</Button
				>
			</div>
		</div>
	</Window> -->
	<!-- <Window
		class="col-span-4 col-start-2 mt-24"
		title="Instructions"
		manager={window_manager}
		hidden
		id="instructions"
	>
		<div class="mt-1 mb-2.5">
			<div class="font-serif">1. Suggère un lien ❤️</div>
			<div>Ça peut être n'importe quel lien que tu penses qui mérites d'être partagé</div>

			<div class="font-serif">2. Attends 😅</div>
			<div>
				Donnes-nous un mini moment pour qu'on accepte ton ajout.
				<br />Rien de personnel, c'est simplement que puisque c'est ouvert au public, on doit un peu
				vérifier. 🤞
			</div>
			<div class="mt-12">Prêt-e à te lancer tête première dans l'inspirathèque ?? 👀</div>
			<div class="mt-4 text-right">
				<Button onclick={() => (dialog_create.open = true)}>Suggérer un lien</Button>
			</div>
		</div>
	</Window> -->
</div>

<!-- {#if dialog_intro.open}
	<Dialog title="Inspirathèque" onclose={() => (dialog_intro.open = false)}>
		<DialogIntro />
	</Dialog>
{/if} -->

{#snippet new_item_button(i: number)}
	<button
		class="flex items-center justify-center px-2 py-1 text-lg text-current/40 hover:bg-current/10 hover:text-current"
		onclick={() => new_item(i)}
		style="box-shadow: inset 0 0 0 1px var(--color-background);"
	>
		<IconAdd />
	</button>
{/snippet}

<svelte:head>
	<title>AGRAF 🕺 Inspirathèque</title>
	<style>
		html {
			--color-bg: #3c294b;
			--color-text: #bdde71;
		}
	</style>
</svelte:head>
