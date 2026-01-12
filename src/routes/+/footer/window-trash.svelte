<script lang="ts">
	import Dialog from '$lib/ui/skeleton/dialog.svelte';

	// const { onclose, resolve }: { onclose: () => void; resolve: () => void } = $props();
	const { onclose }: { onclose: () => void } = $props();
</script>

<Dialog title="Corbeille" {onclose}>
	<a
		class="group flex flex-col items-center px-4 py-4"
		href="https://www.concordia.ca/cce/programs/graphic-design-full-time.html"
		target="_blank"
	>
		<div class="relative w-fit">
			<img src="/icons/recycle-bin.webp" alt="folder-icon" />
		</div>

		<div class="max-w-56 text-center text-balance underline-offset-4 group-hover:underline">
			(Ne pas cliquer)
		</div>
	</a>
</Dialog>
