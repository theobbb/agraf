import { pocketbase } from '$lib/pocketbase';
import type { YearsRecord } from '$lib/pocketbase.types';

export async function load() {
	const years: YearsRecord[] = await pocketbase.collection('years').getFullList({ sort: '-id' });

	return { years };
}
