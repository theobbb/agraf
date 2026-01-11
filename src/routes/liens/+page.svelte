<script lang="ts">
	const { data } = $props();

	const { links } = $derived(data);
</script>

<div class="grid-12 gap-y-12! py-24">
	{#each links as link}
		<div class="col-span-6 sm:col-span-4 lg:col-span-3">
			<a class="group flex flex-col items-center" href={link.url} target="_blank">
				<div class="relative w-fit">
					<img src="/icons/folder_closed.webp" alt="folder-icon" />
					<div class="absolute inset-0 flex items-center justify-end text-2xl">
						{link.icon}
					</div>
				</div>

				<div
					class="font-serif- text-xl/6- max-w-56 text-center text-balance underline-offset-4 group-hover:underline"
				>
					{link.name}
				</div>
			</a>
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
