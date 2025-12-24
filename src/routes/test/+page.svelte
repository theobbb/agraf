<script>
	import Loader from '$lib/ui/loader.svelte';
</script>

<div class="fixed top-24 right-36 text-6xl"><Loader /></div>

<svelte:head>
	<style>
		html {
			--color-bg: black;
			--color-text: white;
			--color-text-2: rgb(from var(--color-text) r g b / 40%);

			--color-link: #90caf9;
			--color-link-visited: #bb86fc;
		}
	</style>
</svelte:head>
