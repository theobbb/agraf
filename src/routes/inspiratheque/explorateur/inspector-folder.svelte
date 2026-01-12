<script lang="ts">
	import { pocketbase } from '$lib/pocketbase';
	import Description from '../+/description.svelte';
	import type { ExpandedBookmarkFoldersRecord } from '../types';

	const {
		item
	}: {
		item: ExpandedBookmarkFoldersRecord;
	} = $props();
</script>

<Description {item} />
