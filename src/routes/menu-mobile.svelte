<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import IconArrowCorner from '$lib/ui/icons/icon-arrow-corner.svelte';
	import Dialog from '$lib/ui/skeleton/dialog.svelte';
	import { links } from './static';

	const { onclose } = $props();

	onNavigate(onclose);
</script>

<Dialog class="mt-1.5 mr-gap w-full" title="Menu " {onclose}>
	<div class="divide-y">
		{#each links as { name, href }, i}
			{@const active =
				href == '/' ? page.url.pathname === href : page.url.pathname.startsWith(href)}
			<a
				{href}
				class={[
					'group col-span-6 flex flex-col justify-between  pt-1.5 pb-1 font-serif text-2xl sm:col-span-4 md:col-span-3 xl:col-span-2',
					active && 'italic'
				]}
			>
				<div class="flex pr-4">
					<div class="w-11">
						{#if active}
							{i + 1}.
						{:else}
							{i + 1}.
						{/if}
					</div>
					<div>{name}</div>
				</div>
			</a>
		{/each}
	</div>
</Dialog>
