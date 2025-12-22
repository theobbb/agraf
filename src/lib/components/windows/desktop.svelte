<script lang="ts" generics="T extends string">
	import type { Window, WindowManager } from './window-manager.svelte';

	const { manager }: { manager: WindowManager<T> } = $props();

	const { windows, windows_array } = $derived(manager);

	function open(window: Window<T>) {
		if (windows[window.id]?.closed) {
			manager.open_window(window.id);
			return;
		}
	}
</script>

<div class="fixed top-48 right-gap bottom-12 left-gap">
	<div class="flex flex-col flex-wrap items-start gap-4">
		{#each windows_array as window}
			<button
				class="w-16 cursor-pointer space-y-1 p-0.5 hover:bg-text/5"
				onclick={() => open(window)}
			>
				<div class="flex justify-center">
					<div class="relative flex size-9 items-center justify-center overflow-hidden border">
						<div class="font-serif">{window.title[0]}</div>
					</div>
				</div>
				<div class="font-pixel text-center text-sm/3.5 font-normal wrap-anywhere">
					{window.title}
				</div>
			</button>
		{/each}
	</div>
</div>
