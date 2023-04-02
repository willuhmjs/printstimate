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

export async function getPrinters() {
	const raw = import.meta.glob('./printers/*.json', { eager: true });
	const printers: Printer[] = [];
	Object.values(raw).forEach((module) => {
		printers.push({
			name: module.name,
			printWatts: module.printWatts,
			warmupWatts: module.warmUpWatts
		});
	});
	return Promise.all(printers);
}
