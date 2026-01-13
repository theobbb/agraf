import { pocketbase } from '$lib/pocketbase';
import type { LinksRecord, PostersRecord, SettingsRecord } from '$lib/pocketbase.types';

export async function load() {
	const settings: SettingsRecord & { expand: { featured: PostersRecord } } = await pocketbase
		.collection('settings')
		.getOne('settings', { expand: 'featured', fields: 'featured,expand' });

	const featured = settings.expand.featured;

	const links: LinksRecord[] = await pocketbase
		.collection('links')
		.getFullList({ sort: 'order', filter: 'hidden != true' });

	return { featured, links };
}
