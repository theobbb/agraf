import { browser } from '$app/environment';
import { pocketbase } from '$lib/pocketbase';
import type { ExpandedBookmarksRecord } from '../types';

export async function load({ data, params }) {
	// if (!browser) return;
	const bookmarks: ExpandedBookmarksRecord[] = await pocketbase
		.collection('bookmarks')
		.getFullList({
			filter: `parent = "${params.id}" && approved = true`,
			expand: 'tags',
			sort: '-created'
		});

	console.log(bookmarks.length);
	return { ...data, bookmarks };
}
