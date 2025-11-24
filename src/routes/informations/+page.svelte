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
</script>

<Emoji>🤓</Emoji>
<div class=" mt-60 max-w-6xl font-serif text-5xl/14">
	1. ATELIERS DE L’ÉCOLE 🏫 2. ATELIERS GÉRÉS PAR LES ÉTUDIANT·E·S 👩‍🎓 3. PRÊT DE MATÉRIEL 🗿 4.
	IMPRESSION 🖨️ <span class="italic">5. ENTENTE D’ÉVALUATION</span> 🌼
	<span class="italic">6. ASSURANCE COLLECTIVE</span> 💰
</div>

<svelte:head>
	<style>
		html {
			--color-bg: #da5c58;
			--color-text: #323232;
		}
	</style>
</svelte:head>
