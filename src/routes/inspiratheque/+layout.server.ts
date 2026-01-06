import { pocketbase } from '$lib/pocketbase';
import type { BookmarkTagsRecord } from '$lib/pocketbase.types';

export async function load() {
	const tags: BookmarkTagsRecord[] = await pocketbase.collection('bookmark_tags').getFullList();

	return { tags };
}
