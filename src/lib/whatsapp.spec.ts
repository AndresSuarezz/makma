import { describe, expect, it } from 'vitest';
import { whatsappUrl } from './whatsapp';

describe('whatsappUrl', () => {
	it('limpia el número y codifica el mensaje', () => {
		expect(whatsappUrl('+57 300 123 4567', 'Hola, quiero cotizar')).toBe(
			'https://wa.me/573001234567?text=Hola%2C%20quiero%20cotizar'
		);
	});

	it('devuelve null si no hay número configurado', () => {
		expect(whatsappUrl(undefined, 'Hola')).toBeNull();
		expect(whatsappUrl('', 'Hola')).toBeNull();
	});
});
