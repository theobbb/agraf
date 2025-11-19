<script>
	let { name, value = $bindable(), rows = 8, ...props } = $props();
</script>

<textarea
	{...props}
	class={[
		'border border-black/20  px-2.5 py-1.5 placeholder-black/50 ring-black/20 outline-none focus:ring-2',
		props.class
	]}
	{name}
	{rows}
	bind:value
>
</textarea>
