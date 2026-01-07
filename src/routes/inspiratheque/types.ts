import type {
	BookmarkFoldersRecord,
	BookmarksRecord,
	BookmarkTagsRecord
} from '$lib/pocketbase.types';

export type ExpandedBookmarksRecord = BookmarksRecord & {
	expand: {
		tags: BookmarkTagsRecord[];
		parent: BookmarkFoldersRecord | null;
	};
	collectionName: 'bookmarks';
};
export type ExpandedBookmarkFoldersRecord = BookmarkFoldersRecord & {
	expand: {
		parent: BookmarkFoldersRecord | null;
	};
	collectionName: 'bookmark_records';
};

export function is_bookmark(
	item: ExpandedBookmarksRecord | ExpandedBookmarkFoldersRecord
): item is ExpandedBookmarksRecord {
	return 'url' in item;
}
