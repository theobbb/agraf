<script lang="ts">
	import type { Snippet } from 'svelte';

	type Variant = 'base' | 'action' | 'cancel';
	type Size = 'sm' | 'md' | 'lg';
	const {
		variant = 'base',
		type = 'button',
		size = 'md',
		class: cx,
		onclick,
		children
	}: {
		variant?: Variant;
		type?: 'button' | 'submit';
		size?: Size;
		class?: string;
		onclick?: () => void;
		children: Snippet;
	} = $props();

	const variant_cx = {
		base: 'bg-white/10 border-black/20',
		action: 'bg-green-900 text-white/90 border-green-600/50',
		cancel: 'bg-red-500'
	};

	const size_cx: Record<Size, string> = {
		sm: 'min-w-19 min-h-5.5 px-4 text-xs',
		md: 'min-w-28 min-h-8 px-8 text-lg',
		lg: 'min-w-44 min-h-10 px-16 text-2xl'
	};
</script>

<button
	{onclick}
	class={['font-pixel font-normal uppercase', variant_cx[variant], size_cx[size], cx]}
	{type}
>
	{@render children?.()}
</button>

<style>
	/* Base button styling */
	button {
		background: silver;
		border: none;
		border-radius: 0;
		/*box-sizing: border-box;
		 min-height: 23px;
		min-width: 75px;
		padding: 0 12px; */

		box-shadow:
			inset -1px -1px #0a0a0a,
			inset 1px 1px #fff,
			inset -2px -2px grey,
			inset 2px 2px #dfdfdf;

		color: transparent;
		text-shadow: 0 0 #222;

		/* font-size: 11px; */
		-webkit-font-smoothing: none;
	}

	/* Active (pressed) state */
	button:not(:disabled):active {
		box-shadow:
			inset -1px -1px #fff,
			inset 1px 1px #0a0a0a,
			inset -2px -2px #dfdfdf,
			inset 2px 2px grey;

		text-shadow: 1px 1px #222;
	}

	/* Focus ring */
	button:focus {
		outline: 1px dotted #000;
		outline-offset: -4px;
	}

	/* Remove Firefox inner focus border */
	button::-moz-focus-inner {
		border: 0;
	}

	/* Disabled */
	button:disabled {
		color: grey;
		text-shadow: 1px 1px 0 #fff;
	}
</style>
