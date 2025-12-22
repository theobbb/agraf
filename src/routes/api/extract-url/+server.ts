import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, setHeaders }) => {
	const target_url = url.searchParams.get('url');

	if (!target_url) {
		return json('Missing url query parameter');
	}

	let parsedUrl: URL;
	try {
		parsedUrl = new URL(target_url);
	} catch {
		return json('Invalid url');
	}

	try {
		const res = await fetch(parsedUrl.href, {
			headers: {
				// Helps avoid being blocked by some sites
				'User-Agent': 'Mozilla/5.0 (compatible; MetadataFetcher/1.0)'
			},
			redirect: 'follow'
		});

		if (!res.ok) {
			return json('Failed to fetch URL');
		}

		const html = await res.text();

		// Extract <title>
		const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
		const title = titleMatch?.[1]?.trim() ?? null;

		// Extract <meta name="description">
		const descriptionMatch =
			html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
			html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);

		const description = descriptionMatch?.[1]?.trim() ?? null;

		const favicon_url =
			`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=` +
			target_url;

		setHeaders({ 'Cache-Control': 'public, max-age=3000' });

		return json({
			title,
			description,
			favicon_url
		});
	} catch (err) {
		return json({ error: 'Unexpected server error' });
	}
};
