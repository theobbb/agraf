<script lang="ts">
	import type { BookmarkFoldersRecord } from '$lib/pocketbase.types';
	import Description from '../+/description.svelte';

	const {
		item
	}: {
		item: BookmarkFoldersRecord;
	} = $props();
</script>

<Description {item} />
