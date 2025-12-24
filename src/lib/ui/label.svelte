<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLLabelAttributes } from 'svelte/elements';

	const { id, children }: HTMLLabelAttributes & { children: Snippet } = $props();
</script>

<label for={id} class="mb-1 block">{@render children()}</label>
