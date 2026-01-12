<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Button from '$lib/ui/button.svelte';
	import IconClose from '$lib/ui/icons/icon-close.svelte';
	import IconReset from '$lib/ui/icons/icon-reset.svelte';
	import Input from '$lib/ui/input.svelte';
	import { url_query_param } from '$lib/utils/url';

	const {
		id,
		query_param = 'search',
		client_override
	}: {
		id: string;
		query_param?: string;
		client_override?: { on_search: (value: string) => void; on_reset: () => void };
	} = $props();

	let value: string = $state(page.url.searchParams.get(query_param) || '');

	async function onsubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		event.preventDefault();
		if (client_override) return client_override.on_search(value);
		//event.currentTarget.reset()

		const url = url_query_param(page.url.href, query_param, value);
		goto(url);
	}

	function reset() {
		value = '';

		if (client_override) return client_override.on_reset();

		const url = url_query_param(page.url.href, query_param, null);
		goto(url);
	}
</script>

<form class="group relative flex w-full gap-0.5" {onsubmit} autocomplete="off">
	<Input
		class={['bg-background-2 peer', value ? 'w-full! lg:pr-54!' : 'focus:w-full! lg:w-64!']}
		name="search"
		placeholder="Rechercher..."
		bind:value
	/>
	<div
		class={[
			value ? '' : 'invisible group-focus-within:visible',
			'pointer-events-none inset-0 flex items-center justify-end gap-0.5 px-1.5 pr-1 max-lg:hidden '
		]}
	>
		<div class="pointer-events-auto">
			<Button disabled={value == ''} type="submit">Rechercher</Button>
		</div>
		<!-- <div class="pointer-events-auto">
			<Button disabled={value == ''} type="submit" variant="icon">
				<img src="/icons/search.webp" />
			</Button>
		</div> -->
		<div class="pointer-events-auto">
			<Button
				disabled={!page.url.searchParams.get(query_param)}
				onclick={reset}
				variant="icon"
				class="p-1!"
			>
				<IconReset />
			</Button>
		</div>
	</div>
</form>
