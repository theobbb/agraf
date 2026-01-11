<script lang="ts">
	import '$lib/style/app.css';
	import '$lib/style/fonts.css';
	import '$lib/style/markdown.css';
	import favicon from '$lib/assets/favicon.svg';

	import Header from './header.svelte';
	import { page } from '$app/state';

	import Login from '$lib/components/login/login-dialog.svelte';
	import LoginDialog from '$lib/components/login/login-dialog.svelte';
	import { auth } from '$lib/components/login/auth.svelte';
	import Footer from './+/footer/footer.svelte';
	import { init_window_registry } from '$lib/components/windows/window-manager.svelte';
	import { init_comments_service } from '$lib/cache/cache-comments.svelte';

	let { children } = $props();

	//mx-auto my-24 max-w-2xl px-4

	const clean_ui = $derived(page.params.slug);

	init_window_registry();
	init_comments_service();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div
	class={[
		'mx-auto min-h-svh px-layout-x break:px-30',
		!clean_ui && 'grid grid-rows-[auto_auto_1fr_auto]'
	]}
	style="max-width: var(--breakpoint-break);"
>
	<Header />

	<div>{@render children()}</div>

	<!-- {#if !clean_ui}
		<Footer />
	{/if} -->
	<Footer />
</div>

{#if auth.dialog_open}
	<LoginDialog />
{/if}
