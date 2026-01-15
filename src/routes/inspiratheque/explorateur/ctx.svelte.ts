// explorer.svelte.ts
import { page } from '$app/state';
import { getContext, setContext } from 'svelte';
import type { BookmarkFoldersRecord, BookmarksRecord } from '$lib/pocketbase.types';
import { apply_filters, type Item, is_bookmark } from '../ctx.svelte';
import { goto } from '$app/navigation';

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

	navigate(direction: 'up' | 'down' | 'left' | 'right') {
		const currentId = page.params.id;
		const nav = this.navigation;

		// Find which column we are currently in and the index of the selected item
		let columnIndex = -1;
		let itemIndex = -1;

		if (!currentId) {
			// If nothing is selected, ArrowDown starts at the first item of the root column
			if (direction === 'down') {
				const firstItem = nav[0]?.[0];
				if (firstItem) goto(`/explorer/${firstItem.id}`, { replaceState: true });
			}
			return;
		}

		// Locate current selection in the navigation grid
		for (let i = 0; i < nav.length; i++) {
			const foundIndex = nav[i].findIndex((item) => item.id === currentId);
			if (foundIndex !== -1) {
				columnIndex = i;
				itemIndex = foundIndex;
				break;
			}
		}

		if (columnIndex === -1) return;

		let targetItem: Item | undefined;

		switch (direction) {
			case 'up': {
				const col = nav[columnIndex];
				// Move up or wrap to bottom
				const nextIdx = itemIndex <= 0 ? col.length - 1 : itemIndex - 1;
				targetItem = col[nextIdx];
				break;
			}
			case 'down': {
				const col = nav[columnIndex];
				// Move down or wrap to top
				const nextIdx = itemIndex >= col.length - 1 ? 0 : itemIndex + 1;
				targetItem = col[nextIdx];
				break;
			}
			case 'left': {
				// Navigate to the parent folder (the breadcrumb above current column)
				if (columnIndex > 0) {
					targetItem = this.breadcrumbs[columnIndex - 1];
				}
				break;
			}
			case 'right': {
				// If current item is a folder, enter it by selecting its first child
				const currentItem = this.#items_by_id.get(currentId);
				if (currentItem && !is_bookmark(currentItem)) {
					const children = this.#children_by_parent.get(currentId) || [];
					if (children.length > 0) {
						// Use #process_column to respect visual sorting/filters
						targetItem = this.#process_column(children)[0];
					}
				}
				break;
			}
		}

		if (targetItem) {
			goto(`/inspiratheque/explorateur/${targetItem.id}`, { replaceState: true });
		}
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
