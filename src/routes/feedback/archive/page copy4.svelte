<script lang="ts">
	import Emoji from '$lib/emoji.svelte';

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

		console.log(name, email, body);
		if (!body) {
			form.error = 'body';
			return;
		}

		// POST

		// on success

		form.error = null;
		form.sucess = true;
	}
</script>

<Emoji>🦋</Emoji>

<!-- <div class="grid-12">
	<div class="text-balance- col-span-4">
		<div>
			<div class="mb-4 font-serif">Boîte de commentaires</div>
			<div class="max-w-130">
				<div>
					Pour bien représenter les étudiant·es du programme et pour créer une vie étudiante à votre
					image, l'AGRAF veut avoir vos commentaires!
				</div>
				<div>
					Ici, tu peux nous envoyer tes suggestions, préoccupations et idées. Cette boîte est
					ouverte en tout temps. On t'invite aussi à nous envoyer un courriel (agraf.uqam@gmail.com)
					pour un contact plus direct.
				</div>
				<div class="text-2">
					Toute forme de violence ou de haine envers un individu ou un groupe ne sera en aucun cas
					tolérée, et les réponses de cette nature ne seront pas prises en compte.
				</div>
			</div>
		</div>
	</div>
</div> -->
<!-- <div class="mb-4 font-serif">Boîte de commentaires</div>
<div class="grid-12 mb-24">
	<div class="col-span-3">
		Pour bien représenter les étudiant·es du programme et pour créer une vie étudiante à votre
		image, l'AGRAF veut avoir vos commentaires!
	</div>
	<div class="col-span-3 col-start-5">
		Ici, tu peux nous envoyer tes suggestions, préoccupations et idées. Cette boîte est ouverte en
		tout temps. On t'invite aussi à nous envoyer un courriel (agraf.uqam@gmail.com) pour un contact
		plus direct.
	</div>
	<div class="text-2 col-span-3 col-start-9">
		Toute forme de violence ou de haine envers un individu ou un groupe ne sera en aucun cas
		tolérée, et les réponses de cette nature ne seront pas prises en compte.
	</div>
</div> -->
<div class="grid-12 mb-24">
	<div class="col-span-11 col-start-2">
		<div class="mb-4 font-serif">Boîte de commentaires</div>
		<div class="max-w-140">
			<div class="col-span-3">
				Pour bien représenter les étudiant·es du programme et pour créer une vie étudiante à votre
				image, l'AGRAF veut avoir vos commentaires!
			</div>
			<div class="col-span-3 col-start-5">
				Ici, tu peux nous envoyer tes suggestions, préoccupations et idées. Cette boîte est ouverte
				en tout temps. On t'invite aussi à nous envoyer un courriel (agraf.uqam@gmail.com) pour un
				contact plus direct.
			</div>
			<div class="text-2 col-span-3 col-start-9">
				Toute forme de violence ou de haine envers un individu ou un groupe ne sera en aucun cas
				tolérée, et les réponses de cette nature ne seront pas prises en compte.
			</div>
		</div>
	</div>
</div>
<form class="grid-12" {onsubmit}>
	<!-- <div class="col-span-3">
		(optionnel, tu peux envoyer ton message de manière anonyme et ultra mystérieuse si tu veux)
	</div> -->
	<div class="col-span-7 col-start-5 flex gap-10">
		<div class="flex flex-col gap-2.5">
			<input
				name="name"
				type="text"
				class="col-span-4 col-start-6 px-4 font-serif text-text ring-2 outline-none focus:ring-3"
				placeholder="Nom"
			/>
			<input
				name="email"
				type="email"
				class="col-span-4 col-start-6 w-full px-4 font-serif text-text ring outline-none focus:ring-3"
				placeholder="Email"
			/>
		</div>
		<div class="max-w-80 text-balance">
			<div>
				Optionnel, tu peux envoyer ton message de manière anonyme et ultra mystérieuse si tu veux.
			</div>
		</div>
	</div>

	<div class="col-span-8 col-start-5 mt-12 mb-12">
		<textarea
			class="w-full px-4 font-serif text-text ring ring-text outline-none focus:ring-3"
			name="body"
			placeholder="Message"
			rows={6}
		></textarea>
		{#if form.error == 'body'}
			<div class="mt-3 max-w-110 text-red-500">
				Wow, quel beau message! Ça va nous prendre un bon moment à lire tout ça mais on te répond
				dès qu'on a finit.
			</div>
		{/if}
	</div>

	<button type="submit" class="col-span-3 col-start-9 bg-text py-4 font-serif text-bg"
		>🦅<span class="italic">Envoyer </span>🦅</button
	>
</form>

<div class="font-serif">Merci pour ton feedback!</div>
<svelte:head>
	<style>
		html {
			--color-bg: #363636;
			--color-text: #ea8585;
		}
	</style>
</svelte:head>
