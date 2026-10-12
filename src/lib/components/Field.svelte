<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props {
		label: string;
		id: string;
		value?: string;
		multiline?: boolean;
		hint?: string;
		error?: string;
	}

	let {
		label,
		id,
		value = $bindable(''),
		multiline = false,
		hint,
		error,
		...rest
	}: Props & Omit<HTMLInputAttributes, 'id' | 'value'> = $props();

	const describedBy = $derived(error ? `${id}-msg` : hint ? `${id}-hint` : undefined);
</script>

<div class="field" class:invalid={!!error}>
	<label class="label" for={id}>{label}</label>
	{#if multiline}
		<textarea
			class="control"
			{id}
			bind:value
			aria-invalid={error ? 'true' : undefined}
			aria-describedby={describedBy}
			{...rest as object}></textarea>
	{:else}
		<input
			class="control"
			{id}
			bind:value
			aria-invalid={error ? 'true' : undefined}
			aria-describedby={describedBy}
			{...rest}
		/>
	{/if}
	{#if error}
		<p class="msg" id="{id}-msg" role="alert">
			<svg viewBox="0 0 24 24" aria-hidden="true"
				><path d="M12 3 2.5 20h19L12 3z" /><path d="M12 10v5M12 18v.01" /></svg
			>
			<span>Error: {error}</span>
		</p>
	{:else if hint}
		<p class="hint" id="{id}-hint">{hint}</p>
	{/if}
</div>

<style>
	.field {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}
	.label {
		font-size: 13px;
		line-height: 16px;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ink);
	}
	.control {
		width: 100%;
		height: 52px;
		padding: 0 var(--space-4);
		background: var(--surface-raised);
		color: var(--ink);
		border: 1.5px solid var(--line-strong);
		border-radius: var(--radius-md);
		font-family: var(--font-sans);
		font-size: 16px;
		line-height: 26px;
		transition: border-color var(--duration) var(--ease);
	}
	textarea.control {
		height: auto;
		min-height: 132px;
		padding: var(--space-3) var(--space-4);
		resize: vertical;
	}
	.control::placeholder {
		color: var(--ink-muted);
		opacity: 1;
	}
	.control:hover {
		border-color: var(--ink-muted);
	}
	.control:focus-visible {
		outline: 2px solid var(--focus);
		outline-offset: 2px;
		border-color: var(--ink);
	}
	.invalid .control {
		border-color: var(--danger);
	}
	.hint {
		font-size: 12px;
		line-height: 18px;
		color: var(--ink-muted);
	}
	.msg {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-size: 12px;
		line-height: 18px;
		color: var(--danger);
	}
	.msg svg {
		width: 16px;
		height: 16px;
		flex: none;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.5;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
</style>
