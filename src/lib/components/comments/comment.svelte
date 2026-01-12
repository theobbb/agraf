<script lang="ts">
	import { page } from '$app/state';
	import { use_comments } from '$lib/cache/cache-comments.svelte';

	import type { CommentsRecord, TicketsRecord } from '$lib/pocketbase.types';

	import Button from '$lib/ui/button.svelte';
	import IconMessage from '$lib/ui/icons/icon-message.svelte';
	import { format_time } from '$lib/utils/format-date';
	import Author from '../author.svelte';
	import CommentEditor from './comment-editor.svelte';
	import Comment from './comment.svelte';

	const {
		comment,
		level,
		replying_to
	}: {
		comment: CommentsRecord;
		level: number;
		replying_to: { comment: CommentsRecord | null };
	} = $props();

	const comments_service = use_comments();

	const system_event = $derived(comment.type == 'system');

	const children = $derived(
		comments_service.cache[comment.parent]?.filter((c) => c.parent_comment == comment.id) || []
	);

	const ticket_moved_expanded = $derived.by(() => {
		if (comment.type != 'ticket_moved') return;
		const [id_0, id_1] = comment.body.split(':');
		const from = page.data.tickets.find((t: TicketsRecord) => t.id == id_0);
		const to = page.data.tickets.find((t: TicketsRecord) => t.id == id_1);
		return { from, to };
	});
</script>

<div
	class={[
		'pb-1.5- group flex items-start justify-between gap-x-4 border-dashed border-text py-1 pb-1.5 last:border-b',
		system_event ? '' : 'border-b'
	]}
>
	<div class="">
		<div>
			<div class="text-2 inline">
				[{format_time(comment.created)}]
			</div>
			{#if comment.type == 'public'}
				<div class="inline"><Author author={comment.author_name} /></div>
			{/if}
			{#if system_event}
				{#if comment.type == 'status_change'}
					<!-- <Status status={comment.body} /> -->
				{:else if comment.type == 'ticket_moved'}
					<div class="">
						<span>Ticket déplacé de</span>
						<a class="mx-1 bg-white/10 px-2" href="/tickets/{ticket_moved_expanded?.from?.id}">
							{ticket_moved_expanded?.from?.title}
						</a>
						vers
						<a class="mx-1 bg-white/10 px-2" href="/tickets/{ticket_moved_expanded?.to?.id}"
							>{ticket_moved_expanded?.to?.title}</a
						>
					</div>
				{/if}
			{/if}
		</div>
		<div class="">
			{comment.body}
		</div>
	</div>
	{#if !system_event}
		<div class="mt-0.5 flex items-center gap-1 opacity-0 group-hover:opacity-100">
			{#if !comment.parent_comment}
				<Button
					variant="icon"
					onclick={() => (replying_to.comment = replying_to.comment == comment ? null : comment)}
				>
					<IconMessage />
				</Button>
			{/if}
		</div>
	{/if}
</div>

{#if replying_to.comment == comment}
	<div class="mt-1 mb-2">
		<div class="text-2">Réponse à <Author author={comment.author_name} /></div>
		<div class="mt-1.5 text-right">
			{#if replying_to.comment?.id == comment.id}
				<CommentEditor
					parent={comment.parent}
					parent_comment={comment.id}
					{replying_to}
					oncancel={() => (replying_to.comment = null)}
				/>
			{/if}
		</div>
	</div>
{/if}
{#if children?.length}
	<div style="margin-left: {(level + 1) * 2.5}rem;" class="mb-8">
		{#each children as child}
			<Comment comment={child} level={level + 1} {replying_to} />
		{/each}
	</div>
{/if}
