export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'makma-theme';

/** Tema actual. Oscuro por defecto; el script de app.html lo aplica antes de pintar. */
export const theme = $state<{ current: Theme }>({ current: 'dark' });

/** Sincroniza el estado con lo que dejó el script de app.html en <html data-theme>. */
export function initTheme() {
	theme.current = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export function toggleTheme() {
	theme.current = theme.current === 'dark' ? 'light' : 'dark';
	document.documentElement.dataset.theme = theme.current;
	try {
		localStorage.setItem(STORAGE_KEY, theme.current);
	} catch {
		// Almacenamiento bloqueado: el tema solo dura la sesión.
	}
}
