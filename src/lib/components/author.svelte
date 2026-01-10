<script>
	const { author } = $props();
</script>

{#if author}
	&lt;{author}&gt;
{:else}
	<span class="text-2">&lt;Anonyme&gt;</span>
{/if}
