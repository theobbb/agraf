<script lang="ts">
	import { page } from '$app/state';
	import Emoji from '$lib/emoji.svelte';
	import Logo from '$lib/logo.svelte';
	import Media from '$lib/media.svelte';
	import { pocketbase } from '$lib/pocketbase';
	import type { RolesRecord } from '$lib/pocketbase.types';
	import IconArrowCorner from '$lib/ui/icons/icon-arrow-corner.svelte';
	import IconClose from '$lib/ui/icons/icon-close.svelte';
	import IconSubstract from '$lib/ui/icons/icon-substract.svelte';
	import Dialog from '$lib/ui/skeleton/dialog.svelte';
	import { format_date } from '$lib/utils/format-date';
	import Physics from '../../physics.svelte';
	import Window from '../../../lib/window.svelte';
	import { objectives, objectives2 } from './static';
	import type { MemberEntriesRecordExpanded } from './types.js';

	const { data } = $props();

	const { member_entries, years, featured } = $derived(data);

	const grouped = $derived.by(() => {
		if (!member_entries) return [];
		const map = member_entries.reduce(
			(acc, entry) => {
				const role_id = entry.expand?.role.id;
				if (!acc[role_id]) {
					acc[role_id] = {
						role: entry.expand.role,
						entries: []
					};
				}
				acc[role_id].entries.push(entry);

				return acc;
			},
			{} as Record<string, { role: RolesRecord; entries: MemberEntriesRecordExpanded[] }>
		);

		return Object.values(map).sort((a, b) => (a.role?.level || 0) - (b.role.level || 0));
	});

	type Dialog = 'assemblee' | 'comite';

	const dialog: {
		open: Boolean;
		name: Dialog | null;
	} = $state({
		open: false,
		name: null
	});

	function open_dialog(name: Dialog) {
		dialog.name = name;
		dialog.open = true;
	}

	const cx = {
		text: 'text-xl lg:text-2xl'
	};
</script>

<Window name="De l'avant" rect={{ x: 8, y: 3, width: 3 }}>
	<div class="aspect-square lg:col-start-5">
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
<Window name="Logo" rect={{ x: 0, y: 2, width: 4 }}>
	<div class="my-2"><Logo /></div>
</Window>
<Window name="Description" rect={{ x: 2, y: 4, width: 4 }}>
	<div class="mb-32 font-serif">
		Association étudiante du programme de design graphique de l'<span class="italic">UQAM</span>
	</div>
</Window>
<Window name="Description mais plus précise" rect={{ x: 1, y: 7, width: 4 }}>
	<div class="mb-32">
		L’AGRAF rassemble et représente l’ensemble des étudiant·e·s en design graphique. Elle agit pour
		améliorer les conditions d’études et soutient les initiatives sociales, culturelles et
		collectives au sein du programme.
	</div>
</Window>
<div class="h-svh"></div>
<!-- <div class="fixed bottom-2.5 left-2.5">
	<div class="grid-12">
		<div class="bg-text- text-bg- col-span-3 col-start-10 aspect-square border bg-bg">
			<div class="flex flex-col px-2.5">
				<div class="flex items-center gap-2 border-b py-1">
					<button><IconClose /></button>
					<button><IconSubstract /></button>
				</div>
				<div class="aspect-square lg:col-start-5">
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
		
					<div>Anonyme</div>
				</div>
			</div>
		</div>
	</div>
</div> -->

<!-- <div class="grid-12 my-16 mb-32">
	<div class="col-span-full mb-4">
		<Logo />
	</div>
	<div class="col-span-full mb-32 font-serif lg:col-span-6">
		Association étudiante du programme <br /> de design graphique de l'<span class="italic"
			>UQAM</span
		>
	</div>
