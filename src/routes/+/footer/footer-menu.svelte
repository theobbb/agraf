<script lang="ts">
	import { auth, get_user, login } from '$lib/components/login/auth.svelte';
	import Logo from '$lib/logo.svelte';
	import IconChevronRight from '$lib/ui/icons/icon-chevron-right.svelte';
	import { onMount } from 'svelte';

	import { links } from '../../static';

	import type { ButtonItem, LinkItem, ParentItem, RoadmapItem } from './footer-roadmap';
	import Button from '$lib/ui/button.svelte';
	import Author from '$lib/components/author.svelte';
	import Explosion from '$lib/components/explosion.svelte';
	import { use_current_manager } from '$lib/components/windows/window-manager.svelte';
	import ShutDown from './shut-down.svelte';
	import { page } from '$app/state';
	import WindowTrash from './window-trash.svelte';
	import WindowSettings from './window-settings.svelte';
	import type { Attachment } from 'svelte/attachments';

	const { onclose } = $props();

	const window_manager_ctx = use_current_manager();
	const window_manager = $derived(window_manager_ctx.value);

	const windows_array = $derived(window_manager ? window_manager.windows_array : []);

	const current_year = new Date().getFullYear();

	let window_trash_open = $state(false);
	let window_settings_open = $state(false);
	let is_shut_down = $state(false);

	let on_explode: () => void = $state(() => {});

	let active_path = $state<string[]>([]);
	let close_timeout: ReturnType<typeof setTimeout>;

	function check_visible(path: string[]) {
		if (active_path.length < path.length) return false;
		return path.every((segment, i) => active_path[i] === segment);
	}

	function on_hover(path: string[], on_hover?: () => void) {
		active_path = path;
		if (on_hover) on_hover();
	}

	function on_page_hover() {
		console.log('page hover');
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

	const window_links: ButtonItem[] = $derived(
		[...windows_array].map(({ id, title }) => ({
			name: title,
			type: 'button',
			onclick: () => window_manager?.open_window(id)
		}))
	);

	const linktree: LinkItem[] = $derived(
		[...page.data.links].map(({ name, url }) => ({ name, href: url, type: 'link' }))
	);

	const pages = links.map(({ name, href }) => ({
		name,
		href,
		type: 'link'
	})) as LinkItem[];

	const roadmap: RoadmapItem[] = $derived([
		{
			name: 'Programmes',
			icon: 'windows',
			type: 'parent',
			children: window_links
		},

		{
			name: 'Pages',
			icon: 'globe',
			type: 'parent',
			children: pages
		},
		{
			name: 'Linktree',
			type: 'parent',
			icon: 'email',
			children: [
				{
					name: 'Linktree (page)',
					type: 'link',
					icon: 'email',
					href: '/liens'
				},
				{
					name: 'Linktree (liens)',
					type: 'parent',
					children: linktree
				}
			]
		},

		{ type: 'divider' },
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
			name: 'Corbeille',
			icon: 'recycle-bin',
			type: 'button',
			onclick: () => {
				window_trash_open = true;
			}
		},
		{
			name: 'Paramètres',
			icon: 'settings',
			type: 'button',
			onclick: () => {
				window_settings_open = true;
			}
		},
		{
			name: 'Arrêter',
			icon: 'shut-down',
			type: 'button',
			onclick: () => {
				is_shut_down = true;
			}
		}
	]);

	const blur: Attachment = (element) => {
		const handle_click = (event: MouseEvent) => {
			// If the click is NOT on the menu and NOT inside the menu
			if (element && !element.contains(event.target as Node) && !event.defaultPrevented) {
				onclose();
			}
		};

		document.addEventListener('click', handle_click, true);

		return () => {
			document.removeEventListener('click', handle_click, true);
		};
	};
</script>

