<script lang="ts">
	import { estimateCost, formatCost } from '../lib/calculator';
	import type { PrintConditions, Printer } from '../lib/printers';
	import { getPrinters } from '../lib/printers';

	let fixedTo = 2;

	let conditions: PrintConditions = {
		amountInGrams: 4,
		printTime: 0.36,
		warmupTime: 5,
		electricityCost: 0.11,
		costOfFilament: 25,
		otherCosts: 0
	};

	let printer: Printer = {
		name: 'Ender 3',
		printWatts: 40,
		warmupWatts: 10
	};
</script>

<main>
	...
</main>
<style>
	main {
		max-width: 600px;
		margin: 0 auto;
	}
</style>