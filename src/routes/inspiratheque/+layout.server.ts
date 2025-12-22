import { pocketbase } from '$lib/pocketbase';
import type { BookmarkTagsRecord } from '$lib/pocketbase.types';
import type { ExpandedBookmarkFoldersRecord, ExpandedBookmarksRecord } from './types';

export async function load({ params, depends }) {
	depends('data:bookmarks');

	const bookmarks: ExpandedBookmarksRecord[] = await pocketbase
		.collection('bookmarks')
		.getFullList({ expand: 'tags', sort: '-created' });

	const folders: ExpandedBookmarkFoldersRecord[] = await pocketbase
		.collection('bookmark_folders')
		.getFullList({ sort: 'title' });

	const tags: BookmarkTagsRecord[] = await pocketbase.collection('bookmark_tags').getFullList();
	// const folders: BookmarkFoldersRecord[] = await pocketbase
	// 	.collection('bookmark_folders')
	// 	.getFullList({ filter: `folder == ${params.folder}` });

	return { bookmarks, folders, tags };
}
