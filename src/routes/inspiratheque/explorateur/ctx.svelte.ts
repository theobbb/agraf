// explorer.svelte.ts
import { page } from '$app/state';
import { getContext, setContext } from 'svelte';
import type { BookmarkFoldersRecord, BookmarksRecord } from '$lib/pocketbase.types';
import { apply_filters, type Item, is_bookmark } from '../ctx.svelte';

export class Explorer {
	// 1. Raw Data State
	bookmarks = $state<BookmarksRecord[]>([]);
	folders = $state<BookmarkFoldersRecord[]>([]);
	folder_count = $state<Map<string, number>>(new Map());
	initialized = $state(false);

	// 2. Internal Lookups (Derived for efficiency)
	// These only re-calculate when raw data changes
	#sorted_folders = $derived(
		[...this.folders].sort((a, b) => {
			const count_a = this.folder_count.get(a.id) ?? 0;
			const count_b = this.folder_count.get(b.id) ?? 0;
			return count_b - count_a;
		})
	);

	#items = $derived([...this.#sorted_folders, ...this.bookmarks]);
	#items_by_id = $derived(new Map(this.#items.map((i) => [i.id, i])));

	#children_by_parent = $derived.by(() => {
		const map = new Map<string, Item[]>();
		for (const item of this.#items) {
			if (item.parent) {
				const list = map.get(item.parent) || [];
				list.push(item);
				map.set(item.parent, list);
			}
		}
		return map;
	});

	// 3. UI Derived State
	// Reactive to URL changes via 'page' and data changes via internal derivations
	breadcrumbs = $derived.by(() => {
		const id = page.params.id;
		if (!id) return [];

		const path: Item[] = [];
		let current = this.#items_by_id.get(id);
		let safety = 0;

		while (current && safety < 50) {
			path.unshift(current);
			current = current.parent ? this.#items_by_id.get(current.parent) : undefined;
			safety++;
		}
		return path;
	});

	navigation = $derived.by(() => {
		if (!this.initialized) return [];

		const root_items = this.#items.filter((item) => !item.parent);
		const columns = [this.#process_column(root_items)];

		for (const crumb of this.breadcrumbs) {
			const children = this.#children_by_parent.get(crumb.id) || [];
			if (children.length > 0) {
				columns.push(this.#process_column(children));
			}
		}
		return columns;
	});

	inspecting = $derived(page.params.id ? this.#items_by_id.get(page.params.id) : undefined);

	// 4. Helpers
	#process_column(list: Item[]) {
		const column_folders = list.filter((i) => !is_bookmark(i));
		const column_bookmarks = list.filter((i) => is_bookmark(i)) as BookmarksRecord[];

		return [...column_folders, ...apply_filters(column_bookmarks)];
	}

	// 5. Hydration
	init(data: {
		bookmarks: BookmarksRecord[];
		folders: BookmarkFoldersRecord[];
		folder_count: Map<string, number>;
	}) {
		this.bookmarks = data.bookmarks;
		this.folders = data.folders;
		this.folder_count = data.folder_count;
		this.initialized = true;
	}
}

const EXPLORER_KEY = Symbol('EXPLORER');
export function init_explorer() {
	return setContext(EXPLORER_KEY, new Explorer());
}

export function use_explorer() {
	const context = getContext<Explorer>(EXPLORER_KEY);
	if (!context) throw new Error('ExplorerService not initialized');
	return context;
}
