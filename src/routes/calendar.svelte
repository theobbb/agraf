<script lang="ts">
	import type { EventsRecord } from '$lib/pocketbase.types';
	import Button from '$lib/ui/button.svelte';

	let { events = [] }: { events: EventsRecord[] } = $props();

	let viewDate = $state(new Date());

	let days = $derived.by(() => {
		const year = viewDate.getFullYear();
		const month = viewDate.getMonth();

		const firstDayOfMonth = new Date(year, month, 1).getDay();
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		const daysInPrevMonth = new Date(year, month, 0).getDate();

		let grid = [];

		for (let i = firstDayOfMonth - 1; i >= 0; i--) {
			grid.push({
				day: daysInPrevMonth - i,
				month: month - 1,
				year,
				currentMonth: false
			});
		}

		for (let i = 1; i <= daysInMonth; i++) {
			grid.push({
				day: i,
				month,
				year,
				currentMonth: true
			});
		}

		// 3. Remplir avec le mois suivant pour atteindre 6 lignes (42 cellules)
		const remaining = 42 - grid.length;
		for (let i = 1; i <= remaining; i++) {
			grid.push({
				day: i,
				month: month + 1,
				year,
				currentMonth: false
			});
		}

		return grid;
	});

	// Logique des événements à venir
	let upcomingEvents = $derived(
		events
			.filter((e) => e.start_time && new Date(e.start_time) >= new Date())
			.sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
	);

	// Fonctions utilitaires
	const moveMonth = (offset: number) => {
		viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1);
	};

	const isToday = (d: number, m: number, y: number) => {
		const now = new Date();
		return now.getDate() === d && now.getMonth() === m && now.getFullYear() === y;
	};

	const getEventsForDay = (d: number, m: number, y: number) => {
		return events.filter((e) => {
			const date = new Date(e.start_time);
			return date.getDate() === d && date.getMonth() === m && date.getFullYear() === y;
		});
	};

	let hovered: EventsRecord | null = $state(null);
</script>

<div class="absolute inset-0 w-full overflow-hidden">
	<div class="inset-0 flex h-full px-2.5 py-1.5 pb-2.5">
		<aside class="w-1/5 shrink-0 overflow-y-auto px-0 pr-4">
			<h2 class="mb-14">À venir</h2>
			<div class="space-y-3">
				{#each upcomingEvents as event}
					<div
						class=" border bg-white px-2 py-1.5 hover:bg-[chartreuse]"
						onmouseenter={() => (hovered = event)}
						onmouseleave={() => (hovered = null)}
					>
						<p class="">{event.name}</p>
						<p class="mt-1.5 capitalize">
							{new Date(event.start_time).toLocaleDateString('fr-FR', {
								month: 'long',
								day: 'numeric',
								hour: '2-digit',
								minute: '2-digit'
							})}
						</p>
					</div>
				{:else}
					<p class="text-text-2">Aucun événement à venir.</p>
				{/each}
			</div>
		</aside>

		<main class="flex flex-1 flex-col">
			<header class="mb-4 flex items-center justify-between gap-4">
				<div class="flex items-center gap-2">
					<div class="mr-2 flex gap-1">
						<Button
							variant="icon"
							size="sm"
							class="flex items-center"
							onclick={() => moveMonth(-1)}
						>
							<div class="icon-[ri--arrow-left-line]"></div>
						</Button>
						<Button size="sm" variant="icon" class="flex items-center" onclick={() => moveMonth(1)}>
							<div class="icon-[ri--arrow-right-line]"></div>
						</Button>
					</div>
					<h1 class="capitalize">
						{viewDate.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}
					</h1>
				</div>
				<Button size="sm" class="flex items-center" onclick={() => (viewDate = new Date())}>
					Aujourd'hui
				</Button>
			</header>

			<div class="flex flex-1 flex-col">
				<div class="grid w-full grid-cols-7">
					{#each ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'] as dayName}
						<div class=" border-r- border-b- py-2 uppercase">
							{dayName}
						</div>
					{/each}
				</div>

				<div class="grid flex-1 grid-cols-7 border-t border-l">
					{#each days as { day, month, year, currentMonth }}
						{@const dayEvents = getEventsForDay(day, month, year)}
						<div
							class={[
								'relative overflow-hidden border-r border-b  p-2',

								isToday(day, month, year) ? 'bg-[yellow] ' : ''
							]}
						>
							<span
								class={[
									'absolute top-[0.2cqw] left-[0.5cqw] font-serif text-[3cqw]! leading-none',
									currentMonth ? '' : ' text-black/20'
								]}
							>
								{day}
							</span>

							<div class="mt-2- mt-[3.5cqw] space-y-1">
								{#each dayEvents as event}
									<div
										class={[
											' w-fit truncate rounded leading-tight',
											hovered?.id == event.id ? 'link-shake' : ''
										]}
										style="background-color: {event.color_background}; color: {event.color_foreground}"
										title={event.name}
									>
										{event.name}
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</main>
	</div>
</div>
