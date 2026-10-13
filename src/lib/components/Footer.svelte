<script lang="ts">
	import { nav } from '#lib/content/site.js';

	const year = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="container inner">
		<div class="brand">
			<a class="wordmark" href="/">Makma</a>
			<p class="body-sm muted">Casa de desarrollo tecnológico · Montería, Colombia.</p>
		</div>
		<nav aria-label="Pie de página">
			<ul>
				{#each nav as link (link.href)}
					<li><a href={link.href}>{link.label}</a></li>
				{/each}
			</ul>
		</nav>
	</div>
	<div class="container legal">
		<p class="caption muted">© {year} Makma. Todos los derechos reservados.</p>
	</div>
</footer>

<style>
	.footer {
		margin-top: var(--space-9);
		padding-block: var(--space-8) var(--space-6);
		background: var(--surface-sunken);
		border-top: 1px solid var(--line);
	}
	.inner {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: var(--space-7);
	}
	.brand {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}
	.wordmark {
		font-family: var(--font-serif);
		font-size: 32px;
		line-height: 1;
		letter-spacing: -0.02em;
		color: var(--ink);
		text-decoration: none;
	}
	ul {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3) var(--space-6);
		list-style: none;
		margin: 0;
		padding: 0;
	}
	nav a {
		font-size: 14px;
		line-height: 22px;
		color: var(--ink-muted);
		text-decoration: none;
	}
	nav a:hover {
		color: var(--ink);
	}
	.legal {
		margin-top: var(--space-7);
		padding-top: var(--space-5);
		border-top: 1px solid var(--line);
	}
	.muted {
		color: var(--ink-muted);
	}
</style>
