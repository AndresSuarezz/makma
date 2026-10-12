import type { Attachment } from 'svelte/attachments';

/**
 * Aparición suave al entrar en pantalla (una sola vez).
 * Úsalo sobre un elemento con la clase `reveal`: `<div class="reveal" {@attach reveal(80)}>`.
 * El estado oculto solo existe con JavaScript (`html.js`, ver app.html) y se anula con
 * `prefers-reduced-motion`, así que sin JS o con movimiento reducido el contenido siempre se ve.
 *
 * @param delay retraso en ms para escalonar elementos hermanos
 */
export function reveal(delay = 0): Attachment<HTMLElement> {
	return (element) => {
		if (typeof IntersectionObserver === 'undefined') {
			element.classList.add('in');
			return;
		}

		element.style.setProperty('--reveal-delay', `${delay}ms`);

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					element.classList.add('in');
					observer.disconnect();
				}
			},
			{ rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
		);
		observer.observe(element);

		return () => observer.disconnect();
	};
}
