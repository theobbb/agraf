<script lang="ts">
	import { marked } from 'marked';

	const { content }: { content: string } = $props();

	marked.setOptions({
		gfm: true, // Enable GFM features (tables, task lists, etc.)
		breaks: true // Treat single line breaks as <br> (more user-friendly)
	});
</script>

<div class="markdown">{@html marked(content)}</div>
