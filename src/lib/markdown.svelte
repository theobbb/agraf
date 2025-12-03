<script lang="ts">
	import { marked } from 'marked';

	const { content }: { content: string } = $props();
</script>

<div class="markdown">{@html marked(content)}</div>
