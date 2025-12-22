<script lang="ts">
	import Emoji from '$lib/emoji.svelte';
	import type { Windows } from '$lib/types';
	import Window from '$lib/components/windows/window.svelte';
	import { create_window_manager } from '$lib/components/windows/window-manager.svelte';

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

	const window_manager = create_window_manager();

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

<div class="mt-32 border-b">
	<div class="grid-12 text-balance">
		<div class="col-span-6 mb-12 font-serif">🤝 Entente d'évaluation 🫶</div>
		<div class="col-span-6 text-2xl/6.5">
			<div class="mt-2.5 mb-8">
				L’entente d’évaluation est une démarche obligatoire, propre à l’UQAM, et prévue dans ses
				règlements. Il s’agit d’une entente qui intervient entre l’enseignant.e ou responsable d’un
				groupe-cours, d’une part, et les étudiant.e.s inscrit.e.s à ce groupe-cours, d’autre part.
				Elle statue sur :
			</div>

			<div class="mb-48">
				<div class="flex items-center gap-4">
					<div class="size-3 rounded-full bg-text"></div>
					le nombre d’évaluations prévues au cours du trimestre;
				</div>
				<div class="flex items-center gap-4">
					<div class="size-3 rounded-full bg-text"></div>
					les échéances de ces évaluations;
				</div>
				<div class="flex items-center gap-4">
					<div class="size-3 rounded-full bg-text"></div>
					la pondération respective des contenus ou objets d’évaluation.
				</div>
			</div>
		</div>

		<div
			class="col-span-full col-start-1 max-md:mb-16 md:col-span-6 xl:col-span-5 xl:col-start-2 xl:mr-8"
		>
			L’entente d’évaluation est un gain historique issu des luttes étudiantes et vise à
			démocratiser l’enseignement. Elle donne aux étudiant.e.s de chaque groupe-cours le droit de
			s’entendre, avec l’enseignant.e, sur le déroulement du cours, la charge de travail, les
			échéances et les modalités d’évaluation. Après la présentation du syllabus, l’enseignant.e
			dispose de deux semaines afin de faire signer l’entente d’évaluation par deux étudiant.e.s du
			groupe.
			<br />
			<br />
			Il est important que le groupe prenne un moment pour discuter du syllabus et de l’entente d’évaluation.
			Cela signifie qu’il ne faut pas hésiter à demander à l’enseignant.e de vous laisser le temps nécessaire
			afin d’avoir une conversation. Il est  préférable de demander à celui-ci ou celle-ci de quitter
			le local un moment afin que vous puissiez discuter. Lorsque le groupe fait un choix, par consensus
			ou par vote, l’enseignant.e est invité.e à réintégrer la salle de cours et un.e porte-parole lui
			fait connaître les demandes du groupe.
		</div>
		<div
			class="col-span-full col-start-1 max-md:mb-16 md:col-span-6 xl:col-span-5 xl:col-start-7 xl:mr-8"
		>
			N’hésitez pas à vous montrer ferme lors de la négociation. Lorsque l'enseignant.e se montre
			réticent.e face à vos demandes, expliquez-lui calmement que ce processus important est issu
			des règlements 5 et 8. Si vous constatez que les négociations n’avancent pas adressez-vous à
			votre association étudiante afin qu’une personne puisse agir à titre de médiatrice.Dans le cas
			où l’enseignant.e et le groupe ne parviennent toujours pas à s’entendre et donc, que le litige
			touche l’établissement de cette entente, sa modification ou son interprétation, le dossier est
			transmis à la direction du département qui tranchera le litige. La décision prise à cette
			étape est finale.
			<br /><br /> Il peut arriver que des circonstances majeures empêchent la tenue d’une ou plusieurs
			périodes de cours donnés. Les raisons sont diverses: une grève étudiante, un.e enseignant.e malade
			ou ayant des empêchements personnels, etc. Avec l’accord d’au moins le 2/3 du groupe, il est alors
			possible de rouvrir l’entente et de la modifier en fonction des cours manqués. En général, cette
			réouverture sera proposée par l’enseignant.e après deux périodes de cours non dispensées. Si la
			réouverture n’est pas proposée, il est de votre devoir d’en faire la demande.
		</div>

		<div class="col-span-full mt-24 mb-1.5 max-w-130 xl:col-span-3 xl:col-start-10">
			Pour toute question, veuillez communiquer avec <a href="/feedback" class="og-link">l’AGRAF</a>
			ou avec
			<a class="og-link" target="_blank" href="https://www.afea.uqam.ca/contact">l’AFÉA</a>.
		</div>
	</div>
</div>
<div class="grid-12 mt-32 mb-64">
	<div class="mb-3 pt-1 font-serif lg:col-span-6">💰 Assurance collective 💰</div>

	<div class="col-span-full mt-2.5 lg:col-span-6 lg:col-start-7">
		<div class={[cx.text, 'max-w-200']}>
			Les étudiants membres de l'<a class="og-link" href="https://www.afea.uqam.ca/" target="_blank"
				>AFÉA</a
			>
			sont automatiquement inscrits au Régime collectif de soins de santé et dentaires de l’<a
				class="og-link"
				href="https://aseq.ca/rte/fr/wwwsanteetudiantecom_UQAM_Home"
				target="_blank">ASEQ</a
			>.  Le Régime étudiant de l'ASEQ offre une couverture de soins de santé, dentaire, de vision,
			de voyage et juridique. Il est possible de se désinscrire au début de l’année.
		</div>
	</div>
	<div class="mt-24 mb-1.5 lg:col-span-3 lg:col-start-10">
		<a class="og-link" href="https://aseq.ca/rte/fr/wwwsanteetudiantecom_UQAM_Home" target="_blank"
			>Voir toutes les informations</a
		>
	</div>
	<div class="col-span-full text-6xl">🧾🤕🦷🪥🥶🩺💊🩼💵📉🚑❤️‍🩹👓👁️🩴✈️🧑‍⚖️⚖️👮🥺</div>
</div>

<svelte:head>
	<title>AGRAF 🤓 Informations</title>
	<style>
		html {
			--color-bg: #d54a46;
			--color-text: #323232;
		}
	</style>
</svelte:head>
