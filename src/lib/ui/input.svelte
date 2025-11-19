<script>
	let { name, value = $bindable(), ...props } = $props();
</script>

<input
	{...props}
	class={[
		'border border-black/10 px-2.5 py-1.5 placeholder-black/50 ring-black/20 outline-none focus:ring-2',
		props.class
	]}
	type="text"
	{name}
	bind:value
/>
