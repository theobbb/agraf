import { pocketbase } from '$lib/pocketbase';
import type { PostersRecord } from '$lib/pocketbase.types';
import type { PaginationResult } from '$lib/types';

export async function load() {
	const posters: PaginationResult<PostersRecord> = await pocketbase
		.collection('posters')
		.getList(1, 50);

	return { posters };
}
