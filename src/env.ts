import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	/** Número de WhatsApp con indicativo de país y sin símbolos, p. ej. 573001234567. */
	PUBLIC_WHATSAPP_NUMBER: {
		public: true,
		description:
			'Número de WhatsApp de Makma. Sin él, los botones "Cotizar por WhatsApp" llevan al formulario.',
		schema: (value) => value || undefined
	}
});
