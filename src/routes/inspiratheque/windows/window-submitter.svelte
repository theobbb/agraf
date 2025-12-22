<script lang="ts">
	import Button from '$lib/ui/button.svelte';
	import IconLink from '$lib/ui/icons/icon-link.svelte';
	import Dialog from '$lib/ui/skeleton/dialog.svelte';
	import type { ExpandedBookmarkFoldersRecord } from '../types';

	const {
		onclose,
		parent
	}: {
		onclose: () => void;
		parent: ExpandedBookmarkFoldersRecord | null;
	} = $props();

	let url: string = $state('');

	type UrlMetadata = {
		title: string;
		description: string;
		favicon_file: File | null;
		favicon_url: string | null;
	};

	const dummy_url_metadata = {
		title: `https://jdan.github.io/98.css/`,
		description: `98.css - A design system for building faithful recreations of old UIs
A design system for building faithful recreations of old UIs.`,
		favicon_file: null,
		favicon_url: 'blob:http://localhost:5173/4e3d69c9-a6ea-4407-b45f-4be73ca79cee'
	};
	let url_metadata: UrlMetadata | null = $state(null);

	let error: string | null = $state(null);

	async function fetch_favicon(url: string) {
		const res = await fetch(`/api/favicon?url=${encodeURIComponent(url)}`);
		const blob = await res.blob();
		const file = new File([blob], 'favicon.png', {
			type: blob.type
		});

		return file;
	}

	async function fetch_url(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		event.preventDefault();

		if (!url) {
			error = 'Tu dois fournir un url, bruh';
			return;
		}
		//const id = push_toast('loading', 'Extraction en cours');
		try {
			const res = await fetch(`/api/extract-url?url=${encodeURIComponent(url)}`);

			const { title, description } = await res.json();

			const favicon_file = await fetch_favicon(url);

			const favicon_url = favicon_file ? URL.createObjectURL(favicon_file) : '';

			url_metadata = {
				title,
				description,
				favicon_file,
				favicon_url
			};

			//update_toast(id, 'success', 'Extraction réussie');
		} catch (err) {
			//update_toast(id, 'error', `Erreur lors de l'extraction`);
		}
	}
	$inspect(url_metadata);
</script>

<Dialog
	{onclose}
	title="Suggérer un nouveau lien"
	class="w-[calc(100vw/12*4-var(--spacing-gap)*2)]"
>
	{#if url_metadata}
		<div class="mt-1.5">
			<div>
				{url}
			</div>
			<div class="">
				<div class="inline">
					{#if url_metadata.favicon_url}
						<div>
							<img alt="favicon" class="size-4" src={url_metadata.favicon_url} />
						</div>
					{:else}
						<div class="opacity-60"><IconLink /></div>
					{/if}
				</div>
				<div>{url_metadata.title}</div>
			</div>
			<div>
				{url_metadata.description}
			</div>

			<div class="my-2.5 text-right"><Button>Envoyer</Button></div>
		</div>
	{:else}
		<form onsubmit={fetch_url}>
			<div class="-mx-2.5 p-0.5">
				<input
					bind:value={url}
					name="name"
					type="text"
					autofocus
					class={[
						'w-full border-0! px-4 font-serif text-text outline-none focus:border-transparent! focus:ring-3'
					]}
					placeholder="URL"
				/>
			</div>
			<div class="my-2.5 text-right"><Button type="submit">Extraire</Button></div>
		</form>

		<!-- sadsa
	<div>
		{parent?.title}
	</div> -->
	{/if}
</Dialog>
