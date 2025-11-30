<script lang="ts">
	import '$lib/style/app.css';
	import '$lib/style/fonts.css';
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

<div class="mx-auto px-2.5 break:px-30" style="max-width: var(--breakpoint-break);">
	{#if !clean_ui}
		<Header />
	{/if}
	{@render children()}
	{#if !clean_ui}
		<Footer />
	{/if}
</div>
