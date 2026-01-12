<script lang="ts">
	import { page } from '$app/state';
	import Emoji from '$lib/emoji.svelte';
	import type { RolesRecord } from '$lib/pocketbase.types';
	import Window from '$lib/components/windows/window.svelte';
	import { objectives } from './static';
	import type { MemberEntriesRecordExpanded } from './types.js';
	import { use_window_manager } from '$lib/components/windows/window-manager.svelte';

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

	const window_manager = use_window_manager('association');
</script>

<Emoji>🦖</Emoji>

<div class="relative">
	<div class="">
		<div class="mb-5 flex max-w-lg flex-wrap gap-x-1 gap-y-1 lg:mb-10">
			{#each years as year, i}
				<a
					class={[
						'border px-gap py-1 hover:bg-text hover:text-bg',
						year.id == page.params.year && 'bg-text text-bg'
					]}
					href="/association/{year.id}"
					data-sveltekit-keepfocus
					data-sveltekit-noscroll
				>
					{year.id}
				</a>
			{/each}
		</div>
		<div class={['grid-12 mb-24 gap-y-0! ']}>
			{#each grouped as { role, entries }}
				<div
					class="py-1- col-span-full border-t border-dashed lg:col-span-4"
					style="grid-row: span {entries.length} / span {entries.length};"
				>
					<div class="font-serif max-lg:hidden">{role.name}</div>
					<div class="mt-0.5 mb-0.5 lg:hidden">{role.name}</div>
				</div>

				{#each entries as member, i}
					<div
						class={[
							'whitespace-nowrap- col-span-full flex items-start gap-x-4 py-px font-serif lg:col-span-6',
							i == 0 && 'border-dashed lg:border-t'
						]}
					>
						<span class="mt-3.5 inline-flex size-6 shrink-0 rounded-full border-2 max-lg:-mr-1.5"
						></span>
						{member.expand?.member?.name}
					</div>
				{/each}
			{/each}
		</div>
	</div>
	<div class="grid-12 -mt-112- pointer-events-none relative top-0 mb-16 lg:absolute lg:mb-32">
		<Window
			class={['col-span-11', 'lg:col-span-4 lg:col-start-9']}
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
			class="col-span-11 lg:col-span-4 lg:col-start-9"
			id="assemblee"
			manager={window_manager}
			title="Assemblée générale (AG)"
		>
			<div class="mt-1 mb-12">
				<div>
					Instance décisionnelle principale de l’Association, l’Assemblée générale est ouverte à
					tous les membres. C’est l’espace où l’on discute, débat et vote sur les orientations,
					actions et prises de position de l’AGRAF.
				</div>
			</div>
		</Window>
	</div>
</div>
<div class="grid-12 relative mb-32">
	<Window
		class="col-span-11 col-start-2 lg:col-span-6 lg:col-start-2"
		title="Objectifs de l'association"
		id="objectifs"
		manager={window_manager}
	>
		<div class="text-balance- mt-1 mb-12">
			{#each objectives as objective, i}
				<span
					class="mr-0.5 inline-flex w-[1.3em] items-center justify-center bg-text px-1.5 text-bg"
				>
					<div>{i + 1}</div>
				</span>

				<span class="mr-2">
					{objective}
				</span>
			{/each}
		</div>
	</Window>
</div>
<div class={['mb-32 font-serif']}>
	<div class="border-b">À venir</div>
	<div>Description des postes</div>
	<div>Status et Règlements</div>

	<div>Budget</div>
	<div>Procès verbaux</div>
	<div>Demandes de subvention</div>
	<div>Download data pdf</div>
</div>

<svelte:head>
	<title>AGRAF 🦖 L'association</title>
	<style>
		html {
			--color-bg: #bdde71;
			--color-text: #5f4769;
		}
	</style>
</svelte:head>
