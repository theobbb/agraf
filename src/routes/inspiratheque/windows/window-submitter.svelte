<script lang="ts">
	import Button from '$lib/ui/button.svelte';
	import IconInfo from '$lib/ui/icons/icon-info.svelte';
	import IconLink from '$lib/ui/icons/icon-link.svelte';
	import Input from '$lib/ui/input.svelte';
	import Dialog from '$lib/ui/skeleton/dialog.svelte';
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

	async function fetch_url() {
		if (!url) {
			error = 'Tu dois fournir un url, bruh';
			return;
		}
		//const id = push_toast('loading', 'Extraction en cours');
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

			//update_toast(id, 'success', 'Extraction réussie');
		} catch (err) {
			//update_toast(id, 'error', `Erreur lors de l'extraction`);
		}
	}

	const cx = {
		input:
			'min-h-8 bg-text/5 py-0.5 focus:bg-white/10 w-full border px-2 text-text outline-none focus:border-transparent! focus:ring-2',
		label: 'block mb-1'
	};
</script>

<Dialog
	{onclose}
	title="Suggérer un nouveau lien"
	class="w-[calc(100vw/12*4-var(--spacing-gap)*2)]"
>
	<form class="mt-4 space-y-4">
		<div class="flex items-end justify-between gap-4">
			<div class="mb-px w-full">
				<Input bind:value={url} name="url" id="url" label="URL" autofocus />
			</div>

			<div class="text-right"><Button onclick={fetch_url}>Extraire</Button></div>
		</div>

		<Input bind:value={title} name="title" id="title" label="Titre" />

		<label for="description" class={cx.label}>Description</label>
		<textarea
			bind:value={description}
			name="description"
			rows={4}
			class={[cx.input]}
			id="description"
		></textarea>

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
						<IconInfo />
					</div>
				{/if}
			</div>
			<div class="">
				<div class="my-2.5 text-right"><Button>Envoyer</Button></div>
			</div>
		</div>
	</form>

	<!-- sadsa
	<div>
		{parent?.title}
	</div> -->
</Dialog>
