<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { links } from './static';
	import { useIntersectionObserver } from '$lib/utils/intersection-observer';

	let sentinel: HTMLHeadElement;

	let scrolled = $state(false);

	let hovered_link = $state('');

	function handle_intersect(entry: IntersectionObserverEntry) {
		if (entry.isIntersecting) {
			scrolled = false;
		} else {
			scrolled = true;
		}
	}

	onMount(() => {
		const cleanup = useIntersectionObserver(sentinel, handle_intersect, {
			root: null, // The viewport
			rootMargin: '0px 0px 0px 0px', // We can keep this simple since we use the 1px sentinel
			threshold: 0
		});

		return cleanup;
	});
</script>

<div>
	<div class="grid-12 pt-1.5">
		{#each links as { description, href }, i}
			<a
				{href}
				class={[
					'group col-span-6 flex flex-col justify-between sm:col-span-4 md:col-span-3 xl:col-span-2',
					(href == '/' ? page.url.pathname === href : page.url.pathname.startsWith(href))
						? '  max-xl:bg-text max-xl:text-bg max-xl:ring-3 max-xl:ring-text'
						: 'flex-col border-b-transparent hover:border-b-current'
				]}
			>
				<div class="max-w-60 pr-4">
					<div class="whitespace-pre opacity-50">
						{description}
					</div>
				</div>
				<div class="invisible" aria-hidden="true">*</div>

				<!-- <div class={[page.url.pathname != href && 'opacity-0 group-hover:opacity-100']}>
						{i}
					</div> -->
			</a>
		{/each}
	</div>
	<div bind:this={sentinel}></div>
</div>
<header class={['sticky top-0 z-100 bg-bg', scrolled && 'border-b']}>
	<div class="grid-12 self-start pt-1.5">
		{#each links as { name, description, href }, i}
			<a
				{href}
				class={[
					'group  col-span-6 flex flex-col justify-between border-b pb-1 sm:col-span-4 md:col-span-3 xl:col-span-2',
					(href == '/' ? page.url.pathname === href : page.url.pathname.startsWith(href))
						? 'flex-col-reverse border-b-text  max-xl:bg-text max-xl:text-bg max-xl:ring-3 max-xl:ring-text'
						: 'flex-col border-b-transparent hover:border-b-current'
				]}
			>
				<div class=" max-w-60 pr-4">
					<div class="">{name}</div>
				</div>
			</a>
		{/each}
	</div>
</header>
