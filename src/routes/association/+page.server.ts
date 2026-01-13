import { redirect } from '@sveltejs/kit';
import { pocketbase } from '$lib/pocketbase';
import type { SettingsRecord } from '$lib/pocketbase.types';

export async function load() {
	const settings: SettingsRecord = await pocketbase
		.collection('settings')
		.getOne('settings', { fields: 'year' });

	redirect(307, `/association/${settings.year}`);
}
