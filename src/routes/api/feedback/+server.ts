import { fail, json } from '@sveltejs/kit';
import { supabase_service } from '$lib/supabase-service';

const RATE_LIMIT_MINUTES = 0;

export const POST = async (event) => {
	const ip_address = event.getClientAddress(); // ✅ SvelteKit provides this

	// --- RATE LIMIT LOGIC ---
	const { data: limit_data } = await supabase_service
		.from('feedback_rate_limits')
		.select('last_submitted_at')
		.eq('ip_address', ip_address)
		.single();

	// if (limit_data) {
	// 	const last_submit = new Date(limit_data.last_submitted_at);
	// 	const now = new Date();
	// 	const diff_minutes = (now.getTime() - last_submit.getTime()) / (1000 * 60);

	// 	if (diff_minutes < RATE_LIMIT_MINUTES) {
	// 		return json(
	// 			{ error: 'You are submitting feedback too quickly. Please wait.' },
	// 			{ status: 429 } // 429 = Too Many Requests
	// 		);
	// 	}
	// }

	const { body, author_name, author_email } = await event.request.json();

	if (!body) {
		return json(
			{ error: 'Feedback content cannot be empty.' },
			{ status: 400 } // 400 = Bad Request
		);
	}

	// --- INSERT INTO SUPABASE ---
	const { error: insert_error } = await supabase_service.from('feedback').insert({
		body,
		author_name,
		author_email,
		ip_address
	});

	if (insert_error) {
		console.log(insert_error);
		return json(
			{ error: 'Database error. Please try again later.' },
			{ status: 500 } // 500 = Internal Server Error
		);
	}

	// --- UPDATE RATE LIMIT TABLE ---
	await supabase_service.from('feedback_rate_limits').upsert(
		{
			ip_address,
			last_submitted_at: new Date().toISOString()
		},
		{ onConflict: 'ip_address' }
	);

	return json({ success: true }, { status: 200 });
};
