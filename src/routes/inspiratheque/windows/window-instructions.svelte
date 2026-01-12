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

<div class="grid-12 pointer-events-none absolute top-24 left-1/5">
	<Window
		class="col-span-4 col-start-2 mt-24 lg:w-lg"
		title="Comment contribuer"
		{manager}
		hidden
		id="instructions"
	>
		<div class="mt-1 mb-2.5">
			<div
				class="border-b- grid grid-cols-[1.5rem_1fr_3rem] gap-y-4 pb-6 lg:grid-cols-[2rem_1fr_6rem]"
			>
				<div>1.</div>
				<div>
					<div>Surfe le net</div>
					<div class="text-2">C'est ce que tu fais le mieux.</div>
				</div>
				<div class="text-right text-3xl">🏄‍♀️</div>

				<div>2.</div>
				<div>
					<div>Suggère un lien</div>
					<div class="text-2">
						Un site web, un article, une vidéo... quelque chose qui t'inspire et qui mérite d'être
						partagé.
					</div>
				</div>
				<div class="text-right text-3xl">❤️</div>

				<div>3.</div>
				<div>
					<div>Attends</div>
					<div class="text-2">
						Donne-nous un mini moment pour valider ton ajout. Rien de personnel: comme c’est ouvert
						à tou·tes, on fait juste une petite vérification.
					</div>
				</div>
				<div class="text-right text-3xl">😅</div>
			</div>

			<div class="text-right">
				<Button onclick={open_window_submitter}>Suggérer un lien</Button>
			</div>
		</div>
	</Window>
</div>
