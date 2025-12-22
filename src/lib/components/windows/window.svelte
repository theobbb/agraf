<script lang="ts">
	import IconClose from '$lib/ui/icons/icon-close.svelte';
	import IconSubstract from '$lib/ui/icons/icon-substract.svelte';
	import { onMount, type Snippet } from 'svelte';
	import type { WindowManager, Window } from './window-manager.svelte';

	const {
		id,
		title,
		manager,
		hidden = false,
		header,
		class: cx,
		dialog,
		onclose,
		children
	}: {
		id: string;
		title: string;
		class?: string;
		dialog?: boolean;
		manager?: WindowManager<any>;
		hidden?: boolean;
		header?: Snippet;
		onclose?: () => void;
		children: Snippet;
	} = $props();

	const base_window = $state({
		id,
		title,
		z_index: 100,
		minimized: false,
		closed: hidden,
		translate: { x: 0, y: 0 }
	});
	if (manager) {
		manager.windows[id] = manager?.windows?.[id] || base_window;
	}
	const ctx = $derived(manager?.windows?.[id] || base_window);

	const { z_index, closed, minimized } = $derived(ctx);
	const visible = $derived(!closed && !minimized);

	// $inspect(ctx);
	let el: HTMLDialogElement | HTMLDivElement | null = null;

	const translate = $derived(ctx.translate);
	const start = { cursor: { x: 0, y: 0 }, window: { x: 0, y: 0 } };

	const size = $state({ width: 0, height: 0 });

	let is_dragging = false;

	function onmove(ev: MouseEvent) {
		if (!el || !is_dragging) return;

		const target = manager?.windows[id] || base_window;

		target.translate.x = start.window.x + (ev.clientX - start.cursor.x);
		target.translate.y = start.window.y + (ev.clientY - start.cursor.y);
	}

	function start_drag(ev: MouseEvent) {
		if ((ev.target as HTMLElement).closest('button')) return;

		if (!el) return;
		//if (windows?.[id].hidden) return;

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
	// function focus() {
	// 	//if (!windows) return;
	// 	const max_z_index = Math.max(...Object.values(windows).map((w) => Number(w.z_index)));
	// 	windows[id].z_index = max_z_index + 1;
	// }

	function focus() {
		if (!manager) return;
		manager.focus_window(id);
	}

	function minimize() {
		if (!manager) return;
		manager.minimize_window(id);
	}
	function close() {
		if (dialog) {
			if (typeof onclose == 'function') onclose();
			return;
		}
		if (!manager) return;
		manager.close_window(id);
	}

	const dialog_props = dialog ? { onclose, closedby: 'any' } : {};

	onMount(() => {
		if (!el) return;

		// if (windows) {
		// 	windows[id] = {
		// 		el,
		// 		z_index: 200,
		// 		hidden,
		// 		minimized: false
		// 	};
		// }

		if (dialog && el instanceof HTMLDialogElement) {
			el.showModal();
		}
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
		visible ? '' : 'invisible'
	]}
	style="z-index: {z_index}; transform: translate({translate.x}px, {translate.y}px); "
>
	<header
		onmousedown={start_drag}
		class={[
			'sticky top-0 flex cursor-grab items-center justify-between gap-1 border-b bg-bg py-1.5 select-none '
		]}
	>
		<div class="">
			{#if header}
				{@render header()}
			{:else}
				{title}
			{/if}
		</div>
		<div class="flex gap-1 max-lg:gap-1.5 max-lg:text-2xl">
			{#if manager}
				<button onclick={minimize} class="hover:bg-text hover:text-bg" type="button">
					<IconSubstract />
				</button>
			{/if}
			<button onclick={close} class="hover:bg-text hover:text-bg" type="button">
				<IconClose />
			</button>
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
