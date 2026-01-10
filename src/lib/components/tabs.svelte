<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';

	const {
		items,
		active_item_i,
		rendered,
		border_t = false,
		class: cx
	}: {
		items: T[];
		active_item_i: number;
		rendered: Snippet<[item: T, i: number]>;
		border_t?: boolean;
		class?: string | string[];
	} = $props();
</script>

<div class={['-ml-gap flex border-b pl-gap whitespace-nowrap', cx]}>
	{#each items as item, i}
		<div
			class={[
				'-mb-px border-t border-r border-b border-x-transparent border-t-transparent bg-bg px-3.5 py-1.5 text-left first:border-l',
				active_item_i == i && ' border-r-text border-b-transparent first:border-l-text',
				active_item_i == i && border_t && 'border-t-current!',
				active_item_i == i + 1 && 'border-r-text'
			]}
		>
			<div class={[active_item_i == i ? '' : 'text-2']}>{@render rendered(item, i)}</div>
		</div>
	{/each}
</div>
<!-- <div class={['-ml-gap flex border-b pl-gap whitespace-nowrap', cx]}>
	{#each items as item, i}
		<div
			class={[
				'-mb-px border border-r border-b border-x-transparent bg-bg px-3.5 py-1.5 text-left first:border-l',
				active_item_i == i && 'border-r-text border-b-transparent first:border-l-text',
				active_item_i == i + 1 && 'border-r-text'
			]}
		>
			<div class={[active_item_i == i ? '' : 'text-2']}>{@render rendered(item, i)}</div>
		</div>
	{/each}
</div> -->
