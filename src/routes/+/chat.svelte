<script lang="ts">
	import { auth, login } from '$lib/components/login/auth.svelte';
	import { pocketbase } from '$lib/pocketbase';
	import type { ChatRecord, IsoDateString } from '$lib/pocketbase.types';
	import Button from '$lib/ui/button.svelte';
	import Input from '$lib/ui/input.svelte';
	import Loader from '$lib/ui/loader.svelte';
	import { format_date } from '$lib/utils/format-date';
	import { onMount } from 'svelte';

	let chat: ChatRecord[] = $state([]);
	let loaded = $state(false);

	let scroll_container: HTMLDivElement | null = $state(null);

	async function onsubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		event.preventDefault();

		const form = event.currentTarget;
		if (!auth.user) await login();

		const form_data = new FormData(form, event.submitter);
		try {
			if (auth.user) form_data.set('author', auth.user);
			await pocketbase.collection('chat').create(form_data);
			form.reset();
			scroll_bottom();
		} catch (err) {
			console.error(err);
		}
	}

	async function load_chat() {
		const list = await pocketbase
			.collection('chat')
			.getList<ChatRecord>(1, 50, { sort: 'created' });
		chat = list.items;

		loaded = true;
	}

	onMount(() => {
		load_chat();

		pocketbase.collection('chat').subscribe<ChatRecord>('*', function (e) {
			if (e.action != 'create') return;

			chat.push(e.record);
			console.log(e.action);
			console.log(e.record);
		});

		return () => {
			pocketbase.collection('chat').unsubscribe();
		};
	});

	function scroll_bottom() {
		if (!scroll_container) return;
		scroll_container.scrollTop = scroll_container.scrollHeight;
	}

	function format_time(str: string) {
		const date = new Date();
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		return `${hours}:${minutes}`;
	}
</script>

{#if loaded}
	<div class="grid h-68 grid-rows-[1fr_auto]">
		<div
			class="space-y-1.5 overflow-y-auto py-2"
			{@attach scroll_bottom}
			bind:this={scroll_container}
		>
			{#each chat as { body, author, created }}
				<div>
					<div class="inline">[{format_time(created)}]</div>
					<div>({author})</div>
					<div class="inline">
						{body}
					</div>
				</div>
			{/each}
		</div>
		<form {onsubmit} class="mb-2.5">
			<div class="flex items-center gap-1.5">
				<Input name="body" />
				<div class="shrink-0"><Button type="submit">Envoyer</Button></div>
			</div>
		</form>
	</div>
{:else}
	<div class="flex items-center gap-1.5 py-1.5">
		<Loader />
		<div class="text-2">Chargement...</div>
	</div>
{/if}
