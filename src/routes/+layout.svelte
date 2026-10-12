<script lang="ts">
	import '#lib/styles/global.css';
	import favicon from '#lib/assets/favicon.svg';
	import Footer from '#lib/components/Footer.svelte';
	import Navbar from '#lib/components/Navbar.svelte';
	import { quote } from '#lib/quote.js';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<a class="skip sr-only" href="#contenido">Saltar al contenido</a>

<Navbar ctaHref={quote()} />

{@render children()}

<Footer />

<style>
	.skip:focus {
		position: fixed;
		top: var(--space-3);
		left: var(--space-3);
		z-index: 20;
		width: auto;
		height: auto;
		margin: 0;
		padding: var(--space-3) var(--space-4);
		clip-path: none;
		background: var(--brand);
		color: var(--on-brand);
		border-radius: var(--radius-full);
	}
</style>
