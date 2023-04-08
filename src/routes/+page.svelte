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
			<label for="amountInGrams">Print Weight</label>
			<input id="amountInGrams" type="number" bind:value={conditions.amountInGrams} />
		</div>
		<div>
			<label for="printTime">Print Time</label>
			<input class="printTime" type="number" bind:value={printTimeHours} />
			<input class="printTime" type="number" bind:value={printTimeMinutes} />
		</div>
		<div>
			<label for="warmupTime">Warm Up Time</label>
			<input id="warmupTime" type="number" bind:value={conditions.warmupTime} />
		</div>
		<div>
			<label for="electricityCost">Electricity Cost</label>
			<input id="electricityCost" type="number" bind:value={conditions.electricityCost} />
		</div>
		<div>
			<label for="costOfFilament">Cost of Filament</label>
			<input id="costOfFilament" type="number" bind:value={conditions.costOfFilament} />
		</div>
		<div>
			<label for="otherCosts">Other Costs</label>
			<input id="otherCosts" type="number" bind:value={conditions.otherCosts} />
		</div>
	</Box>
	{estimateCost(conditions, printer)}
</main>