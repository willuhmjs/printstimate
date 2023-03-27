/**
 * Estimates the cost of a 3D print based on the amount of filament used, the time of the print, and the cost of electricity.
 * @param {number} amountInGrams amount of filament used in grams (g)
 * @param {number} printTime time of print in hours (hr)
 * @param {number} costOfFilament cost of filament per kilogram (dollars)
 * @param {number} printWatts amount of electricity used during printing (watts)
 * @param {number} electricityCost cost of electricity per kilowatt-hour (dollars)
 * @param {number} warmUpWatts amount of electricity used during warm-up (watts)
 * @param {number} warmUpTime time of warm-up in minutes (min)
 * @returns {number} total cost of print (dollars)
 */

// TODO use printer type from src/lib/printers.ts
export function estimateCost(
	amountInGrams: number,
	printTime: number,
	costOfFilament: number,
	printWatts: number,
	electricityCost: number,
	warmUpWatts: number,
	warmUpTime: number
): number {
	const filamentCost = (amountInGrams / 1000) * costOfFilament; // filament cost in dollars
	const initialWarmUpCost = (warmUpWatts / 1000) * electricityCost * (warmUpTime / 60); // warm-up cost in dollars
	const electricityCostPerHour = (printWatts / 1000) * electricityCost; // electricity cost per hour in dollars
	const totalPrintTimeCost = electricityCostPerHour * printTime; // total electricity cost for print time in dollars
	const totalCost = filamentCost + totalPrintTimeCost + initialWarmUpCost;
	return totalCost;
}

export function formatCost(cost: number): string {
	return `$${cost.toFixed(2)}`;
}