</div> -->
<!-- <div class={['grid-12', cx.text]}>
	<div class="col-span-full mb-8 border-t pt-1 sm:col-span-4 sm:col-start-3 lg:leading-7">
		L’AGRAF rassemble et représente l’ensemble des étudiant·e·s en design graphique. Elle agit pour
		améliorer les conditions d’études et soutient les initiatives sociales, culturelles et
		collectives au sein du programme.
	</div>
	<div class="col-span-full space-y-2 md:col-span-4 md:col-start-8">
		<a class="flex items-center gap-2" href="/liens"
			>Arbre de lien (linktr.ee, mais version maison) <IconArrowCorner /></a
		>
		<button onclick={() => open_dialog('assemblee')} class="flex items-center gap-2"
			><span class="-mt-1">Assemblée générale</span> <IconArrowCorner /></button
		>
		<button onclick={() => open_dialog('comite')} class="flex items-center gap-2"
			><span class="-mt-1">Comité exécutif</span> <IconArrowCorner /></button
		>
	</div>
</div> -->
<!-- <div class="grid-12 mt-64 mb-16 gap-4 bg-text py-24 text-bg">

	<div class="col-span-8 aspect-square lg:col-span-4 lg:col-start-5">
		<Media
			autoplay={false}
			src={pocketbase.files.getURL(featured, featured.images[0])}
			alt="featured media - {featured.title}"
		/>
	</div>
	<div class="col-span-2 flex items-end">
		<div>
			<div>{featured?.title}</div>

			<div class="text-white/50">{format_date(featured.date)}</div>
		</div>
	</div>
</div> -->

<div class="grid-12 mb-64 font-serif text-2xl/7! lg:text-[2.9vw]/[3vw]! break:text-6xl!">
	<div class="col-span-full italic xl:col-span-2">Objectifs →</div>
	<div class="col-span-full text-balance lg:col-start-2 xl:col-span-10 xl:col-start-3">
		{#each objectives2 as objective, i}
			<span class="inline-flex w-14 items-center justify-center rounded-full bg-text px-6 text-bg"
				>{i + 1}</span
			>

			<span class="mr-2">
				{objective}
			</span>
		{/each}
	</div>
</div>

<div class={cx.text}>
	<div class="gap-2- mb-24 flex">
		{#each years as year, i}
			<a href="/association/{year.id}" data-sveltekit-keepfocus data-sveltekit-noscroll
				><span class={['rounded-full px-2', year.id == page.params.year && 'bg-text text-bg']}
					>{year.id}</span
				><span class={['ml-0.5', i == years.length - 1 && 'hidden']}>*</span></a
			>
		{/each}
	</div>

	<div class={['grid-12 gap-y-0!']}>
		{#each grouped as { role, entries }}
			<div
				class="col-span-6 mb-1 border-t lg:col-span-4"
				style="grid-row: span {entries.length} / span {entries.length};"
			>
				{role.name}
			</div>

			{#each entries as member, i}
				<div class={['whitespace-nowrap- col-span-6 mb-1', i == 0 && 'border-t']}>
					{member.expand?.member?.name}
				</div>
			{/each}
		{/each}
	</div>
</div>

{#if dialog.open}
	<Dialog {dialog} class="mr-[calc(100vw/12)] mb-5 w-[calc(5*100vw/12)]">
		{#if dialog.name == 'assemblee'}
			<div class="max-w-xl-">
				<div class="border-b-2">Assemblée générale (AG)</div>

				<div>
					Instance décisionnelle principale de l’Association, l’Assemblée générale est ouverte à
					tous les membres. C’est l’espace où l’on discute, débat et vote sur les orientations,
					actions et prises de position de l’AGRAF.
				</div>
			</div>
		{:else if dialog.name == 'comite'}
			<div class="max-w-xl-">
				<div class="border-b-2">Comité exécutif</div>
				Chargé de mettre en œuvre les décisions adoptées en Assemblée générale, le Comité exécutif rassemble
				des membres occupant divers postes — trésorerie, secrétariat, affaires internes, affaires externes,
				etc. Plusieurs postes sont ouverts chaque année afin d’encourager la participation et l’implication
				des étudiant·e·s.
			</div>
		{/if}
	</Dialog>
{/if}

<svelte:head>
	<title>AGRAF 🦖 L'association</title>
	<!-- <style>
		html {
			--color-bg: #bdde71;
			--color-text: #5f4769;
		}
	</style> -->
</svelte:head>
