import { pocketbase } from '$lib/pocketbase';
import type { BookmarkTagGroupsRecord, BookmarkTagsRecord } from '$lib/pocketbase.types';
import type { ExpandedBookmarkFoldersRecord } from './types';

export async function load() {
	const [tags, tag_groups, folders]: [
		BookmarkTagsRecord[],
		BookmarkTagGroupsRecord[],
		ExpandedBookmarkFoldersRecord[]
	] = await Promise.all([
		pocketbase
			.collection('bookmark_tags')
			.getFullList<BookmarkTagsRecord>({ sort: '-bookmark_count', filter: `bookmark_count > 0` }),
		pocketbase
			.collection('bookmark_tag_groups')
			.getFullList<BookmarkTagGroupsRecord>({ sort: '-tag_count', filter: `tag_count > 0` }),
		pocketbase.collection('bookmark_folders').getFullList<ExpandedBookmarkFoldersRecord>({
			sort: 'title',
			fields: 'id,parent,title,description'
		})
	]);

	return { tags, tag_groups, folders };
}
