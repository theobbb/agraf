import type { InfosRecord, InfoTagsRecord } from '$lib/pocketbase.types';

export type ExpandedInfosRecord = InfosRecord & {
	expand: {
		tags: InfoTagsRecord[];
	};
};
