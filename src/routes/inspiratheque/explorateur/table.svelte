<script lang="ts">
	import { goto } from '$app/navigation';
	import type { BookmarkTagsRecord } from '$lib/pocketbase.types';
	import IconExternalLink from '$lib/ui/icons/icon-external-link.svelte';
	import IconLink from '$lib/ui/icons/icon-link.svelte';
	import IconFolderClosed from '$lib/ui/icons/static/icon-folder-closed.svelte';
	import IconFolderOpen from '$lib/ui/icons/static/icon-folder-open.svelte';
	import { page } from '$app/state';
	import { is_bookmark } from '../ctx.svelte';
	import type { Explorer } from './ctx.svelte';

	const {
		explorer,
		tags
	}: {
		explorer: Explorer;
		tags: BookmarkTagsRecord[];
	} = $props();

	const { navigation, breadcrumbs, folder_count } = $derived(explorer);

	const params = $derived([...breadcrumbs].map((b) => b.id));

	function inspect(id: string) {
		if (!id) goto('/inspiratheque/explorateur');
		goto('/inspiratheque/explorateur/' + id + page.url.search, { replaceState: true });
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	class="divide-x- grid auto-cols-[14%] grid-flow-col-dense overflow-x-auto whitespace-nowrap select-none md:auto-cols-[10%] xl:auto-cols-[7.5%]"
>
	{#each navigation as col, i}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<section class="relative col-span-3">
			<!-- <div class="flex">
							{@render new_item_button(i)}
						</div> -->

			<div class="absolute inset-0 overflow-y-auto">
				{#each col as item}
					<div
						class={[
							'group cursor-default- flex w-full cursor-pointer items-center gap-layout-x border-b px-2 py-1 hover:border-current',
							params?.includes(item.id)
								? params?.[params.length - 1] == item.id
									? 'border-current bg-current/20'
									: 'border-current bg-current/10'
								: 'border-transparent hover:bg-current/10 ',
							''
						]}
						onclick={() => inspect(item.id)}
					>
						<div class="flex w-5 shrink-0 items-center justify-center">
							{#if is_bookmark(item)}
								{#if item.favicon}
									<div>
										<img
											alt="favicon"
											class="size-4"
											src="https://api.agraf.xyz/api/files/bookmarks/{item.id}/{item.favicon}"
										/>
									</div>
								{:else}
									<div class="opacity-60"><IconLink /></div>
								{/if}
							{:else if params?.includes(item.id)}
								<IconFolderOpen />
							{:else}
								<IconFolderClosed />
							{/if}
						</div>
						<div class="relative w-full max-w-full min-w-0 overflow-hidden text-ellipsis">
							{item.title}
						</div>

						<div class="text-2 text-right hover:text-text">
							{#if is_bookmark(item)}
								<div class="invisible -my-0.5 -mr-1 flex justify-end text-lg group-hover:visible">
									<a class="p-0.5 hover:bg-text hover:text-bg" target="_blank" href={item.url}>
										<IconExternalLink />
									</a>
								</div>
							{:else if folder_count.get(item.id)}
								+{folder_count.get(item.id)}
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</section>
	{/each}
</div>

<!-- <section>
				<table>
					<tbody>
						<tr>
							<td>
								{@render new_item_button(navigation.length)}
							</td>
						</tr>
					</tbody>
				</table>
			</section> -->
