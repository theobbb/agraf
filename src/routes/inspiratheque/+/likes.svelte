<script lang="ts">
	import { onDestroy } from 'svelte';
	import { pocketbase } from '$lib/pocketbase';
	import type { BookmarksRecord } from '$lib/pocketbase.types';

	const { item }: { item: BookmarksRecord } = $props();

	// 2. Tracking variables for debouncing
	let accumulatedIncrement = 0;
	let timer: ReturnType<typeof setTimeout> | undefined;

	async function save_likes_to_db() {
		console.log('saving likes');
		if (accumulatedIncrement === 0) return;

		const amountToAdd = accumulatedIncrement;
		// Reset the accumulator immediately to handle clicks
		// that happen while the request is in flight
		accumulatedIncrement = 0;

		try {
			await pocketbase.collection('bookmarks').update(item.id, {
				'likes+': amountToAdd
			});
		} catch (error) {
			console.error('Failed to save likes:', error);
			// Optional: Rollback UI state if the request fails
			// likes -= amountToAdd;
		}
	}

	function like() {
		// Update UI instantly
		if (!item.likes) item.likes = 0;
		item.likes++;

		// Add to the batch update
		accumulatedIncrement++;

		// Clear existing timer and start a new one
		clearTimeout(timer);
		timer = setTimeout(save_likes_to_db, 1000); // Wait 1 second of inactivity
	}

	// 3. Cleanup: If the user leaves the page, try to save immediately
	onDestroy(() => {
		if (timer) {
			clearTimeout(timer);
			save_likes_to_db();
		}
	});
</script>

<button
	onclick={like}
	class="group flex w-full cursor-pointer items-center justify-between gap-0.5 p-0.5 text-4xl hover:bg-text hover:text-bg"
>
	<span class="invisible px-1 font-serif group-hover:visible">+1</span>

	<div class="flex items-center p-0.5 px-2.5">
		<span class="text-4xl">❤️</span>
		<span class="font-serif">
			{item.likes || 0}
		</span>
	</div>
</button>
