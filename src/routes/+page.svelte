<script lang="ts">
	import { PUBLIC_WHATSAPP_NUMBER } from '$app/env/public';
	import BrandBand from '#lib/components/BrandBand.svelte';
	import Button from '#lib/components/Button.svelte';
	import ContactForm from '#lib/components/ContactForm.svelte';
	import Eyebrow from '#lib/components/Eyebrow.svelte';
	import MagmaBackground from '#lib/components/MagmaBackground.svelte';
	import PlanCard from '#lib/components/PlanCard.svelte';
	import ServicesList from '#lib/components/ServicesList.svelte';
	import { hero, paymentTerms, plans, recurring, services, steps } from '#lib/content/site.js';
	import { quote } from '#lib/quote.js';
	import { reveal } from '#lib/reveal.js';
</script>

<svelte:head>
	<title>Makma — Casa de desarrollo tecnológico</title>
	<meta
		name="description"
		content="Sitios web, tiendas en línea, sistemas a la medida, agentes de automatización y aplicaciones móviles para negocios e instituciones en Montería y la región."
	/>
	<meta property="og:title" content="Makma — Casa de desarrollo tecnológico" />
	<meta property="og:description" content="Software que trabaja mientras tu negocio crece." />
	<meta property="og:locale" content="es_CO" />
</svelte:head>

<main id="contenido">
	<section class="hero" id="inicio" aria-labelledby="hero-title">
		<MagmaBackground />
		<div class="container">
			<div class="hero-copy glass reveal" {@attach reveal()}>
				<Eyebrow>{hero.eyebrow}</Eyebrow>
				<h1 class="display-xl" id="hero-title">
					{hero.titleStart} <span class="accent-italic">{hero.titleAccent}</span>
					{hero.titleEnd}
				</h1>
				<p class="body-lg lead">{hero.lead}</p>
				<div class="actions">
					<Button href={quote()}>Cotizar por WhatsApp</Button>
					<Button href="#servicios" variant="secondary">Ver servicios</Button>
				</div>
			</div>
		</div>
	</section>

	<section class="section" id="servicios" aria-labelledby="servicios-title">
		<div class="container stack">
			<header class="section-head reveal" {@attach reveal()}>
				<Eyebrow>Servicios</Eyebrow>
				<h2 class="display-lg" id="servicios-title">Lo que construimos</h2>
			</header>
			<ServicesList {services} />
		</div>
	</section>

	<section class="section" id="proceso" aria-labelledby="proceso-title">
		<div class="container stack">
			<header class="section-head reveal" {@attach reveal()}>
				<Eyebrow>Cómo trabajamos</Eyebrow>
				<h2 class="display-lg" id="proceso-title">De la idea al sistema funcionando</h2>
			</header>
			<ol class="steps">
				{#each steps as step, i (step.title)}
					<li class="reveal" {@attach reveal(i * 100)}>
						<span class="step-index">{String(i + 1).padStart(2, '0')}</span>
						<h3 class="heading-sm">{step.title}</h3>
						<p class="body-sm muted">{step.text}</p>
					</li>
				{/each}
			</ol>
			<p class="payment reveal" {@attach reveal()}>
				<strong>Forma de pago de la instalación:</strong>
				{paymentTerms}
			</p>
		</div>
	</section>

	<section class="section" id="planes" aria-labelledby="planes-title">
		<div class="container stack">
			<header class="section-head reveal" {@attach reveal()}>
				<Eyebrow>Planes y precios</Eyebrow>
				<h2 class="display-lg" id="planes-title">Precios claros desde el primer día</h2>
				<p class="body-lg muted measure">
					Valores de instalación en pesos colombianos. El hosting, el mantenimiento y los bots se
					cobran aparte, como suscripción.
				</p>
			</header>
			<div class="grid plans">
				{#each plans as plan, i (plan.name)}
					<div class="reveal-cell reveal" {@attach reveal((i % 3) * 100)}>
						<PlanCard {plan} href={quote(plan.name)} />
					</div>
				{/each}
			</div>
			<div class="recurring reveal" {@attach reveal()}>
				<h3 class="heading">Cobros recurrentes</h3>
				<dl>
					{#each recurring as item (item.name)}
						<div>
							<dt class="heading-sm">{item.name}</dt>
							<dd class="body-sm muted">{item.text}</dd>
						</div>
					{/each}
				</dl>
			</div>
		</div>
	</section>

	<!-- Sección "Proyectos": no se publica hasta tener casos reales (ver docs/diseno/sitio.md). -->

	<section class="section" id="contacto" aria-labelledby="contacto-title">
		<div class="container stack">
			<div class="contact">
				<header class="section-head reveal" {@attach reveal()}>
					<Eyebrow>Contacto</Eyebrow>
					<h2 class="display-lg" id="contacto-title">Cuéntanos qué necesitas</h2>
					<p class="body-lg muted measure">
						Te respondemos con una propuesta y un valor. Sin compromiso.
					</p>
				</header>
				<div class="reveal" {@attach reveal(120)}>
					<ContactForm whatsappNumber={PUBLIC_WHATSAPP_NUMBER} />
				</div>
			</div>
			<div class="reveal" {@attach reveal()}>
				<BrandBand
					eyebrow="Primer paso"
					title="Cuéntanos qué necesitas y te cotizamos"
					accent="sin compromiso"
					text="Respondemos por WhatsApp con una propuesta y un valor."
					href={quote()}
				>
					{#snippet action()}Cotizar por WhatsApp{/snippet}
				</BrandBand>
			</div>
		</div>
	</section>
</main>

<style>
	.muted {
		color: var(--ink-muted);
	}
	.measure {
		max-width: var(--measure);
	}
	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--space-7);
	}
	.section-head {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	/* Hero: fondo de magma animado + panel de vidrio con el texto */
	.hero {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		display: flex;
		align-items: center;
		min-height: min(88svh, 860px);
		padding-block: var(--space-9);
		border-bottom: 1px solid var(--line);
	}
	.hero-copy {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-5);
		max-width: 780px;
		padding: var(--space-7);
	}
	.lead {
		max-width: var(--measure);
		color: var(--ink-muted);
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
		margin-top: var(--space-3);
	}

	/* Grillas */
	.grid {
		display: grid;
		gap: var(--space-4);
	}
	.plans {
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	}

	/* Proceso */
	.steps {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: var(--space-6);
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.steps li {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		padding-top: var(--space-5);
		border-top: 1px solid var(--line-strong);
	}
	.step-index {
		font-family: var(--font-serif);
		font-size: 24px;
		line-height: 1.25;
		color: var(--brand-text);
	}
	.payment {
		max-width: var(--measure);
		color: var(--ink-muted);
	}
	.payment strong {
		color: var(--ink);
		font-weight: 500;
	}

	/* Cobros recurrentes */
	.recurring {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
		gap: var(--space-6);
		padding-top: var(--space-6);
		border-top: 1px solid var(--line);
	}
	.recurring dl {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: var(--space-6);
		margin: 0;
	}
	.recurring dd {
		margin: var(--space-2) 0 0;
	}

	/* Contacto */
	.contact {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: var(--space-8);
	}

	@media (max-width: 960px) {
		.recurring {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 640px) {
		.hero {
			padding-block: var(--space-8);
		}
		.hero-copy {
			padding: var(--space-6) var(--space-5);
		}
		.section {
			padding-block: var(--space-8);
		}
	}
</style>
