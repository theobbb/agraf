import { pocketbase } from '$lib/pocketbase';
import type { BookmarkTagsRecord } from '$lib/pocketbase.types';
import type { ExpandedBookmarkFoldersRecord, ExpandedBookmarksRecord } from './types';

export async function load({ params, setHeaders }) {
	const [bookmarks, folders, tags]: [
		ExpandedBookmarksRecord[],
		ExpandedBookmarkFoldersRecord[],
		BookmarkTagsRecord[]
	] = await Promise.all([
		pocketbase.collection('bookmarks').getFullList<ExpandedBookmarksRecord>({
			expand: 'tags',
			sort: '-created',
			filter: 'approved = true'
			//fields: 'id,parent,title,url,favicon,tags,likes,created'
		}),
		pocketbase.collection('bookmark_folders').getFullList<ExpandedBookmarkFoldersRecord>({
			sort: 'title',
			fields: 'id,parent,title,description'
		}),
		pocketbase
			.collection('bookmark_tags')
			.getFullList<BookmarkTagsRecord>({ fields: 'id,name,color' })
	]);

	setHeaders({
		'cache-control': 'public, max-age=600'
	});

	// const bookmarks: ExpandedBookmarksRecord[] = await pocketbase
	// 	.collection('bookmarks')
	// 	.getFullList({ expand: 'tags', sort: '-created' });

	// const folders: ExpandedBookmarkFoldersRecord[] = await pocketbase
	// 	.collection('bookmark_folders')
	// 	.getFullList({ sort: 'title' });

	// const tags: BookmarkTagsRecord[] = await pocketbase.collection('bookmark_tags').getFullList();
	// const folders: BookmarkFoldersRecord[] = await pocketbase
	// 	.collection('bookmark_folders')
	// 	.getFullList({ filter: `folder == ${params.folder}` });

	return { bookmarks, folders, tags };
}