<div class="absolute top-0 left-0 -z-10 -translate-y-full" {@attach blur}>
	<div class="grid w-lg border bg-bg pl-gap shadow sm:grid-cols-[3fr_2fr]">
		<div class="flex flex-col justify-between border-r pr-gap">
			<div class=" py-gap-">
				<div class="mb-1 flex items-center gap-2 py-1.5">
					<div class="">
						<img
							class="-my-2 inline aspect-square size-6"
							src="/icons/keys.webp"
							alt="edit-user-icon"
						/>
					</div>
					{#if auth.user}
						<Author author={auth.user} />
					{:else}
						<div></div>
					{/if}
				</div>
				<Button onclick={open_auth}>S'identifier</Button>

				<!-- <div>
						<Button onclick={open_auth} variant="icon">
							<img src="/icons/keys.webp" alt="icon-keys" class="size-6" />
						</Button>
					</div> -->
			</div>
			<div class="flex flex-col justify-end border-t py-2 pt-1">
				<a class="mb-1.5" href="https://3xw.ca/" target="_blank">Site web par 3xw</a>
				<div class="mb-1.5 max-w-50">
					<Logo />
				</div>

				<div class="text-base/4 font-normal" style="font-family: 'Comic', sans-serif;">
					<div>© {current_year} AGRAF ❤️ <br /> Tous droits réservés 😡🤬</div>
				</div>
			</div>
		</div>
		<div class=" whitespace-nowrap">
			{@render group(roadmap, [])}
		</div>
	</div>
</div>

{#snippet item_content(item: LinkItem | ButtonItem | ParentItem)}
	<div
		class="group m-0.5- relative flex cursor-pointer flex-col px-gap py-1.5 pr-8 hover:bg-text hover:text-bg"
	>
		<div class="flex items-center justify-between gap-2">
			<div class="flex items-center gap-2">
				<!-- {#if item.icon}
					<img
						class="-my-2 -ml-1.5 inline size-6"
						src="/icons/{item.icon}.webp"
						alt="icon-{item.name}"
					/>
				{/if} -->
				{item.name}
				<!-- {#if item.type == 'link'}
					<div class=" inline-flex items-center justify-between gap-x-2">
						<IconExternalLink />
					</div>
				{/if} -->
			</div>
			{#if item.type === 'parent'}
				<div class="-mr-7.5 inline-flex items-center justify-between gap-x-2">
					<IconChevronRight />
				</div>
			{/if}
		</div>
	</div>
{/snippet}
<!-- svelte-ignore a11y_no_static_element_interactions -->
{#snippet item_node(item: RoadmapItem, parent_path: string[])}
	{#if item.type != 'divider'}
		{@const path = [...parent_path, item.name]}
		{@const is_visible = check_visible(path)}

		<div
			class="border-b- relative flex flex-col border-dashed"
			onmouseenter={() => on_hover(path, item.on_hover)}
		>
			{#if item.type === 'link'}
				<a href={item.href}>
					{@render item_content(item)}
				</a>
			{:else if item.type === 'button'}
				<button onclick={item.onclick} class="text-left">
					{@render item_content(item)}
				</button>
			{:else if item.type === 'parent'}
				<div>
					{@render item_content(item)}
				</div>
			{/if}

			{#if item.type === 'parent' && item.children && is_visible}
				<div class="min-w-full- absolute -bottom-px left-full w-fit bg-bg shadow">
					{@render group(item.children, path)}
				</div>
			{/if}
		</div>
	{:else}
		<div class="mx-0.5- border-y py-0.5"></div>
	{/if}
{/snippet}

{#snippet group(items: RoadmapItem[], path: string[])}
	<div class={['w-64- flex  flex-col  text-text', path.length == 0 ? 'w-full' : 'w-fit border']}>
		{#each items as item, i}
			<div
				class={[
					item.type != 'divider' &&
						i < items.length - 1 &&
						items[i + 1]?.type != 'divider' &&
						'border-b border-dashed'
				]}
			>
				{@render item_node(item, path)}
			</div>
		{/each}
	</div>
{/snippet}

<Explosion bind:on_explode />
{#if window_settings_open}
	<WindowSettings onclose={() => (window_settings_open = false)} />
{/if}
{#if window_trash_open}
	<WindowTrash onclose={() => (window_trash_open = false)} />
{/if}
{#if is_shut_down}
	<ShutDown />
{/if}
