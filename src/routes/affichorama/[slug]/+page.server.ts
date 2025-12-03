import { pocketbase } from '$lib/pocketbase';
import type { PostersRecord } from '$lib/pocketbase.types';

export async function load({ params }) {
	const poster: PostersRecord = await pocketbase
		.collection('posters')
		.getFirstListItem(`slug="${params.slug}"`);

	const next = await pocketbase.collection('posters').getList(1, 1, {
		filter: `date < "${poster.date}"`,
		sort: '-date',
		fields: 'slug' // Only request the slug field
	});

	const next_slug = next.items.length > 0 ? next.items[0].slug : null;

	return { poster, next_slug };
}
