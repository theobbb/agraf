<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	let {
		id,
		name,
		label,
		placeholder,
		required = false,
		value = $bindable(),
		...props
	}: HTMLInputAttributes & {
		label?: string;
		props?: any;
	} = $props();
</script>

{#if label}
	<label for={id || name} class="mb-1 block">{label}</label>
{/if}
<input
	{...props}
	id={id || name}
	class={[
		'min-h-8 w-full border bg-text/5 px-2 py-0.5 text-text outline-none focus:border-transparent! focus:bg-white/10 focus:ring-2'
	]}
	type="text"
	{placeholder}
	{required}
	{name}
	bind:value
/>
