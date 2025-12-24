<script lang="ts">
	import { page } from '$app/state';
	import Emoji from '$lib/emoji.svelte';
	import Logo from '$lib/logo.svelte';
	import type { RolesRecord } from '$lib/pocketbase.types';
	import IconArrowCorner from '$lib/ui/icons/icon-arrow-corner.svelte';
	import Dialog from '$lib/ui/skeleton/dialog.svelte';
	import Window from '$lib/components/windows/window.svelte';
	import { objectives } from './static';
	import type { MemberEntriesRecordExpanded } from './types.js';
	import { get_window_manager } from '$lib/components/windows/window-manager.svelte';
	import Footer from '../../footer.svelte';

	const { data } = $props();

	const { member_entries, years } = $derived(data);

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

	const window_manager = get_window_manager('association');

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
</script>

<Emoji>🦖</Emoji>

<div class="grid-12 pointer-events-none absolute">
	<Window
		class={['col-span-11', 'sm:', 'lg:col-span-4 lg:col-start-8']}
		id="comite"
		manager={window_manager}
		title="Comité exécutif"
	>
		<div class="mt-1 mb-12">
			<div>
				Chargé de mettre en œuvre les décisions adoptées en Assemblée générale, le Comité exécutif
				rassemble des membres occupant divers postes — trésorerie, secrétariat, affaires internes,
				affaires externes, etc.
			</div>
			<br />
			<div>
				Plusieurs postes sont ouverts chaque année afin d’encourager la participation et
				l’implication des étudiant·e·s.
			</div>
		</div>
	</Window>
	<Window
		class="col-span-11 lg:col-span-4 lg:col-start-8"
		id="assemblee"
		manager={window_manager}
		title="Assemblée générale (AG)"
	>
		<div class="mt-1 mb-12">
			<div>
				Instance décisionnelle principale de l’Association, l’Assemblée générale est ouverte à tous
				les membres. C’est l’espace où l’on discute, débat et vote sur les orientations, actions et
				prises de position de l’AGRAF.
			</div>
		</div>
	</Window>
</div>
<div class="mb-64 text-xl lg:text-2xl">
	<div class="gap-2- mb-16 flex">
		{#each years as year, i}
			<a href="/association/{year.id}" data-sveltekit-keepfocus data-sveltekit-noscroll
				><span class={['rounded-full px-2', year.id == page.params.year && 'bg-text text-bg']}
					>{year.id}</span
				><span class={['ml-0.5', i == years.length - 1 && 'hidden']}>*</span></a
			>
		{/each}
	</div>
	<div class="grid-12 mb-24 gap-y-0!">
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
	<div class="grid-12 break:text-6xl!- mb-64 font-serif max-sm:text-4xl/9.5!">
		<div class="col-span-full italic xl:col-span-2">Objectifs →</div>
		<div class="col-span-full text-balance lg:col-start-2 xl:col-span-10 xl:col-start-3">
			{#each objectives as objective, i}
				<span
					class="inline-flex w-[1.5em] items-center justify-center rounded-full bg-text px-6 text-bg"
					><div>{i + 1}</div></span
				>

				<span class="mr-2">
					{objective}
				</span>
			{/each}
		</div>
	</div>
	<div class="border-b">À venir</div>
	<div>Description des postes</div>
	<div>Status et Règlements</div>

	<div>Budget</div>
	<div>Procès verbaux</div>
	<div>Demandes de subvention</div>
	<div>Download data pdf</div>

	{#if dialog.open}
		<Dialog
			title="s"
			onclose={() => (dialog.open = false)}
			class="mr-[calc(100vw/12)] mb-5 xl:w-[calc(5*100vw/12)]"
		>
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
					Chargé de mettre en œuvre les décisions adoptées en Assemblée générale, le Comité exécutif
					rassemble des membres occupant divers postes — trésorerie, secrétariat, affaires internes,
					affaires externes, etc. Plusieurs postes sont ouverts chaque année afin d’encourager la participation
					et l’implication des étudiant·e·s.
				</div>
			{/if}
		</Dialog>
	{/if}
</div>

<Footer {window_manager} />

<svelte:head>
	<title>AGRAF 🦖 L'association</title>
	<style>
		html {
			--color-bg: #bdde71;
			--color-text: #5f4769;
		}
	</style>
</svelte:head>
