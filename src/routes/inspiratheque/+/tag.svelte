<script lang="ts">
	import { page } from '$app/state';
	import type { BookmarkTagsRecord } from '$lib/pocketbase.types';

	const { id }: { id: string } = $props();

	const { tags_map } = page.data;
	const tag = $derived(tags_map.get(id));
</script>

{#if tag}
	<a class="bg-text px-gap py-1 text-bg" href="/inspiratheque/liste?tag={tag.id}">
		#{tag.name}
	</a>
{/if}
