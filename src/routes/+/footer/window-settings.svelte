<script lang="ts">
	import Dialog from '$lib/ui/skeleton/dialog.svelte';

	// const { onclose, resolve }: { onclose: () => void; resolve: () => void } = $props();
	const { onclose }: { onclose: () => void } = $props();
</script>

<Dialog title="Paramètres" {onclose}>
	<div class="mb-12">
		<div>Pas encore fait!</div>
		<div>Plein de paramètres stylés à venir...</div>
	</div>
</Dialog>
