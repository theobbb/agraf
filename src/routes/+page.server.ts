import { pocketbase } from '$lib/pocketbase';
import type { EventsRecord, RelatedRecord } from '$lib/pocketbase.types';

export async function load() {
	const related: RelatedRecord[] = await pocketbase
		.collection('related')
		.getFullList({ sort: 'order' });

	const calendar_events: EventsRecord[] = await pocketbase
		.collection('events')
		.getFullList({ sort: 'start_time' });

	return { related, calendar_events };
}
