// src/routes/api/metadata/+server.js

import { json } from '@sveltejs/kit';
// Import cheerio (use '*' for CommonJS library in SvelteKit's default ESM)
import * as cheerio from 'cheerio';

// Helper function to safely resolve relative URLs to absolute ones
function resolveUrl(baseUrl, relativeUrl) {
	if (!relativeUrl) return null;
	try {
		// new URL(relative, base) handles the resolution
		return new URL(relativeUrl, baseUrl).href;
	} catch (e) {
		// Handle malformed URLs gracefully
		console.error('Failed to resolve URL:', e.message);
		return null;
	}
}

export async function GET({ url }) {
	const targetUrl = url.searchParams.get('url');

	console.log(targetUrl);
	if (!targetUrl) {
		return json({ error: 'URL parameter is missing' }, { status: 400 });
	}

	try {
		// 1. Fetch the external URL's HTML
		const response = await fetch(targetUrl);
		if (!response.ok) {
			throw new Error(`Failed to fetch target URL (Status: ${response.status})`);
		}

		const html = await response.text();

		// 2. Load the HTML into Cheerio
		const $ = cheerio.load(html);

		// --- DESCRIPTION EXTRACTION ---
		// Prioritize Open Graph, then standard meta description
		let description =
			$('meta[property="og:description"]').attr('content') ||
			$('meta[name="description"]').attr('content') ||
			null;

		// Clean up whitespace
		if (description) {
			description = description.trim().replace(/\s+/g, ' ');
		}

		// --- FAVICON EXTRACTION ---
		let faviconUrl = null;

		// Common favicon link selectors (prioritize larger or standard formats)
		const linkSelectors = [
			'link[rel="icon"]',
			'link[rel="shortcut icon"]',
			'link[rel="apple-touch-icon"]'
		];

		// 3. Find and resolve the best favicon link
		for (const selector of linkSelectors) {
			// Cheerio's .each is often simpler than .get().sort() for this,
			// but we'll prioritize the first match of common types.
			const $link = $(selector).first();
			const href = $link.attr('href');

			if (href) {
				faviconUrl = resolveUrl(targetUrl, href);
				break;
			}
		}

		// Fallback: Assume the default path and resolve it
		if (!faviconUrl) {
			faviconUrl = resolveUrl(targetUrl, '/favicon.ico');
		}

		// 4. Return the extracted data
		return json({
			title: $('title').text(), // Get the page title
			description: description,
			favicon: faviconUrl
		});
	} catch (error) {
		console.error('Error fetching metadata:', error);
		return json(
			{ error: error.message || 'Failed to process external resource.' },
			{ status: 500 }
		);
	}
}
