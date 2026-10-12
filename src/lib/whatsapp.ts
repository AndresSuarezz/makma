/**
 * Enlace de WhatsApp con el mensaje ya escrito.
 * Sin número configurado (PUBLIC_WHATSAPP_NUMBER) devuelve null y la interfaz cae al formulario.
 */
export function whatsappUrl(number: string | undefined, message: string): string | null {
	const digits = (number ?? '').replace(/\D/g, '');
	if (!digits) return null;
	return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
