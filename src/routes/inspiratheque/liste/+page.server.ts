import type { PaginationResult } from '$lib/types';
import type { RecordListOptions } from 'pocketbase';
import type { ExpandedBookmarksRecord } from '../types';
import { pocketbase } from '$lib/pocketbase';

export async function load({ url }) {
	const page = Number(url.searchParams.get('page') ?? 1);
	const search = url.searchParams.get('search');
	const sort_by = url.searchParams.get('sort-by') || '-created';
	const tag = url.searchParams.get('tag');

	const options: RecordListOptions = {
		expand: 'tags,parent',
		sort: sort_by
	};

	const filters: string[] = [];
	if (search) {
		filters.push(`(title ~ '${search}' || url ~ '${search}')`);
	}
	if (tag) {
		filters.push(`tags.id ?= '${tag}'`);
	}
	if (filters.length) {
		options.filter = filters.join(' && ');
	}
	//const sort = url.searchParams.get('sort') || '-created';
	//options.sort = sort;

	const pagination_bookmarks: PaginationResult<ExpandedBookmarksRecord> = await pocketbase
		.collection('bookmarks')
		.getList(page, 64, options);

	return { pagination_bookmarks };
}
