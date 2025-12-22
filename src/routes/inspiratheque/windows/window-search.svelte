<script lang="ts">
	import type { WindowManager } from '$lib/components/windows/window-manager.svelte';
	import Window from '$lib/components/windows/window.svelte';
	import Input from '$lib/ui/input.svelte';
	import type { Windows } from './types';

	const { manager }: { manager: WindowManager<Windows> } = $props();
</script>

<div class="pointer-events-none absolute top-24 left-12">
	<Window class="w-xl" title="Rechercher" {manager} id="search">
		<Input name="search" placeholder="Rechercher..." />
	</Window>
</div>
