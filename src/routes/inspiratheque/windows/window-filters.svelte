<script lang="ts">
	import type { WindowManager } from '$lib/components/windows/window-manager.svelte';
	import Window from '$lib/components/windows/window.svelte';
	import type { BookmarkTagGroupsRecord, BookmarkTagsRecord } from '$lib/pocketbase.types';
	import Button from '$lib/ui/button.svelte';
	import type { Windows } from './types';
	import { pocketbase } from '$lib/pocketbase';
	import { page } from '$app/state';
	import { url_query_param } from '$lib/utils/url';
	import { goto } from '$app/navigation';
	import IconReset from '$lib/ui/icons/icon-reset.svelte';

	const {
		tags,
		tag_groups,
		manager
	}: {
		tags: BookmarkTagsRecord[];
		tag_groups: BookmarkTagGroupsRecord[];
		manager: WindowManager<Windows>;
	} = $props();

	function onclose() {
		console.log('close');
	}

	function group() {
		const groupsMap = tags?.reduce(
			(acc, tag) => {
				const group_id = tag.parent || 'ungrouped';

				if (!acc[group_id]) {
					// Find the actual metadata from your tag_groups collection
					const groupRecord = tag_groups.find((g) => g.id === group_id);

					acc[group_id] = {
						// Spread the record if found, otherwise provide defaults for 'ungrouped'
						...(groupRecord ||
							({
								id: 'ungrouped',
								name: 'Autres',
								created: '',
								updated: ''
							} as BookmarkTagGroupsRecord)),
						items: []
					};
				}

				acc[group_id].items.push(tag);
				return acc;
			},
			{} as Record<string, BookmarkTagGroupsRecord & { items: BookmarkTagsRecord[] }>
		);

		const result = Object.values(groupsMap);

		// Find the index of the ungrouped item
		const index = result.findIndex((g) => g.id === 'ungrouped');

		// If found, remove it from its current position and push to the end
		if (index !== -1) {
			const [ungroupedItem] = result.splice(index, 1);
			result.push(ungroupedItem);
		}

		return result;
	}
	const grouped: (BookmarkTagGroupsRecord & { items: BookmarkTagsRecord[] })[] = group();

	function reset() {
		goto(page.url.pathname);
	}

	function onsubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		event.preventDefault();
		const form_data = new FormData(event.currentTarget, event.submitter);

		let url = page.url.href;
		for (const [key, value] of form_data.entries()) {
			url = url_query_param(url, key, value == 'empty' ? null : String(value));
		}
		url = url_query_param(url, 'page', null);
		goto(url);
	}

	const sort_by_filters = [
		{ name: 'plus récent', value: '-created', is_default: true },
		{ name: `❤️`, value: '-likes' }
	];
</script>

{#snippet filter(
	radio_id: string,
	name: string,
	id: string,
	is_default: boolean,
	n_children?: number
)}
	{@const current_param = page.url.searchParams.get(radio_id)}

	<div>
		<input
			class="peer hidden"
			{id}
			type="radio"
			name={radio_id}
			value={id}
			checked={current_param ? current_param == id : is_default}
		/>
		<label
			class="flex w-fit cursor-pointer items-center gap-1 border px-gap py-1.5 peer-checked:bg-text peer-checked:text-bg hover:bg-text hover:text-bg"
			for={id}
		>
			<div>{name}</div>
			{#if n_children}
				<div class="opacity-50">({n_children})</div>
			{/if}
		</label>
	</div>
{/snippet}
<div class="grid-12 pointer-events-none absolute top-36 right-gap left-gap">
	<Window
		class="col-span-full lg:col-span-3 lg:col-start-7"
		title="Filtres"
		id="tags"
		hidden
		{manager}
		{onclose}
	>
		<div class="mt-1">
			<form class="mb-2.5" {onsubmit}>
				<div class=" mb-1">Trier par:</div>

				<div class="mb-6 flex flex-wrap gap-x-2 gap-y-1.5 whitespace-nowrap">
					{#each sort_by_filters as { name, value }, i}
						{@render filter('sort-by', name, value, i == 0)}

						<!-- <div>{item.name} ({item.bookmark_count})</div> -->
					{/each}
				</div>

				<div class="overflow-y-auto- relative space-y-0.5 border-t border-b py-1 pb-3">
					<div class=" mb-1">Filtrer par:</div>
					{@render filter('tag', 'Tous', 'empty', true)}
					{#each grouped as group}
						<div class="text-2">{group.name}</div>

						<div class="mb-4- flex flex-wrap gap-x-2 gap-y-1.5 whitespace-nowrap">
							{#each group.items as { id, name, bookmark_count }}
								{@render filter('tag', name || '', id, false, bookmark_count)}

								<!-- <div>{item.name} ({item.bookmark_count})</div> -->
							{/each}
						</div>
					{/each}
					<!-- <div>
						{#each tag_groups as group}
							{group.name}
						{/each}
					</div>
					{#each tags as { id, name, bookmark_count }}
						<div class="flex gap-2 px-1">
							<input {id} type="checkbox" />
							<label class="justify-between- flex w-full items-center gap-2" for={id}>
								<div>{name}</div>
								<div class="text-2">({bookmark_count})</div>
							</label>
						</div>
					{/each} -->
				</div>
				<div class="mt-2.5 flex items-center justify-end gap-1">
					<Button variant="icon" onclick={reset} disabled={!page.url.search}>
						<IconReset />
					</Button>
					<Button type="submit">Rechercher</Button>
				</div>
			</form>
		</div>
	</Window>
</div>
