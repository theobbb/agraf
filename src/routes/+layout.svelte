<script lang="ts">
	import '$lib/style/app.css';
	import '$lib/style/fonts.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from './header.svelte';
	import Footer from './footer.svelte';

	let { children } = $props();

	//mx-auto my-24 max-w-2xl px-4
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="mx-2.5">
	<Header />
	{@render children()}
	<Footer />
</div>
