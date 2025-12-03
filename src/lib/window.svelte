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
		children
	}: {
		id: string;
		windows: Windows;
		name: string;
		class: string;
		hidden?: Boolean;
		children: Snippet;
	} = $props();

	let el: HTMLDivElement | null = null;

	const translate = $state({ x: 0, y: 0 });
	const start = { cursor: { x: 0, y: 0 }, window: { x: 0, y: 0 } };

	let is_dragging = false;

	$inspect(is_dragging);

	function onpointermove(ev: PointerEvent) {
		if (!el || !is_dragging) return;

		translate.x = start.window.x + (ev.clientX - start.cursor.x);
		translate.y = start.window.y + (ev.clientY - start.cursor.y);
	}

	function start_drag(ev: PointerEvent) {
		if ((ev.target as HTMLElement).closest('button')) return;

		if (!el) return;
		if (windows[id].hidden) return;

		document.documentElement.style.cursor = 'grabbing';
		document.documentElement.style.userSelect = 'none';
		focus();

		start.cursor.x = ev.clientX;
		start.cursor.y = ev.clientY;

		start.window.x = translate.x;
		start.window.y = translate.y;

		is_dragging = true;

		window.addEventListener('pointermove', onpointermove);

		el.setPointerCapture(ev.pointerId);
	}

	function endDrag(ev: PointerEvent) {
		if (!is_dragging) return;

		window.removeEventListener('pointermove', onpointermove);
		if (el) {
			el.releasePointerCapture(ev.pointerId);
		}
		document.documentElement.style.cursor = 'auto';
		document.documentElement.style.userSelect = 'auto';
		is_dragging = false;
	}

	// Your existing focus logic
	function focus() {
		const max_z_index = Math.max(...Object.values(windows).map((w) => Number(w.z_index)));
		windows[id].z_index = max_z_index + 1;
	}

	const z_index = $derived(windows[id]?.z_index);

	onMount(() => {
		if (!el) return;

		windows[id] = {
			el,
			z_index: 200,
			hidden,
			minimized: false
		};

		// Attach the cleanup handler to the window to catch releases anywhere
		window.addEventListener('pointerup', endDrag);

		// Cleanup window event listener on component destroy
		return () => {
			window.removeEventListener('pointerup', endDrag);
		};
	});
</script>

<div
	bind:this={el}
	onpointerdown={focus}
	class={[
		cx,
		'window pointer-events-auto overflow-y-auto border bg-bg px-2.5',
		!windows[id]?.hidden ? '' : 'invisible'
	]}
	style="z-index: {z_index}; transform: translate({translate.x}px, {translate.y}px);"
>
	<div
		onpointerdown={start_drag}
		class={[
			'sticky top-0 flex cursor-grab items-center justify-between gap-1 border-b bg-bg py-1.5'
		]}
	>
		<div class="">{name}</div>
		<div class="flex gap-1">
			<button class="hover:bg-text hover:text-bg"><IconSubstract /></button>
			<button onclick={() => (windows[id].hidden = true)} class="hover:bg-text hover:text-bg"
				><IconClose /></button
			>
		</div>
	</div>

	{@render children()}
</div>
