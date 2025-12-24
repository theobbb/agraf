<script lang="ts">
	import { pocketbase } from '$lib/pocketbase';
	import Button from '$lib/ui/button.svelte';
	import IconError from '$lib/ui/icons/icon-error.svelte';
	import IconInfo from '$lib/ui/icons/icon-info.svelte';
	import IconLink from '$lib/ui/icons/icon-link.svelte';
	import IconSuccess from '$lib/ui/icons/icon-success.svelte';
	import Input from '$lib/ui/input.svelte';
	import Loader from '$lib/ui/loader.svelte';
	import Dialog from '$lib/ui/skeleton/dialog.svelte';
	import Textarea from '$lib/ui/textarea.svelte';
	import type { ExpandedBookmarkFoldersRecord } from '../types';

	const {
		onclose,
		parent
	}: {
		onclose: () => void;
		parent: ExpandedBookmarkFoldersRecord | 'root';
	} = $props();

	let url: string = $state('');
	let title: string = $state('');
	let description: string = $state('');
	let message: string = $state('');

	let favicon: {
		url: string | null;
		file: File | null;
	} | null = $state(null);

	let fetching_url = $state(false);
	let fetch_url_response: {
		type: 'success' | 'error';
		message: string;
	} | null = $state(null);

	function is_valid_url(str: string) {
		try {
			new URL(str);
			return true;
		} catch {
			return false;
		}
	}

	async function fetch_favicon(url: string) {
		const res = await fetch(`/api/favicon?url=${encodeURIComponent(url)}`);
		const blob = await res.blob();
		const file = new File([blob], 'favicon.png', {
			type: blob.type
		});

		return file;
	}

	async function fetch_url() {
		fetch_url_response = null;
		if (!url) {
			fetch_url_response = {
				type: 'error',
				message: 'Tu dois fournir un URL, bruh'
			};
			return;
		}
		if (!is_valid_url(url)) {
			fetch_url_response = {
				type: 'error',
				message: `Ton URL n'est pas valide, bruh`
			};
			return;
		}
		fetching_url = true;
		try {
			const res = await fetch(`/api/extract-url?url=${encodeURIComponent(url)}`);
			const data = await res.json();

			const favicon_file = await fetch_favicon(url);
			const favicon_url = favicon_file ? URL.createObjectURL(favicon_file) : '';

			if (data.title) title = data.title;
			if (data.description) description = data.description;
			if (favicon_url) {
				favicon = {
					url: favicon_url,
					file: favicon_file
				};
			}

			function get_response_message(title: boolean, desc: boolean, favicon: boolean) {
				const success_count = [title, desc, favicon].filter(Boolean).length;

				if (success_count === 3) {
					return `L'extraction s'est vraiment trop bien passée!`;
				}

				if (success_count === 0) {
					return `Extraction réussie, mais aucun champ n'est accessible... Ajoute au moins le titre manuellement STP!`;
				}

				const missing = [];
				if (!title) missing.push('titre');
				if (!desc) missing.push('description');
				if (!favicon) missing.push('favicon');

				if (!title) {
					return `Extraction partielle (${missing.join(', ')} manquant${missing.length > 1 ? 's' : ''}). Ajoute le titre manuellement STP!`;
				}

				return `Extraction partielle (${missing.join(', ')} manquant${missing.length > 1 ? 's' : ''}, pas grave).`;
			}

			fetch_url_response = {
				type: 'success',
				message: get_response_message(data.title, data.description, Boolean(favicon_url))
			};

			//update_toast(id, 'success', 'Extraction réussie');
		} catch (err) {
			fetch_url_response = {
				type: 'error',
				message: `Oupsie, l'extraction n'a pas fonctionnée...`
			};
			//update_toast(id, 'error', `Erreur lors de l'extraction`);
		}
		fetching_url = false;
	}

	let onsubmit_response: 'loading' | 'success' | 'error' | null = $state(null);

	async function onsubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		event.preventDefault();

		onsubmit_response = 'loading';

		const form_data = new FormData(event.currentTarget, event.submitter);
		if (parent && typeof parent != 'string') form_data.set('parent', parent.id);
		if (favicon?.file) form_data.set('favicon', favicon.file);
		try {
			await pocketbase.collection('bookmarks').create(form_data);
			onsubmit_response = 'success';
		} catch (err) {
			console.log(err);
			onsubmit_response = 'error';
		}
	}
</script>

<Dialog
	{onclose}
	title="Suggérer un nouveau lien"
	class="w-[calc(100vw/12*4-var(--spacing-gap)*2)]- lg:w-lg"
>
	<form class="mt-4 space-y-4" {onsubmit}>
		<div class="flex items-end justify-between gap-4">
			<div class="mb-px w-full">
				<Input bind:value={url} name="url" id="url" label="URL" autofocus />
			</div>

			<div class="text-right"><Button onclick={fetch_url}>Extraire</Button></div>
		</div>
		{#if fetching_url || fetch_url_response}
			<div
				class={[
					'-mt-2 flex gap-1.5 pb-2 text-balance',
					fetching_url ? 'text-2' : fetch_url_response?.type == 'error' && 'text-red-300'
				]}
			>
				{#if fetching_url}
					<div class="shrink-0"><Loader /></div>
					<div>Extraction en cours...</div>
				{:else if fetch_url_response}
					<div class="shrink-0">
						{#if fetch_url_response.type == 'success'}
							<IconSuccess />
						{:else}
							<IconError />
						{/if}
					</div>
					<div>{fetch_url_response.message}</div>
				{/if}
			</div>
		{/if}

		<Input bind:value={title} name="title" label="Titre" />

		<Textarea name="description" rows={4} label="Description" />

		<div class="flex items-center justify-between">
			<div>
				{#if favicon?.url}
					<div>
						<img alt="favicon" class="size-4" src={favicon.url} />
					</div>
				{:else}
					<div class="opacity-60"><IconLink /></div>
				{/if}
			</div>
			<div>
				{#if parent != 'root'}
					<div class="flex items-center gap-2.5">
						<img class="size-5" src="/icons/folder_closed.webp" alt="icon-folder" />
						{parent.title}
						<div class="text-lg"><IconInfo /></div>
					</div>
				{/if}
			</div>
			<div class="">
				<div class="my-2.5 text-right"><Button type="submit">Envoyer</Button></div>
			</div>
		</div>
	</form>
</Dialog>
{#if onsubmit_response}
	<Dialog onclose={() => (onsubmit_response = null)} title="Succès" class="w-lg">
		<div class="mt-1 mb-12">
			{#if onsubmit_response == 'loading'}
				<div class="text-2 flex items-center gap-1.5"><Loader />Soumission en cours...</div>
			{:else if onsubmit_response == 'success'}
				<div>
					Merci ❤️ !!! Ton lien <span class="text-2"> {url}</span> a été envoyé avec succès.
				</div>
				<div class="text-2">
					Donne-nous un mini moment pour valider ton ajout. Rien de personnel: comme c’est ouvert à
					tou·tes, on fait juste une petite vérification.
				</div>
			{:else}
				<div class="text-red-300">
					Oupsie 🥺 ... Ton lien <span class="text-2"> {url}</span> n'a pas pu être envoyé. Une erreur
					est survenue.
				</div>
			{/if}
		</div>
	</Dialog>
{/if}
