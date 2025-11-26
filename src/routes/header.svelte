<script lang="ts">
	import { page } from '$app/state';
	import { links } from './static';

	const current = $derived(page.url.pathname);
</script>

<header class="top-0 z-100">
	<div class="grid-12 pt-1.5">
		{#each links as { name, description, href }, i}
			<a
				{href}
				class={[
					'group col-span-6 flex flex-col justify-between border-b pb-1 sm:col-span-4 md:col-span-3 xl:col-span-2',
					page.url.pathname == href
						? 'flex-col-reverse border-b-current bg-text text-bg ring-3 ring-text'
						: 'flex-col border-b-transparent hover:border-b-current'
				]}
			>
				<div class="max-w-60 pr-4">
					<div class="">{name}</div>
					<div class="whitespace-pre opacity-50">
						{description}
					</div>
				</div>
				<div class="invisible" aria-hidden="true">*</div>

				<div class={[page.url.pathname != href && 'opacity-0 group-hover:opacity-100']}>
					{i}
				</div>
			</a>
		{/each}
	</div>
</header>
