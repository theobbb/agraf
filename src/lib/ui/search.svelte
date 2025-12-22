<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		children
	}: {
		children: Snippet;
	} = $props();
</script>

<input class="font-serif focus:ring-3" type="search" placeholder="Rechercher..." />
