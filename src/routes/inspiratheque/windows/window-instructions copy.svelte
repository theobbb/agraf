<script lang="ts">
	import type { WindowManager } from '$lib/components/windows/window-manager.svelte';
	import Window from '$lib/components/windows/window.svelte';
	import Button from '$lib/ui/button.svelte';

	import type { Windows } from './types';

	const {
		manager,
		open_window_submitter
	}: { manager: WindowManager<Windows>; open_window_submitter: () => void } = $props();
</script>

<div class="grid-12- pointer-events-none absolute top-24">
	<Window
		class="col-span-4 col-start-2 mt-24 w-lg"
		title="Contribution - Instructions"
		{manager}
		hidden
		id="instructions"
	>
		<div class="mt-1 mb-2.5">
			<div class="text-balance- divide-y- border-b">
				<div class="pt-1 pb-8">
					<div class="font-serif- mb-1">1. Surfe le net 🏄‍♀️</div>
					<div class="text-2">C'est ce que tu fais le mieux</div>
				</div>
				<div class="pt-1 pb-8">
					<div class="font-serif- mb-1">2. Suggère un lien ❤️</div>
					<div class="text-2">
						Un site web, un article, une vidéo... quelque chose qui t'inspire et qui mérite d'être
						partagé.
					</div>
				</div>

				<div class="pt-1 pb-8">
					<div class="font-serif- mb-1">3. Attends 😅</div>
					<div class="text-2">
						Donne-nous un mini moment pour valider ton ajout.
						<br />Rien de personnel: comme c’est ouvert à tou·tes, on fait juste une petite
						vérification. 🤞
					</div>
				</div>
			</div>
			<div>
				<div>Pas besoin de compte 🕊️</div>
				<div>Anonyme - ou pas</div>
			</div>
			<div class="mt-1">Prêt-e à plonger tête première dans l'inspirathèque ?? 😎</div>
			<div class="mt-4 text-right">
				<Button onclick={open_window_submitter}>Suggérer un lien</Button>
			</div>
		</div>
	</Window>
</div>
