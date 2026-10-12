<script lang="ts">
	import Button from './Button.svelte';
	import Field from './Field.svelte';
	import { whatsappUrl } from '#lib/whatsapp.js';

	let { whatsappNumber }: { whatsappNumber?: string } = $props();

	let name = $state('');
	let email = $state('');
	let need = $state('');
	let message = $state('');
	let consent = $state(false);
	let submitted = $state(false);
	let notice = $state('');

	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const errors = $derived({
		name: name.trim() ? '' : 'escribe tu nombre.',
		email: emailPattern.test(email.trim())
			? ''
			: 'escribe un correo completo, como nombre@empresa.com.',
		need: need.trim() ? '' : 'cuéntanos qué necesitas, aunque sea en una frase.',
		consent: consent ? '' : 'debes aceptar el tratamiento de datos para enviar el mensaje.'
	});

	const valid = $derived(Object.values(errors).every((e) => !e));

	function onsubmit(event: SubmitEvent) {
		event.preventDefault();
		submitted = true;
		notice = '';
		if (!valid) return;

		const text = [
			`Hola, soy ${name.trim()}.`,
			`Necesito: ${need.trim()}.`,
			message.trim() && `Detalle: ${message.trim()}`,
			`Mi correo: ${email.trim()}`
		]
			.filter(Boolean)
			.join('\n');

		const url = whatsappUrl(whatsappNumber, text);
		if (!url) {
			notice = 'Todavía no hay un canal de contacto configurado.';
			return;
		}
		window.open(url, '_blank', 'noopener');
	}
</script>

<form class="form" {onsubmit} novalidate>
	<Field
		label="Nombre"
		id="nombre"
		bind:value={name}
		autocomplete="name"
		placeholder="Cómo te llamas"
		error={submitted ? errors.name : ''}
	/>
	<Field
		label="Correo"
		id="correo"
		type="email"
		bind:value={email}
		autocomplete="email"
		placeholder="nombre@empresa.com"
		error={submitted ? errors.email : ''}
	/>
	<Field
		label="Qué necesitas"
		id="necesidad"
		bind:value={need}
		placeholder="Una página web, un bot de ventas, una app…"
		error={submitted ? errors.need : ''}
	/>
	<Field
		label="Cuéntanos más"
		id="mensaje"
		multiline
		bind:value={message}
		placeholder="Qué quieres resolver"
		hint="Te respondemos por WhatsApp o correo."
	/>

	<div class="consent" class:invalid={submitted && errors.consent}>
		<label>
			<input
				type="checkbox"
				bind:checked={consent}
				aria-describedby={submitted && errors.consent ? 'consent-msg' : undefined}
			/>
			<span>
				Acepto el tratamiento de mis datos personales para que Makma responda mi solicitud (Ley 1581
				de 2012).
			</span>
		</label>
		<!-- TODO: enlazar la política de tratamiento de datos cuando esté redactada. -->
		{#if submitted && errors.consent}
			<p class="msg" id="consent-msg" role="alert">Error: {errors.consent}</p>
		{/if}
	</div>

	<Button type="submit">Enviar por WhatsApp</Button>
	{#if notice}<p class="msg" role="alert">{notice}</p>{/if}
</form>

<style>
	.form {
		display: grid;
		gap: var(--space-4);
	}
	.consent label {
		display: flex;
		align-items: flex-start;
		gap: var(--space-3);
		font-size: 14px;
		line-height: 22px;
		color: var(--ink-muted);
		cursor: pointer;
	}
	.consent input {
		flex: none;
		width: 20px;
		height: 20px;
		margin: 1px 0 0;
		accent-color: var(--brand);
	}
	.msg {
		margin-top: var(--space-2);
		font-size: 12px;
		line-height: 18px;
		color: var(--danger);
	}
	.form :global(.btn) {
		justify-self: start;
	}
</style>
