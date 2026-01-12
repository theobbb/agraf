<script lang="ts">
	import Logo from '$lib/logo.svelte';
	import Media from '$lib/media.svelte';
	import { pocketbase } from '$lib/pocketbase';
	import { format_date } from '$lib/utils/format-date';
	import Window from '$lib/components/windows/window.svelte';
	import Markdown from '$lib/markdown.svelte';
	import Weather from './weather.svelte';
	import { dev } from '$app/environment';
	import Taskbar from '$lib/components/windows/taskbar.svelte';

	import Footer from './+/footer/footer.svelte';
	import Chat from './+/chat.svelte';
	import { onMount } from 'svelte';

	import WindowLayer from '$lib/components/windows/window-layer.svelte';
	import Tabs from '$lib/components/tabs.svelte';
	import { use_window_manager } from '$lib/components/windows/window-manager.svelte';

	const { data } = $props();

	const { featured, links, related } = $derived(data);

	const window_manager = use_window_manager('agraf');
	//const window_manager = get_window_manager('agraf');
	let related_active_tab_i = $state(0);
</script>

<div class="grid-12 relative mb-24 max-lg:mt-2">
	<Window
		title="Logo"
		class={[
			'col-span-full',
			'sm:col-span-5 sm:col-start-1 sm:row-span-3 sm:row-start-1',
			'lg:col-span-4 lg:col-start-1 lg:row-span-3 lg:row-start-2'
		]}
		manager={window_manager}
		id="logo"
	>
		<div class="my-2"><Logo /></div>
	</Window>
	<Window
		title="En vedette!"
		class={[
			'col-span-9 max-lg:-ml-3 max-sm:-mt-12',
			'sm:col-span-4 sm:col-start-9 sm:row-span-4 sm:row-start-2',
			'lg:col-span-3 lg:col-start-9 lg:row-span-8 lg:row-start-1'
		]}
		manager={window_manager}
		id="featured"
	>
		<a class="block max-w-xl pb-2" href="/affichorama/{featured.slug}">
			<div class="max-w-xl">
				<Media
					autoplay={!dev}
					src={pocketbase.files.getURL(featured, featured.images[0])}
					alt="featured media - {featured.title}"
				/>
			</div>
			<div class="py-1 pb-2">
				<div>{featured.title}</div>
				<div class="text-2">{format_date(featured.date)}</div>
			</div>
			{#if featured.body}
				<br />
				<div class="line-clamp-4">
					<Markdown content={featured.body} />
				</div>
			{/if}
		</a>
	</Window>

	<Window
		title="Description"
		class={[
			'col-span-full col-start-1 max-sm:mt-12',
			'sm:col-span-7 sm:col-start-1 sm:row-span-3 sm:row-start-3',
			'lg:col-span-5 lg:col-start-3 lg:row-span-2 lg:row-start-4'
		]}
		manager={window_manager}
		id="desc"
	>
		<div class="mt-1 mb-6 font-serif">
			Association étudiante du programme de design graphique de l'<span class="italic">UQAM</span>
		</div>
	</Window>

	<Window
		id="desc_long"
		manager={window_manager}
		title="Description mais plus précise"
		class={[
			'col-span-10 max-sm:-mt-12 max-sm:translate-x-3',
			'sm:col-span-7 sm:col-start-5 sm:row-start-6',
			' lg:col-span-4 lg:col-start-2 lg:row-span-2 lg:row-start-6'
		]}
	>
		<div class="mb-32 pt-1">
			L’AGRAF rassemble et représente l’ensemble des étudiant·e·s en design graphique. Elle agit
			pour améliorer les conditions d’études et soutient les initiatives sociales, culturelles et
			collectives au sein du programme.
		</div>
	</Window>

	<Window
		id="linktree"
		manager={window_manager}
		title="Linktree fait maison"
		class={[
			'col-span-8 col-start-4 row-span-2 max-lg:mt-8',
			'sm:col-start-2',
			'lg:col-span-3 lg:col-start-7 lg:row-span-4 lg:row-start-9'
		]}
	>
		<div class="py-1 pb-24 lg:pb-12">
			{#each links as link}
				<div>
					<a href={link.url} class="og-link" target="_blank">{link.icon} {link.name}</a>
				</div>
			{/each}
		</div>
	</Window>

	<Window
		id="map"
		manager={window_manager}
		title="Adresse"
		class={[
			window_manager.windows['map']?.is_expanded ? '' : 'aspect-video',
			'order-last col-span-full row-span-2 ',
			'sm:col-span-6 sm:col-start-5',
			'lg:col-span-4 lg:col-start-1 lg:row-span-4 lg:row-start-17'
		]}
	>
		<div class="relative -mx-2.5 h-64 lg:h-full">
			<iframe
				class="absolute inset-0 object-cover"
				title="Google Maps - Pavillon de design de l'UQAM"
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.855569266736!2d-73.56197!3d45.512986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91a4d108e6bd9%3A0xb31a88b71600ec4c!2s%C3%89cole%20de%20design%20de%20l&#39;UQAM!5e0!3m2!1sen!2sca!4v1764772767790!5m2!1sen!2sca"
				width="100%"
				height="100%"
				style="border:0;"
				allowfullscreen={false}
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
			></iframe>
		</div>
	</Window>

	<Window
		id="related"
		manager={window_manager}
		title="Projets reliés"
		class={[
			'max-h-96- col-span-full row-span-2 min-h-72',
			'sm:col-span-11',
			'lg:col-span-7 lg:col-start-4 lg:row-span-5 lg:row-start-12'
		]}
	>
		<div class="pb-24 lg:pb-12">
			<Tabs items={related} active_item_i={related_active_tab_i} class="border-t-0">
				{#snippet rendered(item: any, i: number)}
					<button class="cursor-pointer" onclick={() => (related_active_tab_i = i)}>
						{item.name}
					</button>
				{/snippet}
			</Tabs>

			<div class="mt-1">
				<Markdown content={related[related_active_tab_i]?.body || ''} />
			</div>
		</div>
	</Window>
	<Window
		id="chat"
		manager={window_manager}
		title="Chat"
		class={[
			'col-start-2- col-span-11 max-h-94 max-lg:mt-12',
			'sm:row-start-10- sm:col-span-4 sm:col-start-9',
			'lg:col-span-5 lg:col-start-8 lg:row-span-4 lg:row-start-18'
		]}
	>
		{#if window_manager.windows['chat']}
			<Chat window={window_manager.windows['chat']} />
		{/if}
	</Window>

	<Window
		id="weather"
		manager={window_manager}
		title="Température à Montréal"
		class={[
			'col-span-8 col-start-2 max-lg:mt-12',
			'sm:row-start-10- sm:col-span-4 sm:col-start-9',
			'lg:col-span-3 lg:col-start-6 lg:row-span-2 lg:row-start-17'
		]}
	>
		<div class="mt-1 max-h-96 pb-12">
			<Weather />
		</div>
	</Window>
</div>

<!-- <div class="my-16 text-center text-xl font-normal" style="font-family: 'Comic', sans-serif;">
	<div>© 2025 AGRAF ❤️ Tous droits réservés 😡🤬</div>
	<div></div>
</div> -->

<!-- <Footer {window_manager} /> -->
<!-- <Taskbar manager={window_manager} /> -->

<!-- <div class="grid-12 fixed right-gap bottom-8 left-gap z-200">
	<div class="col-span-10 col-start-2 border bg-bg shadow">fwe</div>
</div> -->

<svelte:head>
	<title>AGRAF</title>
	<meta
		name="description"
		content="Association étudiant du programme de design graphique de l'UQAM - L’AGRAF rassemble et représente l’ensemble des étudiant·e·s en design graphique. Elle agit pour
		améliorer les conditions d’études et soutient les initiatives sociales, culturelles et
		collectives au sein du programme."
	/>
</svelte:head>
