<script lang="ts">
	import Loader from '$lib/ui/loader.svelte';

	const DELAY = 2000;

	let loading = $state(true);

	$effect(() => {
		document.documentElement.style.overflow = 'hidden';
		document.documentElement.style.cursor = 'wait';

		let timeout_id: ReturnType<typeof setTimeout>;

		timeout_id = setTimeout(() => {
			loading = false;
			document.documentElement.style.cursor = 'none';
		}, DELAY);

		// Automatic cleanup
		return () => {
			console.log('return');
			clearTimeout(timeout_id);
			document.documentElement.style.overflow = '';
			document.documentElement.style.cursor = '';
		};
	});
</script>

<div class="fixed inset-0 flex items-center justify-center bg-black text-white">
	{#if loading}
		<div class="flex items-center gap-1.5">
			<Loader />
			Arrêt en cours
		</div>
	{/if}
</div>
