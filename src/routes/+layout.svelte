<script lang="ts">
	import '$lib/style/app.css';
	import '$lib/style/fonts.css';
	import '$lib/style/markdown.css';
	import favicon from '$lib/assets/favicon.svg';

	import Header from './header.svelte';
	import Footer from './footer.svelte';
	import { page } from '$app/state';

	let { children } = $props();

	//mx-auto my-24 max-w-2xl px-4

	const clean_ui = $derived(page.params.slug || page.route.id == '/liens');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div
	class={[
		'mx-auto min-h-svh px-gap break:px-30',
		!clean_ui && 'grid grid-rows-[auto_auto_1fr_auto]'
	]}
	style="max-width: var(--breakpoint-break);"
>
	{#if !clean_ui}
		<Header />
	{/if}
	<div>{@render children()}</div>
	{#if !clean_ui}
		<Footer />
	{/if}
</div>
