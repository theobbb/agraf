<script lang="ts">
	type Variant = 'base' | 'action' | 'cancel';

	const { variant = 'base', type = 'button', children, ...props } = $props();

	const variant_cx = {
		base: 'bg-white/10 border-black/20',
		action: 'bg-green-900 text-white/90 border-green-600/50',
		cancel: 'bg-red-500'
	};
</script>

<button
	{...props}
	class={['min-w-24 border px-1.5 pb-0.5', variant_cx[variant], props.class]}
	{type}
>
	{@render children?.()}
</button>
