import { getContext, setContext, type Snippet } from 'svelte';

// --- Types (Kept from your original) ---

export type Window<T extends string> = {
	id: T;
	title: string;
	closed: boolean;
	minimized: boolean;
	z_index: number;
	translate: { x: number; y: number };
	size: { width: number; height: number };
	is_floating: boolean;
	ghost_size: { width: number; height: number };
	is_expanded: boolean;
	container: HTMLDialogElement | HTMLDivElement | null;
};

type Windows<T extends string> = Partial<Record<T, Window<T>>>;

// --- Window Manager Class ---

export class WindowManager<T extends string> {
	windows = $state<Windows<T>>({});
	content = $state<Record<string, Snippet>>({});
	windows_array = $derived(Object.values(this.windows) as Window<T>[]);

	focus_window(id: T) {
		if (!this.windows[id]) return;
		const max_z = Math.max(0, ...this.windows_array.map((w) => Number(w.z_index)));
		this.windows[id]!.z_index = max_z + 1;
	}

	minimize_window(id: T) {
		if (this.windows[id]) this.windows[id]!.minimized = true;
	}

	close_window(id: T) {
		if (this.windows[id]) this.windows[id]!.closed = true;
	}

	open_window(id: T) {
		if (!this.windows[id]) return;
		this.focus_window(id);
		this.windows[id]!.closed = false;
		this.windows[id]!.minimized = false;
	}
}

// --- The Persistent Registry ---
// This class holds the Map and is shared via Context.
// Since this is created inside setWindowManager in the root layout,
// it is unique per user/session, but stays alive across client-side navigations.

class WindowRegistry {
	private managers = new Map<string, WindowManager<any>>();

	// We keep track of the "active" manager reactively
	current = $state<{ value: WindowManager<any> | null }>({ value: null });

	get_manager<T extends string>(key: string): WindowManager<T> {
		if (!this.managers.has(key)) {
			this.managers.set(key, new WindowManager<T>());
		}

		const manager = this.managers.get(key) as WindowManager<T>;
		this.current.value = manager; // Updates the "global" current reference
		return manager;
	}
}

// --- SSR Safe Context Setup ---

const REGISTRY_KEY = Symbol('WINDOW_REGISTRY');

/**
 * Call this ONCE in your root +layout.svelte
 */
export function init_window_registry() {
	const registry = new WindowRegistry();
	return setContext(REGISTRY_KEY, registry);
}

/**
 * Use this in pages to get or create a specific manager
 */
export function use_window_manager<T extends string>(key: string) {
	const registry = getContext<WindowRegistry>(REGISTRY_KEY);
	if (!registry) throw new Error('Registry not initialized in root layout.');

	return registry.get_manager<T>(key);
}

/**
 * Use this if you need to react to the "currently active" manager
 * (e.g. for a global taskbar that shows windows of the current page)
 */
export function use_current_manager() {
	const registry = getContext<WindowRegistry>(REGISTRY_KEY);
	if (!registry) throw new Error('Registry not initialized in root layout.');
	return registry.current;
}
