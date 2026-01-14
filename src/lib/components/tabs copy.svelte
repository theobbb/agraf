<script module>
	export type Tab = {
		name: string;
	} & ({ type: 'button'; onclick: (tab: Tab, i: number) => void } | { type: 'link'; href: string });
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		tabs,
		active_tab_i,

		border_t = false,
		class: cx,
		rendered,
		...props
	}: {
		tabs: Tab[];
		active_tab_i: number;
		border_t?: boolean;
		class?: string | string[];
		rendered: Snippet<[item: Tab, i: number]>;
	} = $props();
</script>

{#snippet tab_content(tab: Tab, i: number)}
	<div
		class={[
			'-mb-px cursor-pointer border-t border-r border-b border-x-transparent border-t-transparent bg-bg px-3.5 py-1.5 text-left first:border-l',
			active_tab_i == i && ' border-r-text border-b-transparent first:border-l-text',
			active_tab_i == i && border_t && 'border-t-current!',
			active_tab_i == i + 1 && 'border-r-text'
		]}
	>
		<div class={[active_tab_i == i ? '' : 'text-2 hover:text-text!']}>
			{@render rendered(tab, i)}
		</div>
	</div>
{/snippet}

<div class={['-ml-gap flex border-b pl-gap whitespace-nowrap', cx]}>
	{#each tabs as tab, i}
		{#if tab.type == 'button'}
			<button onclick={() => tab.onclick(tab, i)}>
				{@render tab_content(tab, i)}
			</button>
		{:else}
			<a href={tab.href}>
				{@render tab_content(tab, i)}
			</a>
		{/if}
	{/each}
</div>
