<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { links } from './static';
	import { useIntersectionObserver } from '$lib/utils/intersection-observer';
	import MenuMobile from './menu-mobile.svelte';
	import Button from '$lib/ui/button.svelte';
	import { auth, get_user, login } from '$lib/components/login/auth.svelte';

	let sentinel: HTMLHeadElement;

	let menu_mobile_open = $state(false);

	let scrolled = $state(false);

	function handle_intersect(entry: IntersectionObserverEntry) {
		if (entry.isIntersecting) {
			scrolled = false;
		} else {
			scrolled = true;
		}
	}

	async function open_auth() {
		await login();
	}

	onMount(() => {
		get_user();

		const cleanup = useIntersectionObserver(sentinel, handle_intersect, {
			root: null, // The viewport
			rootMargin: '0px 0px 0px 0px', // We can keep this simple since we use the 1px sentinel
			threshold: 0
		});

		return cleanup;
	});
</script>

<div bind:this={sentinel}></div>
<header
	class={['pointer-events-none sticky top-0 z-400 lg:z-100 lg:bg-bg', scrolled && 'lg:border-b']}
>
	<div class="pointer-events-auto mt-1.5 text-right lg:hidden">
		<Button onclick={() => (menu_mobile_open = true)}>Menu</Button>
	</div>
	<div class="grid-12 pointer-events-auto max-lg:hidden!">
		<div class="col-span-7 flex gap-4">
			{#each links as { name, href, base_href }}
				{@const active =
					href == '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(base_href || href)}
				<a {href} class={['link-hover py-1.5', active && !scrolled && 'link-active']}>
					{name}
				</a>
			{/each}
		</div>
		{#if auth.user}
			<div class="col-span- col-start-11 flex items-center gap-2">
				<button class="py-1.5" onclick={open_auth}>
					{auth.user}
				</button>
				<!-- <div>
					<Button onclick={open_auth} variant="icon">
						<img src="/icons/keys.webp" alt="icon-keys" class="size-6" />
					</Button>
				</div> -->
			</div>
		{/if}
		<!-- <div class="flex gap-4">
			<div class="pt-1.5 pb-0.5 underline-offset-6 hover:underline">Préférences</div>
			<div class="pt-1.5 pb-0.5 underline-offset-6 hover:underline">Paramètres</div>
		</div> -->
	</div>
	<div class="lg:hidden">
		{#if menu_mobile_open}
			<MenuMobile onclose={() => (menu_mobile_open = false)} />
		{/if}
	</div>
</header>
