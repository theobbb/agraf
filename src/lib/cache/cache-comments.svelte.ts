// comments-service.svelte.ts
import { getContext, setContext } from 'svelte';
import { pocketbase } from '../pocketbase';
import type { CommentsCollectionOptions } from '$lib/types';
import type { CommentsRecord } from '../pocketbase.types';

export class CommentsService {
	// This cache is now instance-specific (unique per user session)
	cache = $state<Record<string, CommentsRecord[]>>({});

	async get_comments(parent: string, collection: CommentsCollectionOptions) {
		const exists = this.cache[parent];
		if (exists) return exists;

		const records = await pocketbase.collection('comments').getFullList<CommentsRecord>({
			filter: `parent="${parent}" && collection="${collection}"`
		});

		this.cache[parent] = records;
		return records;
	}

	subscribe(collection: CommentsCollectionOptions) {
		return pocketbase.collection('comments').subscribe<CommentsRecord>(
			'*',
			(e) => {
				const comment = e.record;
				const exists = this.cache[comment.parent];

				if (e.action === 'create') {
					if (exists) {
						// Using Svelte 5 reactivity:
						// If you want the UI to update, ensure the array trigger works
						this.cache[comment.parent] = [...exists, comment];
					} else {
						this.cache[comment.parent] = [comment];
					}
				}
				// You might also want to handle 'delete' or 'update' actions here
			},
			{ filter: `collection = "${collection}"` }
		);
	}

	unsubscribe() {
		pocketbase.collection('comments').unsubscribe();
	}
}

const COMMENTS_KEY = Symbol('COMMENTS_SERVICE');

export function init_comments_service() {
	return setContext(COMMENTS_KEY, new CommentsService());
}

export function use_comments() {
	const service = getContext<CommentsService>(COMMENTS_KEY);
	if (!service) throw new Error('CommentsService not initialized');
	return service;
}
