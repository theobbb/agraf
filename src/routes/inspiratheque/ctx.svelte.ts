import { page } from '$app/state';
import { getContext, setContext } from 'svelte';
import type { BookmarkFoldersRecord, BookmarksRecord } from '$lib/pocketbase.types';

export type Item = BookmarksRecord | BookmarkFoldersRecord;
export function is_bookmark(item: Item): item is BookmarksRecord {
	return 'url' in item;
}

export function apply_filters(bookmarks: BookmarksRecord[]): BookmarksRecord[] {
	const sort_param = page.url.searchParams.get('sort-by') || '-created';
	const tag_param = page.url.searchParams.get('tag');
	const search_param = page.url.searchParams.get('search')?.toLowerCase();

	let result = [...bookmarks];

	// 1. Search Filter
	if (search_param) {
		result = result.filter((b) => b.title.toLowerCase().includes(search_param));
	}

	// 2. Tag Filter
	if (tag_param && tag_param !== 'empty') {
		result = result.filter((b) => b.tags?.includes(tag_param));
	}

	// 3. Sort
	result.sort((a, b) => {
		if (sort_param === '-likes') return (b.likes ?? 0) - (a.likes ?? 0);
		return new Date(b.created).getTime() - new Date(a.created).getTime();
	});

	return result;
}

export class List {
	// 1. Raw Data State
	bookmarks = $state<BookmarksRecord[]>([]);
	perPage = $state(50);
	initialized = $state(false);

	// 2. The Reactive "PocketBase-style" List
	// This derived property updates automatically whenever page.url or this.bookmarks changes
	list = $derived.by(() => {
		const currentPage = Number(page.url.searchParams.get('page')) || 1;

		// Apply your shared global filters
		const filtered = apply_filters(this.bookmarks);

		const totalItems = filtered.length;
		const totalPages = Math.ceil(totalItems / this.perPage);
		const start = (currentPage - 1) * this.perPage;

		return {
			page: currentPage,
			perPage: this.perPage,
			totalItems,
			totalPages,
			items: filtered.slice(start, start + this.perPage)
		};
	});

	// 3. Hydration method
	init(bookmarks: BookmarksRecord[], perPage?: number) {
		this.bookmarks = bookmarks;
		console.log('init list');
		if (perPage) this.perPage = perPage;
		this.initialized = true;
	}
}

const FLAT_LIST_KEY = Symbol('FLAT_LIST');

export function init_flat_list() {
	return setContext(FLAT_LIST_KEY, new List());
}

export function use_flat_list() {
	const context = getContext<List>(FLAT_LIST_KEY);
	if (!context) throw new Error('FlatListService not initialized');
	return context;
}
