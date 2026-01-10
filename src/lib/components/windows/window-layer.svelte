<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { WindowManager } from './window-manager.svelte';
	import Window from './window.svelte';

	const { manager, children }: { manager: WindowManager<any>; children: Snippet } = $props();
</script>

<div>
	{@render children()}
	<!-- <div class="absolute inset-0">
		{#each manager.windows_array as win (win.id)}
			{#if !win.closed && !win.minimized && manager.content[win.id]}
				<Window title={win.title} {manager} id={win.id} floating_layer>
					{@render manager.content[win.id]()}
				</Window>
			{/if}
		{/each}
	</div> -->
</div>
