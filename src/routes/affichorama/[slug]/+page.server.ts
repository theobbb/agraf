import { pocketbase } from '$lib/pocketbase';
import type { PostersRecord } from '$lib/pocketbase.types';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const poster: PostersRecord = await pocketbase
		.collection('posters')
		.getFirstListItem(`slug="${params.slug}"`);

	if (!poster) error(404, 'Affiche introuvable');

	type PosterPreview = { title: string; slug: string } | null;

	const [prev, next] = await Promise.all([
		pocketbase.collection('posters').getList(1, 1, {
			filter: `date > "${poster.date}"`,
			sort: 'date',
			fields: 'slug,title',
			requestKey: 'poster_prev_slug'
		}),
		pocketbase.collection('posters').getList(1, 1, {
			filter: `date < "${poster.date}"`,
			sort: '-date',
			fields: 'slug,title',
			requestKey: 'poster_next_slug'
		})
	]);

	// 	const previous = await pocketbase.collection('posters').getList(1, 1, {
	// 		filter: `date < "${poster.date}"`,
	// 		sort: '-date',
	// 		fields: 'slug,title' // Only request the slug field
	// 	});
	// const next = await pocketbase.collection('posters').getList(1, 1, {
	// 	filter: `date < "${poster.date}"`,
	// 	sort: '-date',
	// 	fields: 'slug,title' // Only request the slug field
	// });

	//const next_slug = next.items.length > 0 ? next.items[0].slug : null;

	return {
		poster,
		prev: prev.items[0] ?? null,
		next: next.items[0] ?? null
	};
}
