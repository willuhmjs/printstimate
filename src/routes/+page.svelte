<script lang="ts">
	import { estimateCost, formatCost } from '../lib/calculator';
	import type { PrintConditions, Printer } from '../lib/printers';
	import { getPrinters } from '../lib/printers';
	
	import Box from '$lib/Box.svelte';

	let fixedTo = 2;

	let printTimeMinutes: number = 4;
	let printTimeHours: number = 10;

	$: conditions = {
		amountInGrams: 4,
		printTime: printTimeHours + (printTimeMinutes/60),
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
	<Box title="Print Info">
		<div>
			<label>Print Weight</label>
			<input type="number" bind:value={conditions.amountInGrams} />
		</div>
		<div>
			<label>Print Time</label>
			<input type="number" bind:value={printTimeHours} />
			<input type="number" bind:value={printTimeMinutes} />
		</div>
		<div>
			<label>Warm Up Time</label>
			<input type="number" bind:value={conditions.warmupTime} />
		</div>
		<div>
			<label>Electricity Cost</label>
			<input type="number" bind:value={conditions.electricityCost} />
		</div>
		<div>
			<label>Cost of Filament</label>
			<input type="number" bind:value={conditions.costOfFilament} />
		</div>
		<div>
			<label>Other Costs</label>
			<input type="number" bind:value={conditions.otherCosts} />
		</div>
	</Box>
	{estimateCost(conditions, printer)}
</main>