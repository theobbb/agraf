<script lang="ts">
	import Dialog from '$lib/ui/skeleton/dialog.svelte';

	// const { onclose, resolve }: { onclose: () => void; resolve: () => void } = $props();
	const { onclose }: { onclose: () => void } = $props();
</script>

<Dialog title="Corbeille" {onclose}>
	Concordia
	<div>
		<img src="/icons/recycle-bin.webp" />
		(Ne pas cliquer)
	</div>
</Dialog>
