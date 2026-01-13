<script lang="ts">
	import Markdown from '$lib/markdown.svelte';
	import { pocketbase } from '$lib/pocketbase';
	import IconLink from '$lib/ui/icons/icon-link.svelte';
	import IconFolderOpen from '$lib/ui/icons/static/icon-folder-open.svelte';
	import { is_bookmark, type Item } from '../ctx.svelte';

	import Favicon from './favicon.svelte';

	const { item }: { item: Item } = $props();
</script>

{#if is_bookmark(item)}
	<div>
		<div class="justify-between- flex items-start gap-2.5">
			<div class="mt-0.5 shrink-0">
				<Favicon bookmark={item} />
			</div>
			<div>{item.title}</div>
		</div>
		<div class="mt-0.5 mr-6">
			<div class="">
				<div class="col-span-8 flex gap-layout-x">
					<div class={['line-clamp-4 max-w-md']}>
						<div>
							<div class="text-2 text-balance">
								<Markdown content={item.description || ''} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="items center flex gap-2.5">
		<IconFolderOpen />
		<div>{item.title}</div>
	</div>
{/if}
