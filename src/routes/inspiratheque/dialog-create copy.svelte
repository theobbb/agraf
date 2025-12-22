<script lang="ts">
	import Button from '$lib/ui/button.svelte';
	import Dialog from '$lib/ui/skeleton/dialog.svelte';
	import type { ExpandedBookmarkFoldersRecord } from './types';

	const { onclose, parent }: { onclose: () => void; parent: ExpandedBookmarkFoldersRecord | null } =
		$props();
</script>

<Dialog
	{onclose}
	title="Suggérer un nouveau lien"
	class="w-[calc(100vw/12*4-var(--spacing-gap)*2)]"
>
	<div class="-mx-2.5 p-0.5">
		<input
			name="name"
			type="text"
			autofocus
			class={[
				'w-full border-0! px-4 font-serif text-6xl text-text outline-none focus:border-transparent! focus:ring-3'
			]}
			placeholder="URL"
		/>
		<div><Button class="w-full">Extraire</Button></div>
	</div>

	<!-- sadsa
	<div>
		{parent?.title}
	</div> -->
</Dialog>
