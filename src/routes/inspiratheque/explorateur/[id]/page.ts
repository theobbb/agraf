import { browser } from '$app/environment';
import { pocketbase } from '$lib/pocketbase';
import type { ExpandedBookmarksRecord } from '../../types';

export async function load({ params }) {
	// const [bookmarks, folders]: [ExpandedBookmarksRecord[], ExpandedBookmarkFoldersRecord[]] =
	// 	await Promise.all([
	// 		pocketbase.collection('bookmarks').getFullList<ExpandedBookmarksRecord>({
	// 			expand: 'tags',
	// 			sort: '-created',
	// 			filter: 'approved = true'
	// 			//fields: 'id,parent,title,url,favicon,tags,likes,created'
	// 		}),
	// 		pocketbase.collection('bookmark_folders').getFullList<ExpandedBookmarkFoldersRecord>({
	// 			sort: 'title',
	// 			fields: 'id,parent,title'
	// 		})
	// 	]);
	if (!browser) return;
	const bookmarks: ExpandedBookmarksRecord[] = await pocketbase
		.collection('bookmarks')
		.getFullList({
			filter: `parent = "${params.id}" && approved = true`,
			expand: 'tags',
			sort: '-created'
		});
	console.log(bookmarks.length);
	return { bookmarks };
}
