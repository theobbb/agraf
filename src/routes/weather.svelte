<script lang="ts">
	import { onMount } from 'svelte';

	let weather: { temperature: number; sky: [string, string] } | null = $state(null);

	const LATITUDE = 45.513;
	const LONGITUDE = -73.562;
	const API_ENDPOINT = `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m,weather_code&temperature_unit=celsius&timezone=America%2FNew_York`;

	function get_sky_description(code: number) {
		const descriptions: Record<number, [string, string]> = {
			0: ['Ciel dégagé', '☀️'],
			1: ['Principalement dégagé', '🌤️'],
			2: ['Partiellement nuageux', '⛅'],
			3: ['Couvert (Très nuageux)', '☁️'],
			45: ['Brouillard', '🌫️'],
			48: ['Brouillard givrant', '❄️'],
			51: ['Bruine légère', '💧'],
			53: ['Bruine modérée', '💧'],
			55: ['Bruine dense', '💧'],
			56: ['Bruine verglaçante légère', '🧊'],
			57: ['Bruine verglaçante dense', '🧊'],
			61: ['Pluie légère', '🌧️'],
			63: ['Pluie modérée', '🌧️'],
			65: ['Forte pluie', '🌧️'],
			66: ['Pluie verglaçante légère', '🧊🌧️'],
			67: ['Pluie verglaçante forte', '🧊🌧️'],
			71: ['Faible chute de neige', '🌨️'],
			73: ['Chute de neige modérée', '🌨️'],
			75: ['Forte chute de neige', '❄️'],
			77: ['Grains de neige', '❄️'],
			80: ['Averses de pluie légères', '🌦️'],
			81: ['Averses de pluie modérées', '🌧️'],
			82: ['Averses de pluie violentes', '⛈️'],
			85: ['Averses de neige légères', '🌨️'],
			86: ['Averses de neige fortes', '❄️'],
			95: ['Orage: Léger ou modéré', '⚡'],
			96: ['Orage avec grêle légère', '⛈️'],
			99: ['Orage avec grêle forte', '⛈️']
		};

		// Return the description, or a default message if the code is unknown
		return descriptions[code] || `Weather Code ${code} (Unknown)`;
	}
	async function get_weather() {
		try {
			const response = await fetch(API_ENDPOINT);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			console.log(data);
			const temperature = data.current.temperature_2m;
			const sky = get_sky_description(data.current.weather_code);

			weather = { temperature, sky };
		} catch (error) {
			console.error('Failed to fetch weather data from Open-Meteo:', error);
		}
	}
	onMount(() => {
		get_weather();
	});
</script>

<div>
	<div class="flex gap-2 text-3xl">
		<div class="text-5xl">{weather?.sky[1]}</div>
		<div class="font-serif">
			{weather?.temperature || '...'} °C
		</div>
	</div>
	<div class="">{weather?.sky[0]}</div>
</div>
