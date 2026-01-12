import { browser } from '$app/environment';

export type LoginState = {
	user: string | null;
	dialog_open: boolean;
	resolve: (value: boolean) => void;
};

export const auth = $state<LoginState>({
	user: null,
	dialog_open: false,
	resolve: () => {}
});

export async function login(): Promise<boolean> {
	return new Promise<boolean>((resolve) => {
		auth.dialog_open = true;
		auth.resolve = resolve;
	});
}

export async function get_user() {
	if (!browser) return;
	const stored = localStorage.getItem('user');
	if (stored) auth.user = stored;
}

export async function set_user(user: string) {
	if (!browser) return;
	auth.user = user;
	localStorage.setItem('user', user);
}
