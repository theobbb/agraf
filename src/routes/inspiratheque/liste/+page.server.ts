import type { PaginationResult } from '$lib/types';
import type { RecordListOptions } from 'pocketbase';
import type { ExpandedBookmarksRecord } from '../types';
import { pocketbase } from '$lib/pocketbase';

export async function load({ url }) {
	const options: RecordListOptions = {
		expand: 'tags,parent',
		sort: '-created'
	};
	//const sort = url.searchParams.get('sort') || '-created';
	//options.sort = sort;

	const search = url.searchParams.get('search');
	if (search) options.filter = `title ~ '${search}'`;

	const pagination_bookmarks: PaginationResult<ExpandedBookmarksRecord> = await pocketbase
		.collection('bookmarks')
		.getList(1, 64, options);

	return { pagination_bookmarks };
}
