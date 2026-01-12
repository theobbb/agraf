<script lang="ts">
	import Button from '$lib/ui/button.svelte';
	import Inset from '$lib/ui/inset.svelte';
	import FooterMenu from './footer-menu.svelte';
	import Minimized from './minimized.svelte';
	import { auth } from '$lib/components/login/auth.svelte';

	let menu_open = $state(true);

	let time: string = $state(get_time());
	function get_time() {
		const now = new Date();

		// padStart ensures hours and minutes always have two digits (e.g., 09:05)
		const hours = now.getHours().toString().padStart(2, '0');
		const minutes = now.getMinutes().toString().padStart(2, '0');

		return `${hours}:${minutes}`;
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

	const cx = {
		item: 'pt-1.5 pb-2'
	};
</script>

<footer
	class="fixed right-gap bottom-2.5 left-gap z-500 max-lg:hidden lg:bottom-0 lg:border-t lg:bg-bg"
>
	<div class="grid-12 max-lg:text-sm">
		<div class="relative col-span-2">
			{#if menu_open}
				<FooterMenu onclose={() => (menu_open = false)} />
			{/if}

			<Button id="footer-menu-toggle" variant="icon" onclick={() => (menu_open = !menu_open)}>
				<img class="size-6" src="/icons/computer.webp" alt="icon-computer" />
			</Button>
		</div>
		<!-- <div class="relative col-span-2">
			<div class="absolute top-0 left-0 -z-10 -translate-y-full">
				{#if menu_open}
					<FooterMenu onclose={() => (menu_open = false)} />
				{/if}
			</div>
			<Button class="min-w-0! pr-3! pl-2!" onclick={() => (menu_open = !menu_open)}>
				<div class="flex items-center gap-2">
					<img class="size-6" src="/icons/computer.webp" />
					<div>Démarrer</div>
				</div>
			</Button>
		</div> -->
		<div class="col-span-6 flex items-center gap-2 max-lg:hidden">
			<Minimized />
		</div>

		<div class={[cx.item, 'col-start-12 flex items-center justify-end max-lg:hidden']}>
			<Inset>
				<div class="px-1">{time}</div>
			</Inset>
		</div>
	</div>
</footer>
