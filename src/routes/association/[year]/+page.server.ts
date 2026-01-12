import { pocketbase } from '$lib/pocketbase';
import { redirect } from '@sveltejs/kit';
import type { MemberEntriesRecordExpanded } from './types';

export async function load({ params }) {
	const member_entries: MemberEntriesRecordExpanded[] = await pocketbase
		.collection('member_entries')
		.getFullList({ filter: `year= "${params.year}"`, expand: 'member,role' });

	// if (!member_entries.length) {
	// 	const current_year = await pocketbase.collection('settings').getOne('currentyear');
	// 	redirect(307, `/association/${current_year.value}`);
	// }

	const settings_featured = await pocketbase.collection('settings').getOne('featured');

	const { collection, id } = settings_featured.value;

	const featured = settings_featured ? await pocketbase.collection(collection).getOne(id) : null;

	return { member_entries, featured };
}
