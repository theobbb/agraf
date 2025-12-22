<script lang="ts">
	const { breadcrumbs } = $props();
</script>

<div>
	{#if breadcrumbs.length > 1}
		<nav>
			{#each breadcrumbs as crumb, i}
				{#if i > 0}
					<span class="mx-2 text-current/20">/</span>
				{/if}

				{#if i < breadcrumbs.length - 1}
					<a href="/inspiratheque/{crumb.id}" class="text-2 hover:underline">
						{crumb.title}
					</a>
				{:else}
					<span class="text-current">{crumb.title}</span>
				{/if}
			{/each}
		</nav>
	{:else}
		<div class="text-current/70 capitalize">Inspirathèque</div>
	{/if}
</div>
