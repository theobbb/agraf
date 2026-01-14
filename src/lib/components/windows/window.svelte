<script lang="ts">
	import IconClose from '$lib/ui/icons/icon-close.svelte';
	import IconSubstract from '$lib/ui/icons/icon-substract.svelte';
	import { onMount, type Snippet } from 'svelte';
	import type { WindowManager } from './window-manager.svelte';
	import ResizeHandles from './resize-handles.svelte';
	import Button from '$lib/ui/button.svelte';
	import IconMaximize from '$lib/ui/icons/icon-maximize.svelte';
	import IconRestore from '$lib/ui/icons/icon-restore.svelte';

	const {
		id,
		title,
		manager,
		hidden = false,
		header,
		class: cx,
		style,
		dialog,
		onclose,
		children
	}: {
		id: string;
		title: string;
		class?: string | string[];
		style?: string;
		dialog?: boolean;
		manager?: WindowManager<any>;
		hidden?: boolean;
		header?: Snippet;
		onclose?: () => void;
		children: Snippet;
	} = $props();

	if (manager && !manager.windows[id]) {
		manager.windows[id] = {
			id,
			title,
			z_index: 100,
			minimized: false,
			closed: hidden,
			translate: { x: 0, y: 0 },
			size: { width: 0, height: 0 },
			is_floating: false,
			ghost_size: { width: 0, height: 0 },
			is_expanded: false,
			container: null
		};
	}

	// We use a fallback to a local object so the UI doesn't crash if manager is missing
	const local_fallback = $state({
		id,
		title,
		z_index: 100,
		minimized: false,
		closed: hidden,
		translate: { x: 0, y: 0 },
		size: { width: 0, height: 0 },
		is_floating: false,
		ghost_size: { width: 0, height: 0 },
		is_expanded: false,
		container: null
	});
	const target = $derived(manager?.windows[id] ?? local_fallback);

	// Derived visibility - access target properties directly to ensure reactivity
	const is_visible = $derived(!target.closed && !target.minimized);

	let container: HTMLDialogElement | HTMLDivElement | null = $state(null);
	$effect(() => {
		if (container) target.container = container;
	});

	const { z_index, closed, minimized, translate, size, is_floating, ghost_size, is_expanded } =
		$derived(target);

	const start = { cursor: { x: 0, y: 0 }, window: { x: 0, y: 0 } };

	let is_dragging = false;

	function onmove(ev: MouseEvent) {
		if (!container || !is_dragging) return;

		if (is_expanded) toggle_expand();

		target.translate.x = start.window.x + (ev.clientX - start.cursor.x);
		target.translate.y = start.window.y + (ev.clientY - start.cursor.y);
	}

	function start_drag(ev: MouseEvent) {
		if ((ev.target as HTMLElement).closest('button')) return;

		if (!container) return;

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
	}

	function end_drag() {
		if (!is_dragging) return;

		window.removeEventListener('mousemove', onmove);
		window.removeEventListener('mouseup', end_drag);

		document.documentElement.style.cursor = 'auto';
		document.documentElement.style.userSelect = 'auto';
		is_dragging = false;
	}

	function focus() {
		if (!manager) return;
		manager.focus_window(id);
	}

	function minimize() {
		if (!manager) return;
		//container.style.width = `${1000}px`;

		manager.minimize_window(id);
	}
	function close() {
		if (typeof onclose == 'function') onclose();

		if (target.is_expanded) {
			history.back();
			// The popstate listener will fire and set is_expanded to false
		}
		if (dialog) {
			return;
		}
		if (!manager) return;
		manager.close_window(id);
	}

	const dialog_props = dialog ? { onclose, closedby: 'any' } : {};

	//let ghost_rect = $state({ width: 0, height: 0 });
	//let ghost_translate = $state({ x: 0, y: 0 });

	let is_resizing = $state(false);

	function handle_interaction() {
		if (!container) return;
		if (is_floating) return;

		const rect = container.getBoundingClientRect();

		target.ghost_size = { width: rect.width, height: rect.height };
		target.size = { width: rect.width, height: rect.height };

		target.is_floating = true;
	}

	function start_resize(
		ev: MouseEvent,
		direction: 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw'
	) {
		ev.preventDefault();
		ev.stopPropagation();

		handle_interaction(); // Ensure we are floated
		focus();

		const start_mouse = { x: ev.clientX, y: ev.clientY };
		const start_size = { ...target.size };
		const start_translate = { ...translate };

		function on_resize_move(move_ev: MouseEvent) {
			const dx = move_ev.clientX - start_mouse.x;
			const dy = move_ev.clientY - start_mouse.y;

			// Handle Horizontal
			if (direction.includes('e')) {
				target.size.width = Math.max(150, start_size.width + dx);
			}
			if (direction.includes('w')) {
				const new_width = Math.max(150, start_size.width - dx);
				const actual_delta = start_size.width - new_width;
				target.size.width = new_width;
				target.translate.x = start_translate.x + actual_delta;
			}

			// Handle Vertical
			if (direction.includes('s')) {
				target.size.height = Math.max(100, start_size.height + dy);
			}
			if (direction.includes('n')) {
				const new_height = Math.max(100, start_size.height - dy);
				const actual_delta = start_size.height - new_height;
				target.size.height = new_height;
				target.translate.y = start_translate.y + actual_delta;
			}
		}

		function end_resize() {
			window.removeEventListener('mousemove', on_resize_move);
			window.removeEventListener('mouseup', end_resize);
			document.documentElement.style.cursor = 'auto';
			is_resizing = false;
		}

		is_resizing = true;
		window.addEventListener('mousemove', on_resize_move);
		window.addEventListener('mouseup', end_resize);
	}

	function toggle_expand() {
		handle_interaction(); // Ensure we are floated
		focus();

		target.is_expanded = !target.is_expanded;
		if (target.is_expanded) {
			history.pushState({ isDialogContext: true }, '');
			window.addEventListener('popstate', handle_back_gesture, { once: true });
		} else {
			history.back();
		}
	}
	function handle_back_gesture() {
		if (target.is_expanded) {
			target.is_expanded = false;
		}
	}

	onMount(() => {
		if (dialog && container instanceof HTMLDialogElement) {
			container.showModal();
		}
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<svelte:element
	this={dialog ? 'dialog' : 'div'}
	bind:this={container}
	{...dialog_props}
	onmousedown={focus}
	class={[
		cx,
		'window h-fit- pointer-events-auto flex flex-col border bg-bg shadow',
		is_visible ? '' : 'invisible',
		is_floating ? 'absolute! max-h-[unset]! min-h-[unset]! max-w-[unset]! min-w-[unset]!' : '',
		is_expanded && 'fixed! inset-0 z-1000! h-full! w-full!',
		is_visible && is_expanded && 'expanded'
	]}
	style="z-index: {z_index}; {style}; 
	  {is_expanded ? '' : `transform: translate(${translate.x}px, ${translate.y}px);`} {is_floating
		? `width: ${size.width}px; height: ${size.height}px; margin: 0;`
		: ''}; {dialog ? 'display: block;' : ''} "
>
	<header
		onmousedown={start_drag}
		ondblclick={toggle_expand}
		class={[
			'flex cursor-grab items-center justify-between gap-1 border-b px-gap py-1.5 whitespace-nowrap select-none '
		]}
	>
		<div class="truncate">
			{#if header}
				{@render header()}
			{:else}
				{title}
			{/if}
		</div>
		<div class="-mr-1 flex gap-0.5 text-lg max-lg:gap-1 max-lg:text-2xl">
			{#if manager}
				<Button onclick={minimize} variant="icon" size="sm">
					<IconSubstract />
				</Button>
				<Button onclick={toggle_expand} variant="icon" size="sm">
					{#if is_expanded}
						<IconRestore />
					{:else}
						<IconMaximize />
					{/if}
				</Button>
			{/if}
			<Button onclick={close} variant="icon" size="sm">
				<IconClose />
			</Button>
		</div>
	</header>

	<div
		class="scroll-container relative mb-px flex flex-1 flex-col overflow-x-auto overflow-y-auto px-2.5 pr-gap"
		style="overscroll-behavior: contain;"
	>
		{@render children()}
	</div>
	{#if !dialog}
		<ResizeHandles {start_resize} />
	{/if}
</svelte:element>
{#if is_floating}
	<div
		class={[cx, 'bg-red-900-']}
		style="width: {ghost_size.width}px; height: {ghost_size.height}px;"
	></div>
{/if}

<style>
	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.3);
		/* background-color: rgb(from var(--color-text) r g b / 80%); */
	}
</style>
