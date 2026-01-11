<script lang="ts">
	const { children } = $props();
</script>

<div>
	{@render children?.()}
</div>

<style>
	div {
		color: black;
		background: silver;

		border: none;
		border-radius: 0;
		box-shadow:
			inset -1px -1px #fff,
			inset 1px 1px #0a0a0a,
			inset -2px -2px #dfdfdf,
			inset 2px 2px grey;
	}
</style>
