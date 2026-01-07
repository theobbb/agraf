import { page } from '$app/state';

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

const is_folder = (item: any) => !('url' in item);

export function create_explorer<T extends BaseItem>(initial_items: T[]): Explorer<T> {
	let items: T[] = $state(initial_items);

	// TODO pocketbase view to list items counts in folders
	const get_children_count = () => {
		const memo = new Map<string, number>();
		const children_by_parent = new Map<string, T[]>();

		for (const item of items) {
			if (item.parent) {
				const list = children_by_parent.get(item.parent) || [];
				list.push(item);
				children_by_parent.set(item.parent, list);
			}
		}

		function get_total_count(id: string): number {
			if (memo.has(id)) return memo.get(id)!;
			const children = children_by_parent.get(id) || [];

			// Recursive sum of all descendants
			let total = children.length;
			for (const child of children) {
				total += get_total_count(child.id);
			}

			memo.set(id, total);
			return total;
		}

		// Only populate map for folders
		for (const item of items) {
			if (is_folder(item)) {
				get_total_count(item.id);
			}
		}

		return memo;
	};
	const children_count = get_children_count();

	const root_items = $derived(sort_items(items.filter((item) => !item.parent)));

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

	function sort_items(list: T[]) {
		return list.sort((item_a, item_b) => {
			const a = children_count.get(item_a.id);
			const b = children_count.get(item_b.id);
			if (a !== undefined && b !== undefined) {
				return b - a;
			}
			return 0;
		});
	}

	const navigation = $derived.by(() => {
		const arr = [root_items];

		breadcrumbs.forEach((item) => {
			const children = items.filter((t) => t.parent === item.id);
			if (!children.length) return;
			arr.push(sort_items(children));
		});

		return arr;
	});

	const inspecting = $derived(items.find((t) => t.id == page.params.id));

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
