export type PrintConditions = {
	amountInGrams: number;
	printTime: number;
	electricityCost: number;
	costOfFilament: number;
	otherCosts: number;
	warmupTime: number;
};

export type Printer = {
	name: string;
	printWatts: number;
	warmupWatts: number;
};

const raw = import.meta.glob('./printers/*.json', { eager: true });

export function getPrinters() {
	const printers: Printer[] = [];
	Object.values(raw).forEach((module) => {
		printers.push({
			name: module.name,
			printWatts: module.printWatts,
			warmupWatts: module.warmupWatts
		});
	});
	return printers;
}
