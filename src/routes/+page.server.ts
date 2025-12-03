import { pocketbase } from '$lib/pocketbase';
import type { LinksRecord } from '$lib/pocketbase.types';

export async function load() {
	const settings_featured = await pocketbase.collection('settings').getOne('featured');

	const { collection, id } = settings_featured.value;

	const featured = settings_featured ? await pocketbase.collection(collection).getOne(id) : null;

	const links: LinksRecord[] = await pocketbase
		.collection('links')
		.getFullList({ sort: 'order', filter: 'hidden != true' });

	const settings_related = await pocketbase.collection('settings').getOne('related');
	const related = settings_related.value;

	return { featured, links, related };
}
