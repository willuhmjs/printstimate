import { describe, it, expect } from 'vitest';
import { estimateCost, formatCost } from './lib/calculator';
import type { PrintConditions } from './lib/printers';
import KP3S from './lib/printers/Kingroon KP3S.json';

const genericConditions: PrintConditions = {
	amountInGrams: 4,
	printTime: 0,
	warmupTime: 5,
	electricityCost: 0.11,
	costOfFilament: 25,
	otherCosts: 0
};

describe('basic calculator test', () => {
	const cost = estimateCost(genericConditions, KP3S);

	it('estimates the cost of a Kingroon KP3S print', () => {
		expect(cost).toBe(0.10275000000000001);
	})

	it('rounds the cost to 2 decimal places', () => {
		expect(formatCost(cost, 2)).toBe('$0.10');
	});

	it('rounds the cost to 3 decimal places', () => {
		expect(formatCost(cost, 3)).toBe('$0.103');
	});

	it('rounds the cost to 4 decimal places', () => {
		expect(formatCost(cost, 4)).toBe('$0.1028');
	});

	it('rounds the cost to 5 decimal places', () => {
		expect(formatCost(cost, 5)).toBe('$0.10275');
	});
});
