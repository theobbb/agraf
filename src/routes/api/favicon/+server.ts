import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const targetUrl = url.searchParams.get('url');

	if (!targetUrl) {
		return new Response('Missing url', { status: 400 });
	}

	const faviconUrl =
		`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=` +
		targetUrl;

	const res = await fetch(faviconUrl);

	if (!res.ok) {
		return new Response('Failed to fetch favicon', { status: 404 });
	}

	return new Response(res.body, {
		headers: {
			'Content-Type': res.headers.get('content-type') ?? 'image/png',
			'Cache-Control': 'public, max-age=86400'
		}
	});
};
