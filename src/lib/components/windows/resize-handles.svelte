<script lang="ts">
	const { start_resize } = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="pointer-events-none -inset-2">
	<div
		class="y top-0 right-0 left-0 cursor-n-resize"
		onmousedown={(e) => start_resize(e, 'n')}
	></div>
	<div
		class="y right-0 bottom-0 left-0 cursor-s-resize"
		onmousedown={(e) => start_resize(e, 's')}
	></div>
	<div
		class="x top-0 right-0 bottom-0 cursor-e-resize"
		onmousedown={(e) => start_resize(e, 'e')}
	></div>
	<div
		class="x top-0 bottom-0 left-0 cursor-w-resize"
		onmousedown={(e) => start_resize(e, 'w')}
	></div>
	<div class="x y top-0 left-0 cursor-nw-resize" onmousedown={(e) => start_resize(e, 'nw')}></div>
	<div class="x y top-0 right-0 cursor-ne-resize" onmousedown={(e) => start_resize(e, 'ne')}></div>
	<div
		class="x y bottom-0 left-0 cursor-sw-resize"
		onmousedown={(e) => start_resize(e, 'sw')}
	></div>
	<div
		class="x y right-0 bottom-0 cursor-se-resize"
		onmousedown={(e) => start_resize(e, 'se')}
	></div>
</div>

<style>
	div {
		position: absolute;
	}
	div div {
		pointer-events: all;
		/* background-color: rgba(137, 43, 226, 0.355); */
	}
	div.x {
		width: 0.7rem;
	}
	div.y {
		height: 0.7rem;
	}
</style>
