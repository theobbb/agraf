<script lang="ts">
	import { page } from '$app/state';
	import Emoji from '$lib/emoji.svelte';
	import Logo from '$lib/logo.svelte';
	import type { RolesRecord } from '$lib/pocketbase.types';
	import IconArrowCorner from '$lib/ui/icons/icon-arrow-corner.svelte';
	import { objectives } from './static';
	import type { MemberEntriesRecordExpanded } from './types.js';

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
</script>

<Emoji>🦖</Emoji>

<div class="grid-12 -mt-32- mb-16 text-3xl">
	<div
		class="col-span-7 col-start-2 grid grid-cols-7 gap-2.5 rounded bg-text px-2.5 py-2.5 text-bg"
	>
		<div class="col-span-3 mb-24">
			<Logo />
		</div>
		<div class="col-span-3 col-start-5 space-y-2">
			<button class="flex items-center gap-2"
				><span class="-mt-1">Assemblée générale</span> <IconArrowCorner /></button
			>
			<button class="flex items-center gap-2"
				><span class="-mt-1">Comité exécutif</span> <IconArrowCorner /></button
			>
		</div>
		<div class="col-span-5 col-start-3 mb-8 border-t-2 pt-1">
			L’AGRAF rassemble et représente l’ensemble des étudiant·e·s en design graphique. Elle agit
			pour améliorer les conditions d’études et soutient les initiatives sociales, culturelles et
			collectives au sein du programme.
		</div>
	</div>
</div>

<div class="grid-12 mb-72">
	<div class="col-span-2 font-serif italic">Objectifs</div>
	<div class="col-span-10 col-start-3 font-serif text-balance">
		{#each objectives as objective, i}
			<span class="inline-flex w-14 items-center justify-center rounded-full bg-text px-6 text-bg"
				>{i + 1}</span
			>

			<span>
				{objective}
			</span>
		{/each}
	</div>
</div>

<div class="mb-32 flex gap-2 text-3xl">
	{#each years as year, i}
		<a href="/association/{year.id}" data-sveltekit-keepfocus data-sveltekit-noscroll
			><span class={['rounded-full', year.id == page.params.year && 'bg-text text-bg']}
				>{year.id}</span
			><span class={['ml-0.5', i == years.length - 1 && 'hidden']}>,</span></a
		>
	{/each}
</div>

<div class="grid-12 text-3xl">
	{#each grouped as { role, entries }}
		<div
			class="col-span-4 border-t"
			style="grid-row: span {entries.length} / span {entries.length};"
		>
			{role.name}
		</div>

		{#each entries as member, i}
			<div class={['col-span-6 whitespace-nowrap', i == 0 && 'border-t']}>
				{member.expand?.member?.name}
			</div>
		{/each}
	{/each}
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
