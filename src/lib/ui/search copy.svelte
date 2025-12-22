<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		children
	}: {
		children: Snippet;
	} = $props();
</script>

<input
	type="search"
	placeholder="Rechercher..."
	class={['font-pixel min-h-8 min-w-28 px-8 text-lg uppercase']}
/>

<style>
	input {
		background: silver;
		border: none;
		border-radius: 0;

		box-shadow:
			inset -1px -1px #fff,
			inset 1px 1px #0a0a0a,
			inset -2px -2px #dfdfdf,
			inset 2px 2px grey;

		color: transparent;
		text-shadow: 0 0 #222;

		-webkit-font-smoothing: none;
		outline: none;
	}

	/* Focus state (same dotted focus as button) */
	input:focus {
		outline: 1px dotted #000;
		outline-offset: -4px;
	}

	/* Disabled */
	input:disabled {
		color: grey;
		text-shadow: 1px 1px 0 #fff;
	}

	/* Remove default search decorations */
	input::-webkit-search-decoration,
	input::-webkit-search-cancel-button,
	input::-webkit-search-results-button,
	input::-webkit-search-results-decoration {
		display: none;
	}
</style>
