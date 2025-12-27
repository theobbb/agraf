import { redirect } from '@sveltejs/kit';

export async function load({ parent }) {
	const data = await parent();
	redirect(307, '/inspiratheque/' + data.bookmarks[0].id);
}
