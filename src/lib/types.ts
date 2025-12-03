export interface PaginationResult<T> {
	page: number;
	perPage: number;
	totalItems: number;
	totalPages: number;
	items: T[];
}

export type Windows = Record<
	string,
	{ z_index: Number; el: HTMLDivElement; hidden: Boolean; minimized: Boolean }
>;
