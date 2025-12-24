<script>
	const n = 12;
	const speed = 1.2;
</script>

<svg width="1em" height="1em" viewBox="0 0 100 100" fill="none" style="display: block">
	{#each Array(n) as _, i}
		<line
			x1="50"
			y1="10"
			x2="50"
			y2="15"
			stroke="currentColor"
			stroke-width="12"
			stroke-linecap="square"
			transform="rotate({(360 / n) * i} 50 50)"
			opacity="0.1"
		>
			<animate
				attributeName="opacity"
				values="1;0.1"
				dur="{speed}s"
				begin="{(-speed / n) * i}s"
				repeatCount="indefinite"
			/>
		</line>
	{/each}
</svg>
