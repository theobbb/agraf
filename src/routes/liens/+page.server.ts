import { pocketbase } from '$lib/pocketbase';
import type { LinksRecord } from '$lib/pocketbase.types';

export async function load() {
	const links: LinksRecord[] = await pocketbase.collection('links').getFullList({ sort: 'order' });

	return { links };
}
