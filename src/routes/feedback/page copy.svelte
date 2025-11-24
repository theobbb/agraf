<script>
	import Emoji from '$lib/emoji.svelte';
</script>

<Emoji>🦋</Emoji>

<div class="grid-12">
	<div class="col-span-4 flex min-h-[calc(100svh-10rem)] flex-col justify-between text-balance">
		<div>
			<div class="mb-4 font-serif">Boîte de commentaires</div>
			<div class="max-w-130">
				<div>
					Pour bien représenter les étudiant·es du programme et pour créer une vie étudiante à votre
					image, l'AGRAF veut avoir vos commentaires!
				</div>
				<div>
					Ici, tu peux nous envoyer tes suggestions, préoccupations et idées. Cette boîte est
					ouverte en tout temps. On t'invite aussi à nous envoyer un courriel (agraf.uqam@gmail.com)
					pour un contact plus direct.
				</div>
				<div class="text-2">
					Toute forme de violence ou de haine envers un individu ou un groupe ne sera en aucun cas
					tolérée, et les réponses de cette nature ne seront pas prises en compte.
				</div>
			</div>
		</div>
		<div class="font-serif">Merci pour ton feedback!</div>
	</div>
	<div class="col-span-4 col-start-7">
		<div class="space-y-4">
			<div>
				(optionnel, tu peux envoyer ton message de manière anonyme et ultra mystérieuse si tu veux)
			</div>
			<input
				name="name"
				type="text"
				class="w-ful bg-text px-4 font-serif text-bg"
				placeholder="Nom"
			/>
			<input
				name="email"
				type="email"
				class="w-full bg-text px-4 font-serif text-bg"
				placeholder="Email"
			/>
		</div>
	</div>
</div>

<svelte:head>
	<style>
		html {
			--color-bg: #363636;
			--color-text: #ea8585;
		}
	</style>
</svelte:head>
