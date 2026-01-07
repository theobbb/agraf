import type { PaginationResult } from '$lib/types';
import type { RecordListOptions } from 'pocketbase';
import type { ExpandedBookmarksRecord } from '../types';
import { pocketbase } from '$lib/pocketbase';

export async function load({ url }) {
	const options: RecordListOptions = {
		expand: 'tags,parent',
		sort: '-created'
	};
	const page = Number(url.searchParams.get('page') ?? 1);
	const search = url.searchParams.get('search');
	const tag = url.searchParams.get('tag');

	if (search) options.filter = `title ~ '${search}'`;
	else if (tag) options.filter = `tags.id ?= '${tag}'`;
	//const sort = url.searchParams.get('sort') || '-created';
	//options.sort = sort;

	const pagination_bookmarks: PaginationResult<ExpandedBookmarksRecord> = await pocketbase
		.collection('bookmarks')
		.getList(page, 64, options);

	return { pagination_bookmarks };
}
