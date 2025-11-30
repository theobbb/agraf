import type { MemberEntriesRecord, MembersRecord, RolesRecord } from '$lib/pocketbase.types';

export type MemberEntriesRecordExpanded = MemberEntriesRecord & {
	expand: {
		member: MembersRecord;
		role: RolesRecord;
	};
};
