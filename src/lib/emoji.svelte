<script>
	const { children } = $props();
</script>

<div
	class="pointer-events-none relative z-150 -mt-6 mb-6 text-5xl select-none lg:-mt-4 lg:text-right lg:text-7xl"
>
	{@render children()}
</div>
