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
