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
		border_top = true,
		class: cx,
		rendered,
		...props
	}: {
		tabs: Tab[];
		active_tab_i: number;
		border_top?: boolean;
		class?: string | string[];
		rendered: Snippet<[item: Tab, i: number]>;
	} = $props();
</script>

{#snippet tab_content(tab: Tab, i: number)}
	<div
		class={[
			'tab group box-shadow cursor-pointer px-gap py-1.5',
			i == tabs.length - 1 && '',
			i == active_i ? 'active' : '',
			border_top && 'border-top'
		]}
	>
		<div class={[active_i == i ? '' : 'text-2 group-hover:text-text!']}>
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

<style>
	.tab.active {
		box-shadow:
			1px 0 0 0 var(--color-text),
			-1px 0 0 0 var(--color-text),
			0 2px 0 0 var(--color-bg);
	}
	.tab.active.border-top {
		box-shadow:
			1px 0 0 0 var(--color-text),
			inset 1px 0 0 0 var(--color-text),
			0 2px 0 0 var(--color-bg),
			inset 0 1px 0 0 var(--color-text);
	}
</style>
