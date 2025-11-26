<script lang="ts">
	import type { LayoutProps } from './$types';

	const { data, children }: LayoutProps = $props();
</script>

{@render children()}

<svelte:head>
	<style>
		html {
			--color-bg: black;
			--color-text: #f0f0f0;
		}
	</style>
</svelte:head>
