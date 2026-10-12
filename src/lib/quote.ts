import { PUBLIC_WHATSAPP_NUMBER } from '$app/env/public';
import { whatsappUrl } from './whatsapp.js';

/** Enlace de WhatsApp con el servicio ya escrito; sin número configurado cae al formulario de contacto. */
export function quote(subject?: string): string {
	const message = subject
		? `Hola, quiero cotizar: ${subject}.`
		: 'Hola, quiero cotizar un proyecto con Makma.';
	return whatsappUrl(PUBLIC_WHATSAPP_NUMBER, message) ?? '/#contacto';
}
