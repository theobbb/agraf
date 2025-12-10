<script lang="ts">
	import type { LayoutProps } from './$types';

	const { data, children }: LayoutProps = $props();
</script>

{@render children()}

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
