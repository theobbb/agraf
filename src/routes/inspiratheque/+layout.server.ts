import { pocketbase } from '$lib/pocketbase';
import type { BookmarkFoldersRecord, BookmarksRecord } from '$lib/pocketbase.types';
import type {
	BookmarkFolderCountRecord,
	BookmarkTagGroupsRecord,
	BookmarkTagsRecord
} from '$lib/pocketbase.types';

export async function load() {
	const [tags, tag_groups, folders, folder_count_arr, bookmarks]: [
		BookmarkTagsRecord[],
		BookmarkTagGroupsRecord[],
		BookmarkFoldersRecord[],
		BookmarkFolderCountRecord[],
		BookmarksRecord[]
	] = await Promise.all([
		pocketbase
			.collection('bookmark_tags')
			.getFullList<BookmarkTagsRecord>({ sort: '-bookmark_count', filter: `bookmark_count > 0` }),
		pocketbase
			.collection('bookmark_tag_groups')
			.getFullList<BookmarkTagGroupsRecord>({ sort: '-tag_count', filter: `tag_count > 0` }),
		pocketbase.collection('bookmark_folders').getFullList<BookmarkFoldersRecord>({
			sort: 'title',
			fields: 'id,parent,title,description'
		}),
		pocketbase.collection('bookmark_folder_count').getFullList<BookmarkFolderCountRecord>({
			sort: '-total_children'
		}),
		pocketbase.collection('bookmarks').getFullList<BookmarksRecord>({
			filter: 'approved = true',
			sort: '-created',
			fields: 'id,title,url,favicon,description,tags,likes,parent,screenshot,author,created'
		})
	]);

	const folder_count: Map<string, number> = new Map(
		folder_count_arr.map((s) => [s.id, s.total_children || 0])
	);
	const tags_map: Map<string, BookmarkTagsRecord> = new Map(tags.map((tag) => [tag.id, tag]));

	return { tags, tags_map, tag_groups, folders, folder_count, bookmarks };
}
