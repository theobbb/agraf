import { pocketbase } from '$lib/pocketbase';
import type { PostersRecord } from '$lib/pocketbase.types';

export async function load({ params }) {
	const poster: PostersRecord = await pocketbase.collection('posters').getOne(params.id);

	return { poster };
}
