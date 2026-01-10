<script lang="ts" generics="T extends string">
	import Explosion from '$lib/components/explosion.svelte';
	import type { WindowManager } from '$lib/components/windows/window-manager.svelte';
	import { onMount } from 'svelte';

	const { window_manager }: { window_manager?: WindowManager<T> } = $props();

	const { windows_array } = $derived(window_manager ? window_manager : { windows_array: [] });

	const minimized = $derived(windows_array.filter((window) => window.minimized));

	let time: string = $state(get_time());
	function get_time() {
		const now = new Date();
		let hours = now.getHours();
		const minutes = now.getMinutes().toString().padStart(2, '0');
		const ampm = hours >= 12 ? 'PM' : 'AM';

		hours = hours % 12 || 12; // convert 0 → 12

		return `${hours}:${minutes} ${ampm}`;
	}

	$effect(() => {
		let timeout_id: ReturnType<typeof setTimeout>;

		function schedule_update() {
			// Calculate ms until the start of the next minute
			const delay = 60000 - (Date.now() % 60000);

			timeout_id = setTimeout(() => {
				time = get_time();
				schedule_update(); // Recursively schedule the next one
			}, delay);
		}

		schedule_update();

		// Automatic cleanup
		return () => clearTimeout(timeout_id);
	});
</script>

<footer class="fixed right-gap bottom-0 left-gap z-500 border-t bg-bg">
	<div class="grid-12 max-lg:text-sm">
		<div
			class="col-span-4 py-1.5 font-normal max-lg:hidden"
			style="font-family: 'Comic', sans-serif;"
		>
			<div>© 2025 AGRAF ❤️ Tous droits réservés 😡🤬</div>
		</div>
		<div class="col-span-2 flex items-center gap-2 max-lg:hidden">
			{#each minimized as window}
				<button
					class="relative size-5 cursor-pointer overflow-hidden border"
					onclick={() => (window.minimized = false)}
				>
					<div class="font-serif text-2xl/3!">{window.title[0]}</div>
				</button>
			{/each}
		</div>

		<div class="col-span-6 flex items-center lg:col-span-2">
			<a class="" href="mailto:agraf.uqam@gmail.com" target="_blank">agraf.uqam@gmail.com</a>
		</div>

		<div class="col-span-6 flex items-center gap-4 py-1 lg:col-span-3">
			<a
				class="col-span-4 max-lg:col-start-8 max-lg:row-start-1 lg:col-span-1"
				target="_blank"
				href="https://www.instagram.com/agraf.uqam/">Instagram</a
			>
			<a
				class="col-span-4 max-lg:col-start-8 max-lg:row-start-2 lg:col-span-1"
				target="_blank"
				href="https://www.facebook.com/agraf.uqam/">Facebook</a
			>

			<div class="col-span-4 max-lg:col-start-8 max-lg:row-start-3 lg:col-span-1">
				<Explosion />
			</div>
		</div>
		<div class="flex items-center justify-end max-lg:hidden">
			{time}
		</div>
	</div>
</footer>
