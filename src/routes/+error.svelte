<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
</script>

<div>
	{page.error?.message}
</div>

<style>
</style>
