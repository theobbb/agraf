<script lang="ts">
	import Emoji from '$lib/emoji.svelte';

	import Window from '$lib/components/windows/window.svelte';
	import { SvelteSet } from 'svelte/reactivity';
	import { use_window_manager } from '$lib/components/windows/window-manager.svelte';
	import Footer from '../+/footer/footer.svelte';
	import Markdown from '$lib/markdown.svelte';

	const { data } = $props();
	const { infos: items } = $derived(data);

	const window_manager = use_window_manager('informations');
	const { windows } = $derived(window_manager);

	let opened_windows: Set<string> = $state(new SvelteSet());

	function toggle_window(id: string) {
		if (opened_windows.has(id)) opened_windows.delete(id);
		else opened_windows.add(id);
		if (windows[id]?.closed) window_manager.open_window(id);
		else window_manager.close_window(id);
	}

	//top: {i * 33}px; left: {i * 33}px;
</script>

<Emoji>🤓</Emoji>
<div
	class="absolute right-gap left-1/3 max-lg:hidden lg:grid"
	style="grid-template-columns: repeat(auto-fit, 33px); "
>
	{#each items as { id, title, body, expand }, i}
		<div
			class=" w-lg- row-span-4- col-span-12 max-lg:mt-gap!"
			style="grid-column: span 16 / span 16; grid-column-start: {i +
				1}; grid-row-start: 1; margin-top: {i * 33}px;"
		>
			<Window class="relative" title={title || ''} {id} manager={window_manager} hidden>
				<div class="mt-1.5 mb-12">
					<div>
						<Markdown content={body || ''}></Markdown>
					</div>
					<div class="mt-2 mb-2.5 flex justify-end gap-1">
						{#each expand.tags as tag}
							<div class="bg-text px-1 text-bg">{tag.title}</div>
						{/each}
					</div>
				</div>
			</Window>
		</div>
	{/each}
</div>

<div class="relative mb-24">
	<!-- <div class="max-w-30">Ressources pour l'étudiant</div> -->

	<div class="relative pt-1">
		<div class="mb-1.5">Ressources pour l'étudiant</div>
		<div class="text-2xl/7- divide-y border-y">
			{#each items as { id, title, expand, body }}
				<div>
					<button
						onclick={() => toggle_window(id)}
						class="justify-center- flex w-full cursor-pointer gap-2 py-2 text-left hover:italic"
					>
						<div class="font-serif">
							{windows[id]?.closed ? '' : '*'}
							{title}
						</div>
						<!-- <div class="flex gap-1">
							{#each expand.tags as tag}
								<div class="bg-text px-1 text-bg">{tag.title}</div>
							{/each}
						</div> -->
					</button>
					<div class={['lg:hidden', opened_windows.has(id) ? '' : 'hidden']}>
						<div class=" mb-12">
							<div>
								<Markdown content={body || ''}></Markdown>
							</div>
							<div class="mt-2 mb-2.5 flex justify-end gap-1">
								{#each expand.tags as tag}
									<div class="bg-text px-1 text-bg">{tag.title}</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<!-- <div class="grid-12 pointer-events-none">
	<Window class="col-span-4" title="Entente d'évaluation 🫶" manager={window_manager} id="entente">
		<div class="mt-1 mb-24 text-balance">
			<div>
				L’entente d’évaluation est une démarche obligatoire, propre à l’UQAM, et prévue dans ses
				règlements. Il s’agit d’une entente qui intervient entre l’enseignant.e ou responsable d’un
				groupe-cours, d’une part, et les étudiant.e.s inscrit.e.s à ce groupe-cours, d’autre part.
				<div>Elle statue sur :</div>
			</div>
			<br />
			<div class="">
				<div class="flex items-center gap-4">
					<div class="size-2 rounded-full bg-text"></div>
					le nombre d’évaluations prévues au cours du trimestre;
				</div>
				<div class="flex items-center gap-4">
					<div class="size-2 rounded-full bg-text"></div>
					les échéances de ces évaluations;
				</div>
				<div class="flex items-center gap-4">
					<div class="size-2 rounded-full bg-text"></div>
					la pondération respective des contenus ou objets d’évaluation.
				</div>
			</div>
		</div>
	</Window>
	<Window
		class="col-span-4"
		title="Assurance collective 💰"
		manager={window_manager}
		id="assurance"
	>
		<div class="mt-1 mb-24 text-balance">
			<div>
				Les étudiants membres de l'<a href="https://www.afea.uqam.ca/" target="_blank">AFÉA</a>
				sont automatiquement inscrits au Régime collectif de soins de santé et dentaires de l’<a
					href="https://aseq.ca/rte/fr/wwwsanteetudiantecom_UQAM_Home"
					target="_blank">ASEQ</a
				>.  Le Régime étudiant de l'ASEQ offre une couverture de soins de santé, dentaire, de
				vision, de voyage et juridique. Il est possible de se désinscrire au début de l’année.
			</div>

			<div>
				<a href="https://aseq.ca/rte/fr/wwwsanteetudiantecom_UQAM_Home" target="_blank"
					>Voir toutes les informations</a
				>
			</div>
		</div>
	</Window>
</div> -->

<svelte:head>
	<title>AGRAF 🤓 Informations</title>
	<style>
		html {
			--color-bg: #d54a46;
			--color-text: #323232;
		}
	</style>
</svelte:head>
