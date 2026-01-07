import { pocketbase } from '$lib/pocketbase';
import type { ExpandedBookmarkFoldersRecord, ExpandedBookmarksRecord } from '../types';

export async function load() {
	const folders: ExpandedBookmarkFoldersRecord[] = await pocketbase
		.collection('bookmark_folders')
		.getFullList({
			sort: 'title',
			fields: 'id,parent,title,description'
		});
	console.log('server data');

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
	// 			fields: 'id,parent,title,description'
	// 		})
	// 	]);

	return { folders };
}
