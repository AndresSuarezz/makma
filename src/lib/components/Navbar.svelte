<script lang="ts">
	import { onMount } from 'svelte';
	import Button from './Button.svelte';
	import { nav } from '#lib/content/site.js';
	import { theme, initTheme, toggleTheme } from '#lib/theme.svelte.js';

	let { ctaHref }: { ctaHref: string } = $props();

	let open = $state(false);
	let active = $state('');

	onMount(() => {
		initTheme();

		// Marca como activa la sección que está en pantalla
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) active = `/#${entry.target.id}`;
				}
			},
			{ rootMargin: '-45% 0px -50% 0px' }
		);
		for (const link of nav) {
			const el = document.getElementById(link.href.slice(2));
			if (el) observer.observe(el);
		}
		return () => observer.disconnect();
	});

	function close() {
		open = false;
	}
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && close()} />

<header class="nav">
	<a class="wordmark" href="/" onclick={close}>Makma</a>

	<nav aria-label="Principal" class="links-wrap">
		<ul class="links">
			{#each nav as link (link.href)}
				<li>
					<a href={link.href} aria-current={active === link.href ? 'true' : undefined}>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="actions">
		<button
			class="icon-btn"
			type="button"
			onclick={toggleTheme}
			aria-label={theme.current === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
		>
			<svg viewBox="0 0 24 24" aria-hidden="true">
				{#if theme.current === 'dark'}
					<circle cx="12" cy="12" r="4" />
					<path
						d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
					/>
				{:else}
					<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" />
				{/if}
			</svg>
		</button>
		<span class="cta"><Button href={ctaHref} size="sm">Cotizar</Button></span>
		<button
			class="icon-btn menu"
			type="button"
			aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
			aria-expanded={open}
			aria-controls="menu-movil"
			onclick={() => (open = !open)}
		>
			<svg viewBox="0 0 24 24" aria-hidden="true">
				{#if open}
					<path d="M6 6l12 12M18 6 6 18" />
				{:else}
					<path d="M4 7h16M4 12h16M4 17h16" />
				{/if}
			</svg>
		</button>
	</div>
</header>

{#if open}
	<div class="panel" id="menu-movil">
		<ul>
			{#each nav as link (link.href)}
				<li><a href={link.href} onclick={close}>{link.label}</a></li>
			{/each}
		</ul>
		<Button href={ctaHref} onclick={close}>Cotizar por WhatsApp</Button>
	</div>
{/if}

<style>
	.nav {
		position: sticky;
		top: 0;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-5);
		height: var(--nav-height);
		padding: 0 var(--gutter);
		/* Vidrio: deja ver el magma del hero detrás al hacer scroll */
		background: var(--glass-bg);
		border-bottom: 1px solid var(--glass-border);
		-webkit-backdrop-filter: blur(16px) saturate(1.35);
		backdrop-filter: blur(16px) saturate(1.35);
	}
	@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
		.nav {
			background: var(--surface);
		}
	}
	.wordmark {
		font-family: var(--font-serif);
		font-size: 32px;
		line-height: 1;
		letter-spacing: -0.02em;
		color: var(--ink);
		text-decoration: none;
	}
	.wordmark:hover {
		color: var(--ink);
	}
	.links {
		display: flex;
		gap: var(--space-6);
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.links a {
		display: inline-block;
		padding: var(--space-2) 0;
		font-size: 15px;
		line-height: 20px;
		font-weight: 500;
		letter-spacing: 0.01em;
		color: var(--ink-muted);
		text-decoration: none;
		border-bottom: 1.5px solid transparent;
		transition: color var(--duration) var(--ease);
	}
	.links a:hover {
		color: var(--ink);
	}
	.links a[aria-current='true'] {
		color: var(--ink);
		border-bottom-color: var(--brand-text);
	}
	.actions {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}
	.icon-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		padding: 0;
		background: transparent;
		color: var(--ink);
		border: 1.5px solid var(--line-strong);
		border-radius: var(--radius-full);
		cursor: pointer;
		transition: border-color var(--duration) var(--ease);
	}
	.icon-btn:hover {
		border-color: var(--ink);
	}
	.icon-btn svg {
		width: 20px;
		height: 20px;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.5;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	.menu {
		display: none;
	}
	.panel {
		position: fixed;
		inset: var(--nav-height) 0 0;
		z-index: 9;
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
		padding: var(--space-7) var(--gutter);
		background: var(--surface);
		overflow-y: auto;
	}
	.panel ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.panel li a {
		display: block;
		padding: var(--space-4) 0;
		border-bottom: 1px solid var(--line);
		font-family: var(--font-serif);
		font-size: 32px;
		line-height: 1.15;
		color: var(--ink);
		text-decoration: none;
	}
	@media (max-width: 720px) {
		.links-wrap {
			display: none;
		}
		.menu {
			display: inline-flex;
		}
		.nav {
			gap: var(--space-3);
		}
	}
	@media (min-width: 721px) {
		.panel {
			display: none;
		}
	}
</style>
