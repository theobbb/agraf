import { pocketbase } from '$lib/pocketbase';
import type { RecordListOptions } from 'pocketbase';
import type { ExpandedBookmarkFoldersRecord, ExpandedBookmarksRecord } from '../types';

export async function load({ url }) {
	// const bookmarks = await pocketbase.collection('bookmarks').getFullList<ExpandedBookmarksRecord>({
	// 	expand: 'tags',
	// 	sort: '-created',
	// 	filter: `approved = true`
	// 	//fields: 'id,parent,title,url,favicon,tags,likes,created'
	// });
	console.log('load');
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

	const bookmarks: ExpandedBookmarksRecord[] = await pocketbase
		.collection('bookmarks')
		.getFullList(options);

	return { bookmarks };
}
