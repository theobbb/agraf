<script>
	import Emoji from '$lib/emoji.svelte';
	import Logo from '$lib/logo.svelte';
</script>

<Emoji>🦑</Emoji>
<div class="space-y-24">
	<div class="mt-[20svh]- ml-12- flex items-center gap-4 font-serif text-6xl/16">
		<div class="max-w-210 uppercase">
			Association étudiante du programme de design graphique de l'<span class="italic">UQAM</span>
		</div>
	</div>
	<div class="mb-6 max-w-120">
		L’AGRAF rassemble et représente l’ensemble des étudiant·e·s en design graphique. Elle agit pour
		améliorer les conditions d’études et soutient les initiatives sociales, culturelles et
		collectives au sein du programme.
	</div>
</div>

<Logo />

<svelte:head>
	<title>AGRAF</title>
	<meta
		name="description"
		content="Association étudiant du programme de design graphique de l'UQAM - L’AGRAF rassemble et représente l’ensemble des étudiant·e·s en design graphique. Elle agit pour
		améliorer les conditions d’études et soutient les initiatives sociales, culturelles et
		collectives au sein du programme."
	/>
</svelte:head>
