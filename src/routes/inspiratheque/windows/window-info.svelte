<script lang="ts">
	import { page } from '$app/state';
	import type { WindowManager } from '$lib/components/windows/window-manager.svelte';
	import Window from '$lib/components/windows/window.svelte';
	import Button from '$lib/ui/button.svelte';
	import IconInfo from '$lib/ui/icons/icon-info.svelte';
	import type { Windows } from './types';

	const { manager }: { manager: WindowManager<Windows> } = $props();

	function onclose() {
		console.log('close');
	}

	const hidden = !page.route.id?.startsWith('/inspiratheque/explorateur');
	console.log(hidden);
</script>

<div class="grid-12 pointer-events-none absolute top-24">
	<Window
		class="col-span-full lg:col-span-4 lg:col-start-7"
		title="Inspirathèque"
		id="info"
		{hidden}
		{manager}
		{onclose}
	>
		<div class="mt-1.5 mb-2.5">
			<img src="/icons/help_book.webp" class="size-6" />
			<div class="mt-1">
				L’Inspirathèque est une librairie communautaire d’adresses URL, entretenue par les
				étudiant·es du programme.
			</div>
			<br />
			<div>
				Elle rassemble une collection semi-organisée de liens semi-inspirants qui ont un
				semi-rapport avec le design graphique.
			</div>
			<br />
			<div>Participe STP !!!</div>
			<div class="mt-4 text-right">
				<Button onclick={() => manager.open_window('instructions')}>Comment contribuer !!??</Button>
			</div>
		</div>
	</Window>
</div>
