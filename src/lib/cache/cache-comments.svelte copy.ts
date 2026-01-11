import type { CommentsCollectionOptions } from '$lib/types';
import { pocketbase } from '../pocketbase';
import type { CollectionRecords, CommentsRecord } from '../pocketbase.types';

export const comments_cache: Record<string, CommentsRecord[]> = $state({});

export async function get_comments(parent: string, collection: CommentsCollectionOptions) {
	const exists = comments_cache[parent];
	if (exists) return exists;

	const records: CommentsRecord[] = await pocketbase.collection('comments').getFullList({
		filter: `parent="${parent}" && collection="${collection}"`
	});

	comments_cache[parent] = records;
	if (!records?.length) return [];

	return records;
}

export function realtime_comments_subscribe(collection: CommentsCollectionOptions) {
	pocketbase.collection('comments').subscribe<CommentsRecord>(
		'*',
		function (e) {
			const comment = e.record;
			const exists = comments_cache[comment.parent];
			if (e.action == 'create') {
				if (exists) exists.push(comment);
				else comments_cache[comment.parent] = [comment];
			}
		},
		{ filter: `collection = "${collection}"` }
	);
}
export function realtime_comments_unsubscribe(collection: keyof CollectionRecords) {
	pocketbase.collection('comments').unsubscribe();
}
