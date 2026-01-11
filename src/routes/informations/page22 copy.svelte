<script lang="ts">
	import Emoji from '$lib/emoji.svelte';
	import type { Windows } from '$lib/types';
	import Window from '$lib/components/windows/window.svelte';
	import { get_window_manager } from '$lib/components/windows/window-manager.svelte';
	import Footer from '../+/footer/footer.svelte';

	const data = {
		ressources: [
			{
				name: `Bibliothèque LU `,
				emoji: '📚',
				body: `Située au 3ᵉ étage du pavillon de design de l’UQAM, cette bibliothèque rassemble des livres graphiques, des monographies et des magazines. Les documents sont destinés à être consultés sur place afin que les étudiant.e.s puissent s'informer, s'inspirer et se divertir.`,
				url: 'https://www.instagram.com/bibliolu',
				window_cx: 'col-span-4 col-start-9 row-span-2 row-start-1'
			},
			{
				name: 'Sérigraphie',
				emoji: '✒️',
				body: 'local 2048544',
				window_cx: ' col-span-3 col-start-1 row-span-2 row-start-4'
			},
			{
				name: 'Typographie et reliure',
				emoji: '📖',
				body: 'local 2048544',
				window_cx: 'col-span-3 col-start-2 row-span-3 row-start-2'
			},
			{
				name: 'Développement argentique',
				emoji: '📷',
				body: 'local 2048544',
				window_cx: 'col-span-3 col-start-8 row-span-2 row-start-7 '
			},
			{
				name: 'Studio photo',
				emoji: '🤳',
				body: 'local 2048544',
				window_cx: 'col-span-3 col-start-1 row-span-2 row-start-1'
			},
			{
				name: 'Prêt de matériel',
				emoji: '🗿',
				body: 'local 2048544',
				window_cx: 'col-span-3 col-start-1 row-span-2 row-start-6'
			},
			{
				name: 'Impression',
				emoji: '🖨️',
				body: '',
				window_cx: 'col-span-3 col-start-3 row-span-2 row-start-7'
			}
		]
	};

	type Dialog = 'entente';

	const dialog: {
		open: Boolean;
		name: Dialog | null;
	} = $state({
		open: false,
		name: 'entente'
	});

	const window_manager = get_window_manager('informations');

	const windows: Windows = $state({});

	const cx = {
		text: 'text-2xl/6.5'
	};
</script>

<div class="relative">
	<Emoji>🤓</Emoji>

	<div class="max-w-30">Ressources pour l'étudiant</div>

	<div class="relative pt-1">
		<div class="text-2xl/7">
			{#each data.ressources as { name, emoji }}
				<button
					onclick={() => (windows[name].hidden = false)}
					class={[
						'last:border-b-0- group flex w-full flex-col items-center gap-2 border-b py-4 text-center first:border-t',
						windows[name] && !windows[name]?.hidden && 'italic'
					]}
				>
					<div class="font-serif">
						<span class="invisible group-hover:visible">{emoji}</span>
						{name}
						<span class="invisible group-hover:visible">{emoji}</span>
					</div>
				</button>
			{/each}
		</div>
	</div>
	<div class="grid-12 pointer-events-none absolute inset-0 grid-rows-6">
		{#each data.ressources as { name, body, window_cx, emoji }}
			<Window
				hidden
				id={name}
				{windows}
				{name}
				class="col-span-4 col-start-9 row-span-2 row-start-1"
			>
				<div class="my-2">
					<div>{body}</div>
					<div class="text-4xl">{emoji}</div>
				</div>
			</Window>
		{/each}
	</div>
</div>

<div class="grid-12 pointer-events-none">
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
</div>
<Footer {window_manager} />
<svelte:head>
	<title>AGRAF 🤓 Informations</title>
	<style>
		html {
			--color-bg: #d54a46;
			--color-text: #323232;
		}
	</style>
</svelte:head>
