<script lang="ts">
	import type { WindowManager } from '$lib/components/windows/window-manager.svelte';
	import Window from '$lib/components/windows/window.svelte';
	import Button from '$lib/ui/button.svelte';
	import IconInfo from '$lib/ui/icons/icon-info.svelte';
	import Input from '$lib/ui/input.svelte';
	import type { Windows } from './types';

	const {
		manager,
		open_window_submitter
	}: { manager: WindowManager<Windows>; open_window_submitter: () => void } = $props();
</script>

<div class="grid-12 pointer-events-none absolute top-24">
	<Window
		class="col-span-4 col-start-2 mt-24"
		title="Instructions"
		{manager}
		hidden
		id="instructions"
	>
		<div class="mt-1 mb-2.5">
			<div class="font-serif">1. Suggère un lien ❤️</div>
			<div>Ça peut être n'importe quel lien que tu penses qui mérites d'être partagé</div>

			<div class="font-serif">2. Attends 😅</div>
			<div>
				Donnes-nous un mini moment pour qu'on accepte ton ajout.
				<br />Rien de personnel, c'est simplement que puisque c'est ouvert au public, on doit un peu
				vérifier. 🤞
			</div>
			<div class="mt-12">Prêt-e à te lancer tête première dans l'inspirathèque ?? 👀</div>
			<div class="mt-4 text-right">
				<Button onclick={open_window_submitter}>Suggérer un lien</Button>
			</div>
		</div>
	</Window>
</div>
