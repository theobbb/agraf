<script>
	import Emoji from '$lib/emoji.svelte';

	const links = [
		{
			name: 'ATELIERS DE L’ÉCOLE',
			href: '/ateliers-ecole',
			emoji: '🏫'
		},
		{
			name: 'ATELIERS GÉRÉS PAR LES ÉTUDIANT·E·S',
			href: '/ateliers-ecole',
			emoji: '👩‍🎓'
		},
		{
			name: 'ATELIERS DE L’ÉCOLE',
			href: '/ateliers-ecole'
		}
	];

	const data = {
		ressources: [
			{
				name: 'Sérigraphie',
				body: 'local 2048544'
			},
			{
				name: 'Typographie et reliure',
				body: 'local 2048544'
			},
			{
				name: 'Développement argentique',
				body: 'local 2048544'
			},
			{
				name: 'Studio photo',
				body: 'local 2048544'
			},
			{
				name: 'Prêt de matériel',
				body: 'local 2048544'
			},
			{
				name: 'Impression',
				body: ''
			}
		]
	};
</script>

<Emoji>🤓</Emoji>

<div class="space-y-24">
	<div>
		<div class="mb-3 font-serif">RESSOURCES 🗿</div>

		<div class="grid-12">
			{#each data.ressources as ressource}
				<div class="col-span-6 min-h-32 border px-2 py-1.5 md:col-span-4 lg:col-span-3">
					<div>{ressource.name}</div>
					<div class="text-2">{ressource.body}</div>
				</div>
			{/each}
		</div>
	</div>

	<div>
		<div class="mb-3 font-serif"><span class="italic">ENTENTE D’ÉVALUATION</span> 🌼</div>
		<div class="grid-12 border px-2 py-3 text-balance">
			<div
				class="col-span-full mb-16 sm:col-span-10 sm:col-start-2 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 xl:col-span-4 xl:col-start-5"
			>
				<div class="max-w-150 space-y-4">
					<div>
						L’entente d’évaluation est une démarche obligatoire, propre à l’UQAM, et prévue dans ses
						règlements. Il s’agit d’une entente qui intervient entre l’enseignant.e ou responsable
						d’un groupe-cours, d’une part, et les étudiant.e.s inscrit.e.s à ce groupe-cours,
						d’autre part. Elle statue sur :
					</div>

					<div class="ml-3.5">
						<li>le nombre d’évaluations prévues au cours du trimestre;</li>
						<li>les échéances de ces évaluations;</li>
						<li>la pondération respective des contenus ou objets d’évaluation.</li>
					</div>
				</div>
			</div>
			<div
				class="text-2 col-span-full col-start-1 max-md:mb-16 md:col-span-6 xl:col-span-5 xl:col-start-2"
			>
				L’entente d’évaluation est un gain historique issu des luttes étudiantes et vise à
				démocratiser l’enseignement. Elle donne aux étudiant.e.s de chaque groupe-cours le droit de
				s’entendre, avec l’enseignant.e, sur le déroulement du cours, la charge de travail, les
				échéances et les modalités d’évaluation. Après la présentation du syllabus, l’enseignant.e
				dispose de deux semaines afin de faire signer l’entente d’évaluation par deux étudiant.e.s
				du groupe.
				<br /><br />
				Il est important que le groupe prenne un moment pour discuter du syllabus et de l’entente d’évaluation.
				Cela signifie qu’il ne faut pas hésiter à demander à l’enseignant.e de vous laisser le temps
				nécessaire afin d’avoir une conversation. Il est  préférable de demander à celui-ci ou celle-ci
				de quitter le local un moment afin que vous puissiez discuter. Lorsque le groupe fait un choix,
				par consensus ou par vote, l’enseignant.e est invité.e à réintégrer la salle de cours et un.e
				porte-parole lui fait connaître les demandes du groupe.
			</div>
			<div class="text-2 col-span-full md:col-span-6 md:col-start-7 xl:col-span-5">
				N’hésitez pas à vous montrer ferme lors de la négociation. Lorsque l'enseignant.e se montre
				réticent.e face à vos demandes, expliquez-lui calmement que ce processus important est issu
				des règlements 5 et 8. Si vous constatez que les négociations n’avancent pas adressez-vous à
				votre association étudiante afin qu’une personne puisse agir à titre de médiatrice.Dans le
				cas où l’enseignant.e et le groupe ne parviennent toujours pas à s’entendre et donc, que le
				litige touche l’établissement de cette entente, sa modification ou son interprétation, le
				dossier est transmis à la direction du département qui tranchera le litige. La décision
				prise à cette étape est finale.
				<br /><br />
				Il peut arriver que des circonstances majeures empêchent la tenue d’une ou plusieurs périodes
				de cours donnés. Les raisons sont diverses: une grève étudiante, un.e enseignant.e malade ou
				ayant des empêchements personnels, etc. Avec l’accord d’au moins le 2/3 du groupe, il est alors
				possible de rouvrir l’entente et de la modifier en fonction des cours manqués. En général, cette
				réouverture sera proposée par l’enseignant.e après deux périodes de cours non dispensées. Si
				la réouverture n’est pas proposée, il est de votre devoir d’en faire la demande.
			</div>

			<div class="col-span-full mt-32 max-w-130 xl:col-span-3 xl:col-start-5">
				Pour toute question, veuillez communiquer avec l’AGRAF ou avec l’AFÉA.
			</div>
		</div>
	</div>
	<div>
		<div class="mb-3 font-serif"><span class="italic">ASSURANCE COLLECTIVE</span> 💰</div>
		<div class="grid-12">
			<div class="col-span-full border px-3 py-2 lg:col-span-6">
				<div class="mb-24 max-w-150">
					Les étudiants membres de l'AFÉA  sont automatiquement inscrits au Régime collectif de
					soins de santé et dentaires de l’ASEQ.  Le Régime étudiant de l'ASEQ offre une couverture
					de soins de santé, dentaire, de vision, de voyage et juridique. Il est possible de se
					désinscrire au début de l’année.
				</div>
				<div>Voir toutes les informations</div>
			</div>
		</div>
	</div>
</div>

<!-- <div class=" mt-60 max-w-6xl font-serif text-5xl/14">
	1. ATELIERS DE L’ÉCOLE 🏫 2. ATELIERS GÉRÉS PAR LES ÉTUDIANT·E·S 👩‍🎓 3. PRÊT DE MATÉRIEL 🗿 4.
	IMPRESSION 🖨️ <span class="italic">5. ENTENTE D’ÉVALUATION</span> 🌼
	<span class="italic">6. ASSURANCE COLLECTIVE</span> 💰
</div> -->

<svelte:head>
	<title>AGRAF 🤓 Informations</title>
	<style>
		html {
			--color-bg: #da5c58;
			--color-text: #323232;
		}
	</style>
</svelte:head>
