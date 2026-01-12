<script lang="ts">
	import type { PaginationResult } from '$lib/types';
	import IconChevronLeft from '$lib/ui/icons/icon-chevron-left.svelte';
	import IconChevronRight from '$lib/ui/icons/icon-chevron-right.svelte';

	const { pagination, route }: { pagination: PaginationResult<any>; route: string } = $props();

	const { page, perPage, totalItems, totalPages } = $derived(pagination);

	const N_LINKS = 5;

	const range = $derived.by(() => {
		// 1. Determine how many links we can actually show
		const count = Math.min(N_LINKS, totalPages);

		// 2. Ideal start to keep current page centered
		let start = page - Math.floor(count / 2);

		// 3. Clamp start so we don't go below 1 or exceed totalPages
		start = Math.max(1, Math.min(start, totalPages - count + 1));

		// 4. Return an array of page numbers
		return Array.from({ length: count }, (_, i) => start + i);
	});
</script>

<div class="mt-8 mb-12 flex flex-wrap items-end justify-between">
	<div class="font-serif">total: {totalItems}</div>
	{#if totalItems > perPage}
		<div class="min-w-72- flex w-fit items-center gap-1.5">
			<div class="flex items-center justify-center gap-1 text-xl">
				{#if page > 1}
					<a href="{route}?page={page - 1}" class="border py-1.5 hover:bg-text hover:text-bg">
						<IconChevronLeft />
					</a>
				{:else}
					<div class="text-2"><IconChevronLeft /></div>
				{/if}
			</div>

			{#each range as p}
				<a
					class={[
						'flex border px-gap py-1.5 text-center hover:bg-text hover:text-bg',
						page == p ? 'bg-text text-bg' : ''
					]}
					href="{route}?page={p}"
				>
					{p}
				</a>
			{/each}

			<div class="flex h-full items-center justify-center gap-1 text-xl">
				{#if page < totalPages}
					<a href="{route}?page={page + 1}" class="border py-1.5 hover:bg-text hover:text-bg">
						<IconChevronRight />
					</a>
				{:else}
					<div class="text-2"><IconChevronRight /></div>
				{/if}
			</div>
		</div>
	{/if}
</div>
