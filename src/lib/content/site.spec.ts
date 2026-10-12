import { describe, expect, it } from 'vitest';
import { formatCop, plans } from './site';

describe('formatCop', () => {
	it('usa punto de miles y signo de pesos sin decimales', () => {
		expect(formatCop(350_000)).toBe('$350.000');
		expect(formatCop(1_000_000)).toBe('$1.000.000');
	});
});

describe('plans', () => {
	it('no destaca ningún plan sin un dato real que lo respalde', () => {
		expect(plans.some((plan) => plan.featured)).toBe(false);
	});
});
