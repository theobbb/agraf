<script lang="ts">
	import Dialog from '$lib/ui/skeleton/dialog.svelte';
	import type { ExpandedBookmarkFoldersRecord } from './types';

	const { onclose, parent }: { onclose: () => void; parent: ExpandedBookmarkFoldersRecord | null } =
		$props();
</script>

<Dialog {onclose} name="Suggerer un nouveau lien">
	sadsa
	<div>
		{parent?.title}
	</div>
</Dialog>
