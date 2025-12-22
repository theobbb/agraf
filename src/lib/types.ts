export interface PaginationResult<T> {
	page: number;
	perPage: number;
	totalItems: number;
	totalPages: number;
	items: T[];
}

// export type Windows = Record<
// 	string,
// 	{ z_index: Number; el: HTMLDivElement; hidden: Boolean; minimized: Boolean }
// >;

export type DrawerType = 'inspect' | 'create' | 'edit' | null;
export type DrawerCtx<T> = {
	open: Boolean;
	type: DrawerType;
	target: T | null;
	close_drawer: () => void;
};
