import { pocketbase } from '$lib/pocketbase';
import type { ExpandedInfosRecord } from './types';

export async function load() {
	const infos: ExpandedInfosRecord[] = await pocketbase.collection('infos').getFullList({
		sort: 'order',
		expand: 'tags'
	});

	return { infos };
}
