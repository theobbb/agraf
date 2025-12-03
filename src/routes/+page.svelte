<script lang="ts">
	import Logo from '$lib/logo.svelte';
	import Media from '$lib/media.svelte';
	import { pocketbase } from '$lib/pocketbase';
	import { format_date } from '$lib/utils/format-date';
	import Window from '../lib/window.svelte';
	import type { Windows } from '$lib/types';
	import { marked } from 'marked';
	import Markdown from '$lib/markdown.svelte';
	import Weather from './weather.svelte';

	const { data } = $props();

	const { featured, links, related } = $derived(data);

	let active_tab = $state(0);

	const windows: Windows = $state({});
</script>

<div class="grid-12 relative mt-24 mb-24 grid-rows-16">
	<Window
		id="featured"
		{windows}
		name="En vedette!"
		class="col-span-3 col-start-9 row-span-6 row-start-1"
	>
		<div class="">
			<Media
				autoplay={false}
				src={pocketbase.files.getURL(featured, featured.images[0])}
				alt="featured media - {featured.title}"
			/>
		</div>
		<div class="py-1">
			<div>{featured?.title}</div>

			<div class="text-2">{format_date(featured.date)}</div>
			<br />
			<br />
			<div>Anonyme</div>
		</div>
	</Window>
	<Window id="logo" {windows} name="Logo" class="col-span-4 col-start-1 row-span-3 row-start-2">
		<div class="my-2"><Logo /></div>
	</Window>
	<Window
		id="desc"
		{windows}
		name="Description"
		class="col-span-5 col-start-3 row-span-3 row-start-4"
	>
		<div class="mt-1 mb-4 font-serif">
			Association étudiante du programme de design graphique de l'<span class="italic">UQAM</span>
		</div>
	</Window>
	<Window
		id="desc_long"
		{windows}
		name="Description mais plus précise"
		class="col-span-4 col-start-2 row-span-3 row-start-6"
	>
		<div class="mb-32 pt-1">
			L’AGRAF rassemble et représente l’ensemble des étudiant·e·s en design graphique. Elle agit
			pour améliorer les conditions d’études et soutient les initiatives sociales, culturelles et
			collectives au sein du programme.
		</div>
	</Window>
	<Window
		id="linktree"
		{windows}
		name="Linktree fait maison"
		class="col-span-3 col-start-7 row-span-4 row-start-8"
	>
		<div class="py-1">
			{#each links as link}
				<div>
					<a href={link.url} class="og-link">{link.icon} {link.name}</a>
				</div>
			{/each}
		</div>
	</Window>

	<Window
		id="map"
		{windows}
		name="Adresse"
		class="col-span-4 col-start-1 row-span-4 row-start-13 max-h-96 overflow-hidden!"
	>
		<div class="relative -mx-2.5 h-[calc(100%-2rem)]">
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
		{windows}
		name="Projets reliés"
		class="col-span-7 col-start-4 row-span-4 row-start-10 max-h-96"
	>
		<div class="">
			<div class="flex border-b">
				{#each related as item, i}
					<button
						class={[
							'-mb-px cursor-pointer border-r border-b border-x-transparent bg-bg px-3 py-1.5 first:border-l',
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
		{windows}
		name="Température à Montréal"
		class="col-span-2 col-start-6 row-span-2 row-start-13 max-h-96"
	>
		<div class="mt-1">
			<Weather />
		</div>
	</Window>
</div>

<div class=""></div>
<svelte:head>
	<title>AGRAF</title>
	<meta
		name="description"
		content="Association étudiant du programme de design graphique de l'UQAM - L’AGRAF rassemble et représente l’ensemble des étudiant·e·s en design graphique. Elle agit pour
		améliorer les conditions d’études et soutient les initiatives sociales, culturelles et
		collectives au sein du programme."
	/>
</svelte:head>
