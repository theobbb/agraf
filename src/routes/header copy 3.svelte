<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { links } from './static';
	import { useIntersectionObserver } from '$lib/utils/intersection-observer';

	let sentinel: HTMLHeadElement;

	let scrolled = $state(false);

	let hovered_link = $state('');

	type StickyLink = {
		name: string;
		description: string;
		href: string;
		sentinel: HTMLDivElement | null;
		sticky: boolean;
	};

	const sticky_links: StickyLink[] = $state(
		links.map((link) => ({ ...link, sentinel: null, sticky: false }))
	);

	function handle_intersect(entry: IntersectionObserverEntry, link: StickyLink) {
		if (entry.isIntersecting) {
			link.sticky = false;
		} else {
			link.sticky = true;
		}
	}

	onMount(() => {
		sticky_links.forEach((link) => {
			const cleanup = useIntersectionObserver(
				link.sentinel,
				(entry) => handle_intersect(entry, link),
				{
					root: null, // The viewport
					rootMargin: '0px 0px 0px 0px', // We can keep this simple since we use the 1px sentinel
					threshold: 0
				}
			);
		});
		// const cleanup = useIntersectionObserver(sentinel, handle_intersect, {
		// 	root: null, // The viewport
		// 	rootMargin: '0px 0px 0px 0px', // We can keep this simple since we use the 1px sentinel
		// 	threshold: 0
		// });

		// return cleanup;
	});
</script>

<div bind:this={sentinel}></div>
<header class={[' z-100 bg-bg', scrolled && 'border-b']}>
	<div class="grid-12 sticky top-0 self-start pt-1.5">
		{#each sticky_links as link, i}
			<a
				href={link.href}
				class={[
					'group col-span-6 flex flex-col justify-between border-b pb-1 sm:col-span-4 md:col-span-3 xl:col-span-2',
					(
						link.href == '/'
							? page.url.pathname === link.href
							: page.url.pathname.startsWith(link.href)
					)
						? 'flex-col-reverse border-b-current  max-xl:bg-text max-xl:text-bg max-xl:ring-3 max-xl:ring-text'
						: 'flex-col border-b-transparent hover:border-b-current'
				]}
			>
				<div class="max-w-60 pr-4">
					<div class={['fixed top-0']}>{link.name}</div>
					<div bind:this={link.sentinel}></div>
					<div class="whitespace-pre opacity-50">
						{link.description}
					</div>
				</div>
				<div class="invisible" aria-hidden="true">*</div>

				<div class={[page.url.pathname != link.href && 'opacity-0 group-hover:opacity-100']}>
					{i}
				</div>
			</a>
		{/each}
	</div>
</header>
