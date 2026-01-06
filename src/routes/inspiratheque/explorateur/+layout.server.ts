import { pocketbase } from '$lib/pocketbase';
import type { BookmarkTagsRecord } from '$lib/pocketbase.types';
import { redirect } from '@sveltejs/kit';
import type { ExpandedBookmarkFoldersRecord, ExpandedBookmarksRecord } from '../types';

export async function load() {
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
		})
	]);

	// setHeaders({
	// 	'cache-control': 'public, max-age=600'
	// });

	// const recent_url = '/inspiratheque/' + bookmarks[0].id;
	// redirect(302, recent_url);

	return { bookmarks, folders, tags };
}
