<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import Label from './label.svelte';

	let {
		id,
		name,
		label,
		value = $bindable(),
		rows = 8,
		...props
	}: HTMLTextareaAttributes & {
		label?: string;
	} = $props();
</script>

{#if label}
	<Label id={id || name} class="mb-1 block">{label}</Label>
{/if}
<textarea
	{...props}
	id={id || name}
	class={[
		'min-h-8 w-full border bg-text/5 px-2 py-0.5 text-text outline-none focus:border-transparent! focus:bg-white/10 focus:ring-2',
		props.class
	]}
	{name}
	{rows}
	bind:value
>
</textarea>
