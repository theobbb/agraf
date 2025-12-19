import { goto } from '$app/navigation';
import { page } from '$app/state';

import { pocketbase } from '$lib/pocketbase';
import type { CollectionRecords } from '$lib/pocketbase.types';
import type { DrawerCtx } from '$lib/types';
import { onMount } from 'svelte';

export type Explorer<T> = {
	navigation: T[][];
	params: string[];
	breadcrumbs: T[];
	children_count: Map<string, number>;
	inspecting: T | undefined;
};

export type BaseItem = {
	id: string;
	parent?: string | undefined;
	title: string;
};

export function create_explorer<T extends BaseItem>(initial_items: T[]): Explorer<T> {
	let items: T[] = $state(initial_items);

	const root_items = $derived(items.filter((item) => !item.parent));

	const current_item_id = $derived(page.params.id);

	const breadcrumbs = $derived.by(() => {
		if (!current_item_id) return [];

		const arr = [];
		let current = items.find((t) => t.id === current_item_id);

		// Safety check: prevent infinite loops if circular dependency exists
		let safety = 0;
		while (current && safety < 50) {
			arr.unshift(current); // Add to beginning
			if (!current.parent) break;
			current = items.find((t) => t.id === current?.parent);
			safety++;
		}

		return arr;
	});

	const params = $derived(breadcrumbs.map((item) => item.id));

	const navigation = $derived.by(() => {
		const arr = [root_items];

		breadcrumbs.forEach((item) => {
			const children = items.filter((t) => t.parent === item.id);
			if (!children.length) return;
			arr.push(children);
		});

		return arr;
	});

	const children_count = $derived.by(() => {
		const map = new Map<string, number>();
		for (const t of items) {
			if (!t.parent) continue;
			map.set(t.parent, (map.get(t.parent) || 0) + 1);
		}
		return map;
	});

	const inspecting = $derived(items.find((t) => t.id == page.params.id));

	// function new_item(col_i: number) {
	// 	let parent: T | null = null;

	// 	if (col_i > 0) {
	// 		const parent_id = breadcrumbs[col_i - 1]?.id;
	// 		parent = items.find((t) => t.id === parent_id) ?? null;
	// 	}
	// 	inspector = {
	// 		mode: 'create',
	// 		parent
	// 	};
	// }
	// function new_sub_item(parent: T) {
	// 	inspector = {
	// 		mode: 'create',
	// 		parent
	// 	};
	// }

	return {
		get navigation() {
			return navigation;
		},
		get params() {
			return params;
		},
		get breadcrumbs() {
			return breadcrumbs;
		},
		get children_count() {
			return children_count;
		},
		get inspecting() {
			return inspecting;
		}
	};
}
