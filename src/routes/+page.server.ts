import { pocketbase } from '$lib/pocketbase';
import type { RelatedRecord } from '$lib/pocketbase.types';

export async function load() {
	const related: RelatedRecord[] = await pocketbase
		.collection('related')
		.getFullList({ sort: 'order' });

	return { related };
}
