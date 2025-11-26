<script lang="ts">
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
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
</script>

<Emoji>🕺</Emoji>

<form {onsubmit}>
	<input name="url" type="text" placeholder="url" />
	<button type="button">Vérifier</button>
	<button disabled type="submit">Soumettre</button>
</form>
<div>Yo!</div>

<svelte:head>
	<title>AGRAF 🕺 Inspirathèque</title>
	<style>
		html {
			--color-bg: #3c294b;
			--color-text: #bdde71;
		}
	</style>
</svelte:head>
