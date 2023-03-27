export type PrintConditions = {
    amountInGrams: number;
    printTime: number;
	electricityCost: number;
    costOfFilament: number;
}

export type Printer = {
    name: string;
    printWatts: number;
    warmUpWatts: number;
    warmUpTime: number;
};

export const printers: Printer[] = [
    {
        name: 'Ender 3',
        printWatts: 40,
        warmUpWatts: 40,
        warmUpTime: 5
    }];