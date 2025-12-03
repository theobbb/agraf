<script>
	import Logo from '$lib/logo.svelte';
	import Explosion from './explosion.svelte';
</script>

<footer class="mt-64- pb-2.5">
	<!-- <div class="grid-12">
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
	</div> -->

	<div class="grid-12 border-t pt-1.5">
		<a
			target="_blank"
			class="lg:col-start col-span-6 lg:col-span-2"
			href="mailto:agraf.uqam@gmail.com">agraf.uqam@gmail.com</a
		>
		<a
			class="col-span-4 max-lg:col-start-8 max-lg:row-start-1 lg:col-span-1"
			target="_blank"
			href="https://www.instagram.com/agraf.uqam/">Instagram</a
		>
		<a
			class="col-span-4 max-lg:col-start-8 max-lg:row-start-2 lg:col-span-1"
			target="_blank"
			href="https://www.facebook.com/agraf.uqam/">Facebook</a
		>

		<div class="col-span-4 max-lg:col-start-8 max-lg:row-start-3 lg:col-span-1">
			<Explosion />
		</div>
		<a
			class="col-span-4 max-lg:col-start-8 max-lg:row-start-2 lg:col-span-1"
			target="_blank"
			href="https://www.facebook.com/agraf.uqam/">Crédits</a
		>
		<div
			class="col-span-full flex font-normal max-lg:mt-16 max-lg:text-sm lg:col-span-6 lg:col-start-1 lg:row-start-1"
			style="font-family: 'Comic', sans-serif;"
		>
			<div>© 2025 AGRAF ❤️ Tous droits réservés 😡🤬</div>
			<div></div>
		</div>
	</div>
</footer>
