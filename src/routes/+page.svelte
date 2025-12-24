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
	import { get_window_manager } from '$lib/components/windows/window-manager.svelte';
	import Footer from './footer.svelte';

	const { data } = $props();

	const { featured, links, related } = $derived(data);

	const window_manager = get_window_manager('agraf');
	let active_tab = $state(0);
</script>

<div class="grid-12 relative mb-24 max-lg:-mt-2">
	<Window
		title="Logo"
		class={[
			'col-span-full',
			'sm:col-span-5 sm:col-start-1 sm:row-span-3 sm:row-start-1',
			'lg:col-span-4 lg:col-start-1 lg:row-span-4 lg:row-start-2'
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
			'lg:col-span-3 lg:col-start-9 lg:row-span-6 lg:row-start-1'
		]}
		manager={window_manager}
		id="featured"
	>
		<a href="/affichorama/{featured.slug}">
			<div class="">
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
		</a>
	</Window>

	<Window
		title="Description"
		class={[
			'col-span-full col-start-1 max-sm:mt-12',
			'sm:col-span-7 sm:col-start-1 sm:row-span-3 sm:row-start-3',
			'lg:col-span-5 lg:col-start-3 lg:row-span-3 lg:row-start-5'
		]}
		manager={window_manager}
		id="desc"
	>
		<div class="mt-1 mb-24 font-serif">
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
			' lg:col-span-4 lg:col-start-2 lg:row-span-3 lg:row-start-7'
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
			'lg:col-span-3 lg:col-start-7 lg:row-span-4 lg:row-start-8'
		]}
	>
		<div class="py-1 pb-24 lg:pb-12">
			{#each links as link}
				<div>
					<a href={link.url} class="og-link">{link.icon} {link.name}</a>
				</div>
			{/each}
		</div>
	</Window>

	<Window
		id="map"
		manager={window_manager}
		title="Adresse"
		class={[
			'order-last col-span-full row-span-2 aspect-video',
			'sm:col-span-6 sm:col-start-5',
			'lg:col-span-4 lg:col-start-1 lg:row-span-4 lg:row-start-13'
		]}
	>
		<div class="relative -mx-2.5 h-64 lg:h-[calc(100%-2rem)]">
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
			'col-span-full row-span-2 max-h-96',
			'sm:col-span-11',
			'lg:col-span-7 lg:col-start-4 lg:row-span-4 lg:row-start-10'
		]}
	>
		<div class="pb-24 lg:pb-12">
			<div class="flex border-b">
				{#each related as item, i}
					<button
						class={[
							'-mb-px cursor-pointer border-r border-b border-x-transparent bg-bg px-3 py-1.5 text-left first:border-l',
							active_tab == i && 'border-r-text border-b-transparent first:border-l-text',
							active_tab == i + 1 && 'border-r-text'
						]}
						onclick={() => (active_tab = i)}
					>
						{item.name}
					</button>
				{/each}
			</div>
			<div class="mt-1">
				<Markdown content={related[active_tab]?.body || ''} />
			</div>
		</div>
	</Window>

	<Window
		id="weather"
		manager={window_manager}
		title="Température à Montréal"
		class={[
			'col-span-8 col-start-2 max-lg:mt-12',
			'sm:row-start-10- sm:col-span-4 sm:col-start-9',
			'lg:col-span-3 lg:col-start-6 lg:row-span-2 lg:row-start-13'
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

<Footer {window_manager} />
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
