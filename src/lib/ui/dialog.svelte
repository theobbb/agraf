<script lang="ts">
	import { onMount } from 'svelte';

	let { children, ...props } = $props();

	let dialog: HTMLDialogElement | null = null;

	function onclose() {
		props.dialog.open = false;
		//if (typeof props.onclose == 'function') props.onclose();
	}

	onMount(() => {
		if (!dialog) return;
		console.log('ss');
		dialog.showModal();

		dialog.addEventListener('close', onclose);

		return () => {
			dialog?.removeEventListener('close', onclose);
		};
	});
</script>

<dialog bind:this={dialog} closedby="any" class="m-auto">
	<div class="border border-white/20 bg-black px-4.5 py-3 text-white">{@render children()}</div>
</dialog>

<!-- <div class="pointer-events-none fixed inset-0 flex items-center justify-center">
	<div bind:this={container} class="pointer-events-auto">
		{@render children()}
	</div>
</div> -->

<style>
	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.5); /* Dim the background */
	}
</style>
