<script lang="ts">
	import { onMount } from 'svelte';

	let { dialog, children, ...props } = $props();

	let el: HTMLDialogElement | null = null;

	function onclose() {
		dialog.open = false;
	}

	onMount(() => {
		if (!el) return;
		el.showModal();

		el.addEventListener('close', onclose);

		return () => {
			el?.removeEventListener('close', onclose);
		};
	});
</script>

<dialog bind:this={el} closedby="any" class="{props.class} mt-auto ml-auto min-w-md">
	<div class="border border-white/20 bg-bg px-4.5 py-3 text-text">
		<button onclick={onclose} class="mb-16 font-serif text-3xl uppercase italic">X Fermer</button>
		<div>{@render children()}</div>
	</div>
</dialog>

<style>
	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.5);
		/* background-color: rgb(from var(--color-text) r g b / 80%); */
	}
</style>
