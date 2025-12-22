<script lang="ts">
	import Window from '$lib/components/windows/window.svelte';
	import { onMount, type Snippet } from 'svelte';

	let {
		onclose,
		title,
		class: cx,
		children
	}: { onclose: () => void; title: string; class?: string; children: Snippet } = $props();

	const id = $props.id();
	// onMount(() => {
	// 	if (!el) return;
	// 	el.showModal();

	// 	el.addEventListener('close', onclose);

	// 	return () => {
	// 		el?.removeEventListener('close', onclose);
	// 	};
	// });
</script>

<Window id="window-dialog-{id}" dialog class="m-auto text-text {cx}" {onclose} {title}>
	{@render children()}
</Window>

<!-- <div class="border border-text! bg-bg px-4.5 py-3 text-text">
		<div class="text-right">
			<button onclick={onclose} class="mb-16 font-serif uppercase italic">X</button>
		</div>
		<div>{@render children()}</div>
	</div> -->

<style>
	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.3);
		/* background-color: rgb(from var(--color-text) r g b / 80%); */
	}
</style>
