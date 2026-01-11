<script lang="ts">
	import Explosion from '$lib/components/explosion.svelte';
	import {
		use_current_manager,
		type WindowManager
	} from '$lib/components/windows/window-manager.svelte';
	import Button from '$lib/ui/button.svelte';
	import Inset from '$lib/ui/inset.svelte';
	import { onMount } from 'svelte';
	import FooterMenu from './footer-menu.svelte';

	//const { window_manager }: { window_manager?: WindowManager<T> } = $props();

	const window_manager_ctx = use_current_manager();
	const window_manager = $derived(window_manager_ctx.value);

	const windows_array = $derived(window_manager ? window_manager.windows_array : []);

	const minimized = $derived(windows_array.filter((window) => window.minimized));
</script>

<div class="flex w-full gap-x-1 divide-x whitespace-nowrap">
	{#each minimized as window}
		<button
			class="relative w-42 cursor-pointer border-x px-gap py-1.5 text-left"
			onclick={() => (window.minimized = false)}
		>
			<div class="-translate-y-px overflow-hidden text-ellipsis">{window.title}</div>
		</button>
	{/each}
</div>

<!-- <button
			class="relative size-5 cursor-pointer overflow-hidden border"
			onclick={() => (window.minimized = false)}
		>
			<div class="font-serif text-2xl/3!">{window.title[0]}</div>
		</button> -->
