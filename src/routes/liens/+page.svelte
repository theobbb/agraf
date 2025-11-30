<script lang="ts">
	import Logo from '$lib/logo.svelte';
	import { pocketbase } from '$lib/pocketbase.js';
	import Button from '$lib/ui/button.svelte';
	import Header from '../header.svelte';
	const { data } = $props();

	const { links } = $derived(data);
</script>

<div class="grid-12 min-h-svh pt-4">
	{#each links as link}
		<a class="col-span-3 flex flex-col" href={link.url}>
			<div class="relative w-fit">
				<img src="/images/folder.jpg" />
				<div class="absolute inset-0 translate-x-3 -translate-y-1 -skew-14 text-3xl">
					{link.icon}
				</div>
			</div>

			<div class="max-w-56 font-serif text-xl/6 text-balance">{link.name}</div>
		</a>
	{/each}
	<div class="col-span-full border-t"><Header /></div>
</div>

<svelte:head>
	<style>
		html {
			--color-bg: black;
			--color-text: #f0f0f0;
		}
	</style>
</svelte:head>
