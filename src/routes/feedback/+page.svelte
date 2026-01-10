<script lang="ts">
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import Emoji from '$lib/emoji.svelte';

	import Button from '$lib/ui/button.svelte';
	import Window from '$lib/components/windows/window.svelte';
	import { get_window_manager } from '$lib/components/windows/window-manager.svelte';

	import Footer from '../footer.svelte';
	import Input from '$lib/ui/input.svelte';
	import Textarea from '$lib/ui/textarea.svelte';
	import { pocketbase } from '$lib/pocketbase';
	import Dialog from '$lib/ui/skeleton/dialog.svelte';
	import { onMount } from 'svelte';

	const window_manager = get_window_manager('feedback');

	let loading = $state(false);
	let onsubmit_response: { type: 'success' | 'error'; message: string } | null = $state(null);

	async function onsubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		event.preventDefault();
		loading = true;
		onsubmit_response = null;

		const form_data = new FormData(event.currentTarget, event.submitter);

		if (!form_data.get('body')) {
			onsubmit_response = {
				type: 'error',
				message: `Wow, quel beau message! Ça va nous prendre un bon moment à lire tout ça mais on te répond
				dès qu'on a finit.`
			};
			return;
		}

		try {
			await pocketbase.collection('feedback').create(form_data);
			onsubmit_response = {
				type: 'success',
				message: ``
			};
		} catch (error) {
			console.error(error);
			onsubmit_response = {
				type: 'error',
				message: `Désolé, une erreur est survenue... 🥺`
			};
		}

		loading = false;
	}

	// let mounted = $state(false);
	// onMount(() => {
	// 	window_manager.windows_array.forEach((w) => {
	// 		console.log(w);
	// 	});
	// 	console.log(window_manager.windows_array);
	// 	mounted = true;
	// });
</script>

<Emoji>🦋</Emoji>

<div class={['grid-12 pointer-events-none relative']}>
	<Window
		title="Boîte de commentaires - Formulaire"
		manager={window_manager}
		id="form"
		class={[
			'col-span-full max-lg:order-2',
			'lg:col-span-4 lg:col-start-5 lg:row-span-4 lg:row-start-3'
		]}
	>
		<form class="mt-4 mb-2.5 space-y-4" {onsubmit}>
			<div class="grid w-full grid-cols-2 gap-gap">
				<div><Input name="name" label="Nom" /></div>
				<div><Input name="email" label="Email" type="email" /></div>
			</div>
			<Textarea name="body" label="Message" rows={8} />
			<div class="mt-2 text-right">
				<Button type="submit">Envoyer</Button>
			</div>
		</form>
	</Window>

	<Window
		title="Mystère"
		manager={window_manager}
		id="notice"
		class={[
			'col-span-9 col-start-4 row-span-2 row-start-3 max-lg:order-3',
			'lg:col-span-3 lg:col-start-8 lg:row-span-2 lg:row-start-2'
		]}
	>
		<div class="mb-16 pt-1 text-balance">
			Nom et email sont optionnels...<br /> Tu peux envoyer ton message de manière anonyme et ultra mystérieuse
			si tu veux.
		</div>
	</Window>
	<Window
		title="Boîte de commentaires - Description"
		manager={window_manager}
		id="intro"
		class={[
			'col-span-full row-span-4 row-start-1 max-lg:order-1',
			'lg:col-span-5 lg:col-start-1 lg:row-span-4 lg:row-start-1'
		]}
	>
		<div class="mt-1 mb-24">
			<div class="">
				Pour bien représenter les étudiant·es du programme et pour créer une vie étudiante à votre
				image, l'AGRAF veut avoir vos commentaires! Ici, tu peux nous envoyer tes suggestions,
				préoccupations et idées. Cette boîte est ouverte en tout temps. On t'invite aussi à nous
				envoyer un courriel (agraf.uqam@gmail.com) pour un contact plus direct.
			</div>
			<div class="text-2 col-span-3 col-start-9">
				Toute forme de violence ou de haine envers un individu ou un groupe ne sera en aucun cas
				tolérée, et les réponses de cette nature ne seront pas prises en compte.
			</div>
		</div>
	</Window>
</div>
{#if onsubmit_response}
	<Dialog
		class="max-w-md"
		title={onsubmit_response.type == 'success' ? 'Succès' : 'Erreur'}
		onclose={() => (onsubmit_response = null)}
	>
		<div class={['mt-1 mb-12', onsubmit_response.type == 'error' && 'text-red-900']}>
			{#if onsubmit_response.type == 'error'}
				{onsubmit_response.message}
			{:else}
				<div>Merci pour ton message!!!</div>
			{/if}
		</div>
	</Dialog>
{/if}

<!-- <Desktop manager={window_manager} /> -->
<!-- <Taskbar manager={window_manager} /> -->
<Footer {window_manager} />
<svelte:head>
	<title>AGRAF 🦋 Feedback</title>
	<style>
		html {
			--color-bg: #a3a3a3;
			--color-text: black;
			--color-text-2: rgb(from var(--color-text) r g b / 55%);
		}
	</style>
</svelte:head>
