<script lang="ts">
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import Emoji from '$lib/emoji.svelte';
	import type { Windows } from '$lib/types';
	import Window from '$lib/window.svelte';

	const form: {
		sucess: boolean;
		error: string | null;
	} = $state({
		sucess: false,
		error: null
	});

	async function onsubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		event.preventDefault();

		const form_data = new FormData(event.currentTarget, event.submitter);
		const { name, email, body } = Object.fromEntries(form_data.entries());

		if (!body) {
			form.error = 'body';
			return;
		}

		const data = {
			author_name: name,
			author_email: email,
			body
		};

		try {
			await fetch(PUBLIC_POCKETBASE_URL + '/api/collections/feedback/records', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
		} catch (error) {
			console.error(error);
			form.error = 'Désolé, une erreur est survenu';
		}

		// POST

		// on success

		form.error = null;
		form.sucess = true;

		alert('Merci pour ton feedback!');
	}

	const cx = {
		serif: 'font-serif text-6xl/16 ',
		input:
			'w-full border-2 border-dashed px-4 font-serif text-6xl text-text outline-none focus:border-transparent! focus:ring-3'
	};

	const windows: Windows = $state({});
</script>

<Emoji>🦋</Emoji>
<div class="pointer-events-none relative mt-24">
	<form class="grid-12 relative my-2.5" {onsubmit}>
		<div class="grid-12 absolute top-0 right-0 left-0">
			<Window name="Boîte de commentaires" {windows} id="form" class="lg:col-span-6 lg:col-start-4">
				<div class="-mx-2.5 p-0.5">
					<textarea class={[cx.input, 'border-0!']} name="body" placeholder="Message" rows={6}
					></textarea>
				</div>
			</Window>
		</div>
		<Window name="Nom" {windows} id="input-name" class="lg:col-span-5 lg:col-start-7">
			<div class="-mx-2.5 p-0.5">
				<input name="name" type="text" class={[cx.input, ' w-full border-0!']} placeholder="Nom" />
			</div>
		</Window>
		<Window name="Email" {windows} id="input-email" class=" lg:col-span-5 lg:col-start-6">
			<div class="-mx-2.5 p-0.5">
				<input name="email" type="email" class={[cx.input, 'border-0!']} placeholder="Email" />
			</div>
		</Window>
		<Window name="Nom, Email" {windows} id="notice" class="absolute lg:col-span-2 lg:col-start-8">
			<div class="mb-16 pt-1">
				Optionnel, tu peux envoyer ton message de manière anonyme et ultra mystérieuse si tu veux.
			</div>
		</Window>
		<Window
			name="Ceci est un bouton"
			{windows}
			id="submit"
			class="absolute lg:col-span-2 lg:col-start-4"
		>
			<div class="-mx-2.5">
				<button type="submit" class="w-full bg-text px-2 py-4 font-serif text-3xl! text-bg"
					>🦅<span class="italic">Envoyer </span>🦅</button
				>
			</div>
		</Window>
		<!-- <Window name="Nom" {windows} id="body" class="lg:col-span-6 lg:col-start-2">
			<div class="-mx-2.5 p-0.5">
				<textarea class={[cx.input, 'border-0!']} name="body" placeholder="Message" rows={6}
				></textarea>
			</div>
		</Window> -->
	</form>
	<div class="grid-12 absolute top-0 right-0 left-0">
		<Window name="Boîte de commentaires" {windows} id="intro" class="lg:col-span-5 lg:col-start-2">
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
</div>
<a class="fixed bottom-12 left-2.5 font-serif">
	WTF !!? Laissez-moi écrire mon commentaire normalement svp →
</a>
<!-- 	<button
		type="submit"
		class=" col-span-6 col-start-4 bg-text px-2 py-4 font-serif text-6xl text-bg uppercase"
		>🦅<span class="italic">Envoyer </span>🦅</button
	> -->
<svelte:head>
	<title>AGRAF 🦋 Feedback</title>
	<style>
		html {
			--color-bg: #363636;
			--color-text: #dd7575;
		}
	</style>
</svelte:head>
