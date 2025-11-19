<script lang="ts">
	import Button from '$lib/ui/button.svelte';
	import Input from '$lib/ui/input.svelte';
	import Textarea from '$lib/ui/textarea.svelte';

	let value = $state('');

	let loading: boolean = $state(false);
	let error: string = $state('');

	async function onsubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		event.preventDefault();

		const form_data = new FormData(event.currentTarget, event.submitter);
		const data = Object.fromEntries(form_data.entries());

		loading = true;
		error = '';

		try {
			const response = await fetch('/api/feedback', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			const result = await response.json();
			console.log(result);
			if (!response.ok) {
				// Handle errors from the API (400, 429, 500)
				error = result.error || 'An unknown error occurred.';
			} else {
				// Handle success (200)
				console.log('success');
			}
		} catch (err) {
			error = 'Failed to connect to the server. Please try again.';
		} finally {
			loading = false;
		}
	}
</script>

<div>Boîte de commentaires de l'AGRAF</div>

<div>
	Pour bien représenter les étudiant·es du programme et pour créer une vie étudiante à votre image,
	l'AGRAF (Association étudiante du module de design graphique) veut avoir vos commentaires!
</div>
<div>
	Ici, tu peux nous envoyer tes suggestions, préoccupations et idées. Cette boîte est ouverte en
	tout temps. On t'invite aussi à nous envoyer un courriel (agraf.uqam@gmail.com) pour un contact
	plus direct.
</div>
<div>
	Toute forme de violence ou de haine envers un individu ou un groupe ne sera en aucun cas tolérée,
	et les réponses de cette nature ne seront pas prises en compte.
</div>

<div class="mb-4">Merci pour ton feedback!</div>

<form class="mt-6 mb-4" method="POST" {onsubmit}>
	<div class="max-w-96 border border-black/20 px-4 py-3">
		<div class="mb-4 text-balance">Tu peux laisser ton nom / email si t'as rien à cacher 🧐</div>
		<div class="space-y-2">
			<div><Input class="w-full" name="author_name" placeholder="Nom" /></div>
			<div><Input class="w-full" name="author_email" placeholder="Email" /></div>
		</div>
	</div>

	<div class="mt-6 mb-4">
		<Textarea
			class="w-full"
			rows={6}
			name="body"
			placeholder="Laisse ton commentaire ici"
			maxLength={2000}
		/>
	</div>

	<Button type="submit" onclick>Envoyer</Button>
</form>
