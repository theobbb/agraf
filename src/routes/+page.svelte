<script lang="ts">
	import Emoji from '$lib/emoji.svelte';
	import Logo from '$lib/logo.svelte';
	import Media from '$lib/media.svelte';
	import { pocketbase } from '$lib/pocketbase';
	import { format_date } from '$lib/utils/format-date';
	import { SvelteMap } from 'svelte/reactivity';
	import Window from '../lib/window.svelte';
	import type { Windows } from '$lib/types';

	const { data } = $props();

	const { featured, links, related } = $derived(data);

	let active_tab = $state(0);

	const windows: Windows = $state({});
</script>

<div class="grid-12 h-[calc(100svh-40rem)]- relative mt-24 grid-rows-12">
	<Window
		id="featured"
		{windows}
		name="En vedette!"
		class="col-span-3 col-start-9 row-span-6 row-start-1"
	>
		<div class="lg:col-start-5">
			<Media
				autoplay={false}
				src={pocketbase.files.getURL(featured, featured.images[0])}
				alt="featured media - {featured.title}"
			/>
		</div>
		<div class="pb-12- py-1">
			<div>{featured?.title}</div>

			<div class="text-black/50">{format_date(featured.date)}</div>
			<br />
			<br />
			<!-- <div aria-hidden={true} class="invisible">*</div> -->
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
		<div class="mb-4 font-serif">
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
					<a
						href={link.url}
						class="visited:text-[VisitedText]! hover:underline"
						style="color: LinkText;">{link.icon} {link.name}</a
					>
				</div>
			{/each}
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

					<!-- <a
							href={link.url}
							class="visited:text-[VisitedText]! hover:underline"
							style="color: LinkText;">{link.icon} {item.name}</a
						> -->
				{/each}
			</div>
			<div class="mt-1">
				{related[active_tab]?.body}
			</div>
		</div>
	</Window>
	<!-- <div class="sticky right-0 bottom-0">sds</div> -->
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
