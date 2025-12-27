import { pocketbase } from '$lib/pocketbase';
import type { PostersRecord } from '$lib/pocketbase.types';
import type { PaginationResult } from '$lib/types';

export async function load({ url, setHeaders }) {
	const page = Number(url.searchParams.get('page') ?? 1);

	const posters: PaginationResult<PostersRecord> = await pocketbase
		.collection('posters')
		.getList(page, 16, { sort: '-date' });

	// setHeaders({
	// 	'cache-control': 'public, max-age=600'
	// });

	return { posters };
}
