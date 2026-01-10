import type { Snippet } from 'svelte';

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

export type WindowManager<T extends string> = {
	windows: Windows<T>;
	windows_array: Window<T>[];
	focus_window: (id: T) => void;
	minimize_window: (id: T) => void;
	close_window: (id: T) => void;
	open_window: (id: T) => void;
	content: Record<string, Snippet>;
};

function create_window_manager<T extends string>(): WindowManager<T> {
	const windows: Windows<T> = $state({});
	const content = $state({});

	function focus_window(id: T) {
		const arr = Object.values(windows) as Window<T>[];
		const max_z_index = Math.max(...arr.map((window) => Number(window.z_index)));
		if (!windows[id]) return;
		windows[id].z_index = max_z_index + 1;
	}
	function minimize_window(id: T) {
		if (!windows[id]) return;
		windows[id].minimized = true;
	}
	function close_window(id: T) {
		if (!windows[id]) return;
		windows[id].closed = true;
	}

	function open_window(id: T) {
		if (!windows[id]) return;
		focus_window(id);
		windows[id].closed = false;
		windows[id].minimized = false;
	}

	return {
		get windows() {
			return windows;
		},
		get windows_array() {
			return Object.values(windows) as Window<T>[];
		},
		focus_window,
		minimize_window,
		close_window,
		open_window,
		content
	};
}

export const current_manager: {
	value: WindowManager<any> | null;
} = $state({
	value: null
});

const managers = new Map<string, WindowManager<any>>();

export function get_window_manager<T extends string>(key: string): WindowManager<T> {
	// Check if it already exists
	if (managers.has(key)) {
		const manager = managers.get(key) as WindowManager<T>;
		current_manager.value = manager;
		return manager;
	}

	// If not, create a new one using your existing function
	const new_manager = create_window_manager<T>();

	// Store it
	managers.set(key, new_manager);

	current_manager.value = new_manager;
	return new_manager;
}
