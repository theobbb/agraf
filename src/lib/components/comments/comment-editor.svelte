<script lang="ts">
	import { page } from '$app/state';
	import { pocketbase } from '$lib/pocketbase';
	import type { CollectionRecords, CommentsRecord } from '$lib/pocketbase.types';
	import Button from '$lib/ui/button.svelte';
	import { getContext } from 'svelte';
	import type { CommentsCollectionOptions } from '$lib/types';
	import { error } from '@sveltejs/kit';
	import Input from '$lib/ui/input.svelte';
	import { auth, login } from '../login/auth.svelte';
	import Textarea from '$lib/ui/textarea.svelte';

	const {
		parent,
		parent_comment = null,
		replying_to,

		oncancel
	}: {
		parent: string;
		parent_comment?: string | null;
		replying_to: { comment: CommentsRecord | null };

		oncancel: () => void;
	} = $props();

	const collection: CommentsCollectionOptions = getContext('collection');

	async function onsubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		event.preventDefault();

		if (!auth.user) {
			const authorized = await login();
			if (!authorized) return;
		}

		const form = event.currentTarget;
		const form_data = new FormData(event.currentTarget, event.submitter);
		const body = form_data.get('body');

		if (!body) return;

		// const toast_id = push_toast('loading', '');

		try {
			if (!parent) {
				console.error('parent cannot be blank');
			}
			if (!collection) {
				throw error(500, 'Collection manquante');
			}
			const data = {
				body,
				parent_comment,
				type: 'public',
				parent,
				collection,
				author_name: auth.user
			};

			await pocketbase.collection('comments').create(data);
			replying_to.comment = null;
			// update_toast(toast_id, 'success', 'Commentaire créé, yeah!');
			form.reset();
		} catch (err) {
			console.error(err);
			// update_toast(toast_id, 'error', 'Erreur lors de la création du commentaire, rip');
		}
	}
</script>

<div>
	<form method="POST" {onsubmit}>
		<div class="mb-2.5">
			<Textarea id="body" name="body" placeholder="Message" rows={3} />
			<!-- <MdEditor id="body" name="body" placeholder="Message" /> -->
		</div>
		<div class="flex justify-end gap-1.5">
			<Button onclick={oncancel}>Annuler</Button>
			<Button type="submit">Envoyer</Button>
		</div>
	</form>
</div>
