export type Window<T extends string> = {
	id: T;
	title: string;
	closed: boolean;
	minimized: boolean;
	z_index: number;
	translate: { x: number; y: number };
};

type Windows<T extends string> = Partial<Record<T, Window<T>>>;

export type WindowManager<T extends string> = {
	windows: Windows<T>;
	windows_array: Window<T>[];
	focus_window: (id: T) => void;
	minimize_window: (id: T) => void;
	close_window: (id: T) => void;
	open_window: (id: T) => void;
};

function create_window_manager<T extends string>(): WindowManager<T> {
	const windows: Windows<T> = $state({});

	function focus_window(id: T) {
		const arr = Object.values(windows) as Window<T>[];
		const max_z_index = Math.max(...arr.map((window) => Number(window.z_index)));
		if (!windows[id]) return;
		console.log(max_z_index);
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
		open_window
	};
}

const managers = new Map<string, WindowManager<any>>();

export function get_window_manager<T extends string>(key: string): WindowManager<T> {
	// Check if it already exists
	if (managers.has(key)) {
		return managers.get(key) as WindowManager<T>;
	}

	// If not, create a new one using your existing function
	const new_manager = create_window_manager<T>();

	// Store it
	managers.set(key, new_manager);

	return new_manager;
}
