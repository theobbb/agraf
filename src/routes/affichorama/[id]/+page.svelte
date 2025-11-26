<script lang="ts">
	import { get_image_url } from '$lib/utils/get-image-url';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	const { poster } = $derived(data);
</script>

<div class="grid-12">
	<a href="/affichorama" class="col-span-full font-serif italic">Retour</a>
	<div class="col-span-4 col-start-7">
		{poster.title}
	</div>

	{#each poster.images as image}
		<img
			class="col-span-full max-h-[80svh] md:col-span-6"
			src={get_image_url(poster.collectionId, poster.id, image)}
		/>
	{/each}
	<div class="space col-span-10 whitespace-break-spaces md:col-span-4 md:row-start-3">
		{poster.body}
	</div>

	<a class="col-span-full mt-12 text-right font-serif italic">Suivant!</a>
</div>
