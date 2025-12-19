<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { links } from './static';
	import { useIntersectionObserver } from '$lib/utils/intersection-observer';

	let sentinel: HTMLHeadElement | null = null;

	let scrolled = $state(false);

	let hovered: string | null = $state('');

	function handle_intersect(entry: IntersectionObserverEntry) {
		if (entry.isIntersecting) {
			scrolled = false;
		} else {
			scrolled = true;
		}
	}

	const active_link_i = $derived(
		links.findIndex(({ href }) =>
			href == '/' ? page.url.pathname === href : page.url.pathname.startsWith(href)
		)
	);

	onMount(() => {
		if (!sentinel) return;
		const cleanup = useIntersectionObserver(sentinel, handle_intersect, {
			root: null, // The viewport
			rootMargin: '0px 0px 0px 0px', // We can keep this simple since we use the 1px sentinel
			threshold: 0
		});

		return cleanup;
	});
</script>

<header
	class={[
		'-mt-1.5- px-layout-x- sticky top-0  z-100  -mx-layout-x border-b ',
		scrolled && 'border-b'
	]}
>
	<div class="gap-4- flex">
		{#each links as { name, href }, i}
			<a
				{href}
				class={[
					'-mb-px cursor-pointer border-r border-b border-x-transparent bg-bg px-3 py-1.5 text-left first:border-l',
					active_link_i == i && 'border-r-text border-b-transparent first:border-l-text',
					active_link_i == i + 1 && 'border-r-text'
				]}
			>
				{name}
			</a>
		{/each}
		<!-- {#each links as { name, href }, i}
			<a
				{href}
				class={[
					'group col-span-6 flex flex-col justify-between border-b pt-1.5 pb-1 sm:col-span-4 md:col-span-3 xl:col-span-2',
					(href == '/' ? page.url.pathname === href : page.url.pathname.startsWith(href))
						? scrolled
							? 'border-b-transparent '
							: 'bg-bg text-text'
						: scrolled
							? 'border-b-transparent '
							: 'border-b-transparent  hover:border-b-current'
				]}
			>
				<div>
					{name}
				</div>
			</a>
		{/each} -->
	</div>
</header>
