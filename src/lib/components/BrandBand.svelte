<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from './Button.svelte';
	import Eyebrow from './Eyebrow.svelte';

	interface Props {
		eyebrow: string;
		/** Parte del titular antes de la palabra en cursiva. */
		title: string;
		accent: string;
		text: string;
		href: string;
		action: Snippet;
	}

	let { eyebrow, title, accent, text, href, action }: Props = $props();
</script>

<section class="band on-brand-surface" aria-labelledby="band-title">
	<svg class="art" viewBox="0 0 480 560" preserveAspectRatio="xMaxYMid slice" aria-hidden="true">
		<path
			d="M404.4 -12.5C403.9 7.9 396.0 35.0 388.5 52.1C381.1 69.2 369.3 79.4 359.8 90.0C350.2 100.6 340.7 112.5 331.2 115.7C321.7 118.9 311.0 115.5 302.6 109.3C294.2 103.1 286.3 91.6 280.6 78.5C274.9 65.4 270.3 48.1 268.4 30.7C266.5 13.3 268.5 -5.8 269.1 -26.1C269.8 -46.4 268.1 -70.1 272.3 -91.1C276.4 -112.1 284.8 -140.9 294.2 -152.2C303.6 -163.5 318.7 -161.4 328.8 -159.0C338.9 -156.5 347.4 -146.1 354.9 -137.5C362.4 -128.9 367.7 -118.5 373.8 -107.4C379.8 -96.2 386.3 -86.3 391.4 -70.5C396.5 -54.7 404.8 -33.0 404.4 -12.5Z"
		/>
		<path
			d="M520.6 542.9C525.6 557.7 518.5 579.5 506.5 593.5C494.5 607.5 467.7 617.5 448.4 626.8C429.2 636.1 411.4 643.5 391.0 649.5C370.6 655.4 346.3 663.7 326.0 662.5C305.7 661.4 283.9 651.4 269.5 642.3C255.0 633.3 250.3 619.5 239.1 608.3C228.0 597.0 211.4 588.7 202.6 574.8C193.7 560.9 180.8 540.6 186.0 524.9C191.1 509.3 213.1 490.4 233.5 480.9C253.8 471.4 285.1 469.2 307.9 468.1C330.6 467.0 351.0 471.2 370.1 474.3C389.1 477.4 404.2 481.4 422.0 486.5C439.8 491.5 460.5 495.3 476.9 504.7C493.3 514.1 515.7 528.1 520.6 542.9Z"
		/>
		<circle cx="190" cy="190" r="24" />
		<circle cx="380" cy="300" r="62" />
	</svg>
	<div class="body">
		<Eyebrow>{eyebrow}</Eyebrow>
		<h2 class="title" id="band-title">{title} <em>{accent}</em></h2>
		<p class="text">{text}</p>
		<Button variant="ink" {href}>{@render action()}</Button>
	</div>
</section>

<style>
	.band {
		position: relative;
		overflow: hidden;
		background: var(--brand);
		color: var(--on-brand);
		border-radius: var(--radius-lg);
		padding: var(--space-8);
	}
	.art {
		position: absolute;
		top: 0;
		right: 0;
		width: 44%;
		height: 100%;
		fill: var(--on-brand);
		pointer-events: none;
	}
	.body {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-5);
		max-width: 52%;
	}
	.title {
		font-size: 44px;
		line-height: 1.08;
		letter-spacing: -0.015em;
	}
	.title em {
		font-style: italic;
	}
	.text {
		font-size: 16px;
		line-height: 26px;
	}
	@media (max-width: 720px) {
		.band {
			padding: var(--space-7) var(--space-6);
		}
		.art {
			display: none;
		}
		.body {
			max-width: none;
		}
		.title {
			font-size: 36px;
		}
	}
</style>
