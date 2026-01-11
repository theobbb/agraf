<script lang="ts">
	import { auth, get_user, login } from '$lib/components/login/auth.svelte';
	import Logo from '$lib/logo.svelte';
	import IconChevronRight from '$lib/ui/icons/icon-chevron-right.svelte';
	import { onMount } from 'svelte';

	import { links } from '../../static';

	import type { LinkItem, RoadmapItem } from './footer-roadmap';
	import Button from '$lib/ui/button.svelte';
	import Author from '$lib/components/author.svelte';
	import Explosion from '$lib/components/explosion.svelte';
	const { onclose } = $props();

	const current_year = new Date().getFullYear();

	let on_explode: () => void = $state(() => {});

	let active_path = $state<string[]>([]);
	let close_timeout: ReturnType<typeof setTimeout>;

	function check_visible(path: string[]) {
		if (active_path.length < path.length) return false;
		return path.every((segment, i) => active_path[i] === segment);
	}

	function on_hover(path: string[]) {
		active_path = path;
	}

	function handleMouseLeaveMenu() {
		// Delay closing so it doesn't feel clinical/abrupt
		close_timeout = setTimeout(() => {
			active_path = [];
		}, 300);
	}

	async function open_auth() {
		await login();
	}

	onMount(() => {
		get_user();
	});

	const pages = links.map(({ name, href }) => ({ name, href, type: 'link' })) as LinkItem[];
	const roadmap: RoadmapItem[] = [
		{
			name: 'Email',
			type: 'link',
			icon: 'email',
			href: 'https://www.instagram.com/agraf.uqam/'
		},
		{
			name: 'Instagram',
			type: 'link',
			icon: 'instagram',
			href: 'https://www.instagram.com/agraf.uqam/'
		},
		{
			name: 'Facebook',
			type: 'link',
			icon: 'facebook',
			href: 'https://www.facebook.com/agraf.uqam/'
		},
		{
			name: 'Linkedin',
			type: 'button',

			onclick: () => {
				on_explode();
			}
		},
		{ type: 'divider' },
		{
			name: 'Liens',
			type: 'link',
			icon: 'email',
			href: '/liens'
		},
		{
			name: 'Pages',
			icon: 'window',
			type: 'parent',
			children: pages
		},

		{ type: 'divider' },
		{
			name: 'Corbeille',
			icon: 'recycle-bin',
			type: 'button',
			onclick: () => {}
		},
		{
			name: 'Paramètres',
			icon: 'settings',
			type: 'button',
			onclick: () => {}
		},
		{
			name: 'Arrêter',
			icon: 'shut-down',
			type: 'button',
			onclick: () => {
				console.log('fermer');
				window.close();

				// goto('https://www.youtube.com/watch?v=xvFZjo5PgG0&list=RDxvFZjo5PgG0');
			}
		}
	];
</script>

<div class="absolute top-0 left-0 -z-10 -translate-y-full">
	<div class="w-2xs border bg-bg px-gap shadow">
		<div class=" whitespace-nowrap">
			{@render group(roadmap, [])}
		</div>
		<div class="border-t py-2 pt-1">
			<div class="mb-1.5">Site web par 3xw</div>
			<div class="mb-1.5 max-w-50">
				<Logo />
			</div>

			<div class="text-base/4 font-normal" style="font-family: 'Comic', sans-serif;">
				<div>© {current_year} AGRAF ❤️ <br /> Tous droits réservés 😡🤬</div>
			</div>
		</div>
		<div class="flex items-center justify-between gap-2 border-t py-gap pt-6">
			<div>
				<img class="size-6" src="/icons/edit-user.webp" alt="edit-user-icon" />
			</div>
			{#if auth.user}
				<Author author={auth.user} />
			{:else}
				<div></div>
			{/if}
			<Button onclick={open_auth}>S'identifier</Button>
			<!-- <div>
					<Button onclick={open_auth} variant="icon">
						<img src="/icons/keys.webp" alt="icon-keys" class="size-6" />
					</Button>
				</div> -->
		</div>
	</div>
</div>
<!-- svelte-ignore a11y_no_static_element_interactions -->
{#snippet item_node(item: RoadmapItem, parent_path: string[])}
	{#if item.type != 'divider'}
		{@const path = [...parent_path, item.name]}
		{@const is_visible = check_visible(path)}

		<div
			class="group relative m-0.5 flex flex-col px-gap py-1 pr-8 hover:bg-text hover:text-bg"
			onmouseenter={() => on_hover(path)}
		>
			<div class="flex items-center gap-2">
				{#if item.icon}
					<img
						class="-my-2 -ml-1.5 inline size-6"
						src="/icons/{item.icon}.webp"
						alt="icon-{item.name}"
					/>
				{/if}
				{#if item.type === 'link'}
					<a href={item.href} class="hover:underline">
						{item.name}
					</a>
				{:else if item.type === 'button'}
					<button onclick={item.onclick} class="text-left">
						{item.name}
					</button>
				{:else if item.type === 'parent'}
					<div class="-mr-8 inline-flex items-center justify-between gap-x-2">
						<div class="pr-8">{item.name}</div>
						<IconChevronRight />
					</div>
				{/if}
			</div>
			{#if item.type === 'parent' && item.children && is_visible}
				<div class="absolute top-0 left-full min-w-full bg-bg shadow">
					{@render group(item.children, path)}
				</div>
			{/if}
		</div>
	{:else}
		<div class="border-b border-double"></div>
	{/if}
{/snippet}

{#snippet group(items: RoadmapItem[], path: string[])}
	<div class={['w-64- flex  flex-col  text-text', path.length == 0 ? 'w-full' : 'w-fit border']}>
		{#each items as item, i}
			{@render item_node(item, path)}
		{/each}
	</div>
{/snippet}

<Explosion bind:on_explode />
