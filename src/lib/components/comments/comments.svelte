<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import Comment from './comment.svelte';

	import type { CommentsRecord, IsoAutoDateString } from '$lib/pocketbase.types';
	import CommentEditor from './comment-editor.svelte';

	import Button from '$lib/ui/button.svelte';

	import type { CommentsCollectionOptions } from '$lib/types';
	import Loader from '$lib/ui/loader.svelte';
	import IconMessage from '$lib/ui/icons/icon-message.svelte';
	import { use_comments } from '$lib/cache/cache-comments.svelte';

	const {
		parent,
		collection
	}: {
		parent: string;
		collection: CommentsCollectionOptions;
	} = $props();

	setContext('collection', collection);

	const comments_service = use_comments();

	const comments = $derived(
		comments_service.cache[parent]?.filter((comment) => !comment.parent_comment) || []
	);

	let commenting = $state(false);

	let replying_to: { comment: CommentsRecord | null } = $state({ comment: null });

	let loaded = $state(false);
	async function load_comments() {
		await comments_service.get_comments(parent, collection);
		loaded = true;
	}

	onMount(() => {
		load_comments();
	});
</script>

{#if loaded}
	<div class="">
		{#each comments as comment}
			<Comment {comment} level={0} {replying_to} />
		{/each}
	</div>
	<div class="mt-4 mb-1">
		<Button
			variant="icon"
			onclick={() => {
				replying_to.comment = null;
				commenting = !commenting;
			}}
		>
			<IconMessage />
		</Button>
	</div>
	{#if commenting && !replying_to.comment}
		<CommentEditor
			{parent}
			parent_comment={null}
			{replying_to}
			oncancel={() => (commenting = false)}
		/>
	{/if}
{:else}
	<div class="text-2 flex items-center gap-2">
		<Loader /> Chargement des commentaires...
	</div>
{/if}
