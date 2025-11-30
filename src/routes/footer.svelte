<script>
	import Emoji from '$lib/emoji.svelte';
	import Logo from '$lib/logo.svelte';
	import Explosion from './explosion.svelte';
</script>

<footer class="mt-64 mb-1.5">
	<div class="grid-12">
		<div class="col-span-full border-t pt-0.5 md:col-span-3">
			<div>Bibliothèque LU</div>
			<div class="opacity-50">
				Située au 3ᵉ étage du pavillon de design de l’UQAM, cette bibliothèque rassemble des livres
				graphiques, des monographies et des magazines. Les documents sont destinés à être consultés
				sur place afin que les étudiant.e.s puissent s'informer, s'inspirer et se divertir.
			</div>
		</div>
		<div class="col-span-full col-start-1 border-t pt-0.5 md:col-span-3 md:col-start-5">
			<div class="max-w-100">
				<div>Annuel de Design</div>
				<div class="opacity-50">
					Composé par les finissant·e·s de l’École de design, ce comité organise chaque année une
					exposition mettant en lumière les travaux des diplômé·e·s de tous les programmes.
				</div>
			</div>
		</div>
		<div class="col-span-full col-start-1 border-t pt-0.5 md:col-span-3 md:col-start-9">
			<div class="max-w-135">
				<div>Pica</div>
				<div class="opacity-50">
					Magazine étudiant dédié à la scène artistique de l’UQAM, il encourage les collaborations
					interdisciplinaires et vise à démocratiser les arts. Sa publication annuelle et sa soirée
					de lancement contribuent à promouvoir les talents locaux tout en établissant des liens
					avec l’international. Sa mission première : faire rayonner le travail et la créativité des
					étudiant·e·s.
				</div>
			</div>
		</div>
	</div>

	<div class="grid-12 mt-32">
		<div class="col-span-6 flex font-normal" style="font-family: 'Comic', sans-serif;">
			<div>© 1983–2983 AGRAF ❤️ Tous droits réservés 😡🤬</div>
			<div></div>
		</div>

		<a target="_blank" class="col-span-2" href="mailto:agraf.uqam@gmail.com">agraf.uqam@gmail.com</a
		>
		<a target="_blank" href="https://www.instagram.com/agraf.uqam/">Instagram</a>
		<a target="_blank" href="https://www.facebook.com/agraf.uqam/">Facebook</a>
		<Explosion />
	</div>
</footer>
