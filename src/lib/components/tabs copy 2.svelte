<script module>
	export type Tab = {
		name: string;
	} & ({ type: 'button'; onclick: (tab: Tab, i: number) => void } | { type: 'link'; href: string });
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		tabs,
		active_tab_i: active_i,
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
			'cursor-pointer border-l px-gap py-1.5',
			i == tabs.length - 1 && 'border-r',
			i == active_i ? '' : 'border-transparent'
		]}
	>
		<div class={[active_i == i ? '' : 'text-2 hover:text-text!']}>
			{@render rendered(tab, i)}
		</div>
	</div>
{/snippet}

<div class={['-ml-gap flex border-b pl-gap whitespace-nowrap', cx]}>
	{#each tabs as tab, i}
		{#if tab.type == 'button'}
			<button onclick={() => tab.onclick(tab, i)} class="flex">
				{@render tab_content(tab, i)}
			</button>
		{:else}
			<a href={tab.href} class="flex">
				{@render tab_content(tab, i)}
			</a>
		{/if}
	{/each}
</div>
