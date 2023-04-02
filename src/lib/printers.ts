export type PrintConditions = {
	amountInGrams: number;
	printTime: number;
	electricityCost: number;
	costOfFilament: number;
	otherCosts: number;
};

export type Printer = {
	name: string;
	printWatts: number;
	warmUpWatts: number;
	warmUpTime: number;
};

export async function getPrinters() {
	const raw = import.meta.glob('./printers/*.json', { eager: true });
	const printers: Printer[] = [];
	Object.values(raw).forEach((module) => {
		printers.push({
			name: module.name,
			printWatts: module.printWatts,
			warmUpWatts: module.warmUpWatts,
			warmUpTime: module.warmUpTime
		});
	});
	return Promise.all(printers);
}
