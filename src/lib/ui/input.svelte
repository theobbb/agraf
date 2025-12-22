<script>
	let { name, value = $bindable(), ...props } = $props();
</script>

<input
	{...props}
	class={[
		'w-full px-4 font-serif text-text placeholder-current/40 outline-none focus:border-transparent! focus:ring-3',
		props.class
	]}
	type="text"
	{name}
	bind:value
/>
