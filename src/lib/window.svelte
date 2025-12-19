<script lang="ts">
	import IconClose from '$lib/ui/icons/icon-close.svelte';
	import IconSubstract from '$lib/ui/icons/icon-substract.svelte';
	import { onMount, type Snippet } from 'svelte';
	import type { Windows } from './types';

	const {
		id,
		windows,
		name,
		class: cx,
		hidden = false,
		dialog,
		onclose,
		children
	}: {
		id: string;
		windows?: Windows;
		name: string;
		class?: string;
		hidden?: boolean;
		dialog?: boolean;
		onclose?: () => void;
		children: Snippet;
	} = $props();

	let el: HTMLDialogElement | HTMLDivElement | null = null;

	const z_index = $derived(windows?.[id]?.z_index || 100);
	const is_hidden = $derived(windows && windows[id]?.hidden);

	const translate = $state({ x: 0, y: 0 });
	const start = { cursor: { x: 0, y: 0 }, window: { x: 0, y: 0 } };

	const size = $state({ width: 0, height: 0 });

	let is_dragging = false;

	function onmove(ev: MouseEvent) {
		if (!el || !is_dragging) return;

		translate.x = start.window.x + (ev.clientX - start.cursor.x);
		translate.y = start.window.y + (ev.clientY - start.cursor.y);
	}

	function start_drag(ev: MouseEvent) {
		if ((ev.target as HTMLElement).closest('button')) return;

		if (!el) return;
		if (windows?.[id].hidden) return;

		document.documentElement.style.cursor = 'grabbing';
		document.documentElement.style.userSelect = 'none';
		focus();

		start.cursor.x = ev.clientX;
		start.cursor.y = ev.clientY;

		start.window.x = translate.x;
		start.window.y = translate.y;

		is_dragging = true;

		window.addEventListener('mousemove', onmove);
		window.addEventListener('mouseup', end_drag);
		//el.setPointerCapture(ev.pointerId);
	}

	function end_drag() {
		if (!is_dragging) return;

		window.removeEventListener('mousemove', onmove);
		window.removeEventListener('mouseup', end_drag);
		// window.removeEventListener('pointermove', onmove);
		// if (el) {
		// 	el.releasePointerCapture(ev.pointerId);
		// }
		document.documentElement.style.cursor = 'auto';
		document.documentElement.style.userSelect = 'auto';
		is_dragging = false;
	}

	// Your existing focus logic
	function focus() {
		if (!windows) return;
		const max_z_index = Math.max(...Object.values(windows).map((w) => Number(w.z_index)));
		windows[id].z_index = max_z_index + 1;
	}

	function hide() {
		if (dialog) {
			if (typeof onclose == 'function') onclose();
			return;
		}
		if (!windows) return;
		windows[id].hidden = true;
	}

	function minimize() {
		if (!el) return;
		el.style.width = '1000px';
	}

	const dialog_props = dialog ? { onclose, closedby: 'any' } : {};

	onMount(() => {
		if (!el) return;

		if (windows) {
			windows[id] = {
				el,
				z_index: 200,
				hidden,
				minimized: false
			};
		}
		if (dialog) el.showModal();

		// Attach the cleanup handler to the window to catch releases anywhere
		//window.addEventListener('pointerup', end_drag);

		// Cleanup window event listener on component destroy
		// return () => {
		// 	window.removeEventListener('pointerup', end_drag);

		// 	end_drag()
		// };
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<svelte:element
	this={dialog ? 'dialog' : 'div'}
	bind:this={el}
	{...dialog_props}
	onmousedown={focus}
	class={[
		cx,
		'window pointer-events-auto overflow-y-auto border bg-bg px-2.5 shadow',
		is_hidden ? 'invisible' : ''
	]}
	style="z-index: {z_index}; transform: translate({translate.x}px, {translate.y}px); "
>
	<header
		onmousedown={start_drag}
		class={[
			'sticky top-0 flex cursor-grab items-center justify-between gap-1 border-b bg-bg py-1.5 '
		]}
	>
		<div class="">{name}</div>
		<div class="flex gap-1">
			<button onclick={minimize} class="hover:bg-text hover:text-bg"><IconSubstract /></button>
			<button onclick={() => hide()} class="hover:bg-text hover:text-bg"><IconClose /></button>
		</div>
	</header>

	{@render children()}
</svelte:element>

<style>
	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.3);
		/* background-color: rgb(from var(--color-text) r g b / 80%); */
	}
</style>
