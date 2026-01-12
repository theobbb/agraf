import { pocketbase } from '$lib/pocketbase';

export async function load() {
	const settings_related = await pocketbase.collection('settings').getOne('related');
	const related = settings_related.value;

	return { related };
}
