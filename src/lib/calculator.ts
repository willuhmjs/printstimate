import type { PrintConditions, Printer } from './printers';

/**
 * Estimates the cost of a 3D print based on the amount of filament used, the time of the print, and the cost of electricity.
 * @param {PrintConditions} conditions print conditions
 * @param {Printer} printer printer details
 * @returns {number} total cost of print (dollars)
 */

export function estimateCost(conditions: PrintConditions, printer: Printer): number {
	const filamentCost = (conditions.amountInGrams / 1000) * conditions.costOfFilament; // filament cost in dollars
	const initialWarmUpCost =
		(printer.warmupWatts / 1000) * conditions.electricityCost * (conditions.warmupTime / 60); // warm-up cost in dollars
	const electricityCostPerHour = (printer.printWatts / 1000) * conditions.electricityCost; // electricity cost per hour in dollars
	const totalPrintTimeCost = electricityCostPerHour * conditions.printTime; // total electricity cost for print time in dollars
	const totalCost = filamentCost + totalPrintTimeCost + initialWarmUpCost + conditions.otherCosts; // total cost in dollars
	return totalCost;
}

export function formatCost(cost: number): string {
	return `$${cost.toFixed(2)}`;
}
