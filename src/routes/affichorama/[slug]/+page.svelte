<script lang="ts">
	import { get_image_url } from '$lib/utils/get-image-url';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	const { poster } = $derived(data);
</script>

<div class="grid-12 md:h-svh">
	<a href="/affichorama" class="col-span-full font-serif italic lg:col-span-4">Retour</a>
	<!-- <div class="invisible col-span-4 col-start-7 lg:col-start-5 lg:row-start-1">
		{poster.title}
	</div> -->

	<div class="col-span-full lg:col-span-8 lg:col-start-6 lg:row-span-2 lg:row-start-2">
		<div class="relative flex gap-2.5 overflow-x-auto md:h-[calc(100svh-9rem)]">
			{#each poster.images as image}
				<img
					class="md:mb-2.5- max-h-full object-contain"
					src={get_image_url(poster.collectionId, poster.id, image)}
					alt=""
				/>
			{/each}
		</div>
	</div>
	<div class="space col-span-10 max-w-160 lg:col-span-4 lg:col-start-1 lg:row-start-2">
		<div class="text-2">{poster.title}</div>
		<div class="whitespace-break-spaces">{poster.body}</div>
	</div>
	<!-- <a
		class="col-span-full flex items-end justify-end font-serif italic lg:col-span-4 lg:col-start-1 lg:row-start-3 lg:justify-start"
		>Suivant</a
	> -->
	<a class="col-span-full flex items-end justify-end font-serif italic">Suivant</a>
</div>
