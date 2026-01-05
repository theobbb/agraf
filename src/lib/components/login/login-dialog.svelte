<script lang="ts">
	import Button from '$lib/ui/button.svelte';
	import Input from '$lib/ui/input.svelte';
	import Dialog from '$lib/ui/skeleton/dialog.svelte';
	import { auth, set_user } from './auth.svelte';

	// const { onclose, resolve }: { onclose: () => void; resolve: () => void } = $props();

	let username = $state('');

	async function onsubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		event.preventDefault();

		set_user(username);
	}

	function submit() {
		auth.resolve(true);
		auth.dialog_open = false;
	}

	function onclose() {
		auth.resolve(false);
		auth.dialog_open = false;
	}
</script>

<Dialog title="Connexion" {onclose}>
	<form class="mt-1 mb-2.5 space-y-2.5" {onsubmit}>
		<!-- <div>
			<span class="text-2xl">🗿</span>
			(Pas besoin de compte )
		</div> -->
		<Input name="name" label="Nom d'utilisateur" bind:value={username} />
		<div class="text-right"><Button type="submit">Se connecter</Button></div>
	</form>
</Dialog>
