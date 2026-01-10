import { pocketbase } from '$lib/pocketbase';
import type { BookmarkTagGroupsRecord, BookmarkTagsRecord } from '$lib/pocketbase.types';

export async function load() {
	const tags: BookmarkTagsRecord[] = await pocketbase
		.collection('bookmark_tags')
		.getFullList({ sort: '-bookmark_count', filter: `bookmark_count > 0` });

	const tag_groups: BookmarkTagGroupsRecord[] = await pocketbase
		.collection('bookmark_tag_groups')
		.getFullList({ sort: '-tag_count', filter: `tag_count > 0` });

	return { tags, tag_groups };
}
