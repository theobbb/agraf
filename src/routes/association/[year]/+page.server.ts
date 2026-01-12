import { pocketbase } from '$lib/pocketbase';
import type { MemberEntriesRecordExpanded } from './types';

export async function load({ params }) {
	const member_entries: MemberEntriesRecordExpanded[] = await pocketbase
		.collection('member_entries')
		.getFullList({ filter: `year= "${params.year}"`, expand: 'member,role' });

	return { member_entries };
}
