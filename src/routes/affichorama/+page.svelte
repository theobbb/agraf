<script>
	import { dummy } from './dummy';
</script>

<div>
	<div class="mt-24 max-w-250 font-serif text-6xl/16">TOUT CHAUD TOUT FRAIS 🧻</div>
	<div></div>
</div>
<div class=" grid grid-cols-4 gap-2.5">
	{#each dummy as post}
		<div>
			<div style="aspect-ratio: 4/5;" class="relative mb-2.5 overflow-hidden">
				{#if post.images?.length}
					{#each post.images as src}
						<img class="absolute inset-0 object-cover" {src} />
					{/each}
				{:else}
					<div class="absolute inset-0 bg-white/5"></div>
				{/if}
			</div>
			<div class="mb-0.5">{post.title}</div>
			<div class="text-white/50">{post.body}</div>
			<div class="invisible">*</div>
		</div>
	{/each}
</div>

<svelte:head>
	<style>
		html {
			--color-bg: black;
			--color-text: #f0f0f0;
		}
	</style>
</svelte:head>
