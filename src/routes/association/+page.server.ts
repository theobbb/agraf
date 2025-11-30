import { redirect } from '@sveltejs/kit';
import { pocketbase } from '$lib/pocketbase';

export async function load() {
	const current_year = await pocketbase.collection('settings').getOne('currentyear');

	redirect(307, `/association/${current_year.value}`);
}
