export function format_date(isoString: string): string {
	const date = new Date(isoString);

	// Ensure valid date
	if (isNaN(date.getTime())) {
		throw new Error('Invalid ISO date string');
	}

	const formatter = new Intl.DateTimeFormat('fr-FR', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});

	return formatter.format(date);
}

export function format_time(str: string) {
	const date = new Date(str);

	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const year = date.getFullYear();

	const months = [
		'janv.',
		'févr.',
		'mars',
		'avr.',
		'mai',
		'juin',
		'juil.',
		'août',
		'sept.',
		'oct.',
		'nov.',
		'déc.'
	];

	const month = months[date.getMonth()];

	return `${hours}:${minutes} · ${day} ${month} ${year}`;
}
