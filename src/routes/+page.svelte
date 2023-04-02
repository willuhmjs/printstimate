<script lang="ts">
	import { estimateCost, formatCost } from '../lib/calculator';
	import type { PrintConditions, Printer } from '../lib/printers';
	import { getPrinters } from '../lib/printers';

	let conditions: PrintConditions = {
		amountInGrams: 4,
		printTime: 22 / 60,
		electricityCost: 0.11,
		costOfFilament: 25,
		otherCosts: 0
	};
</script>

<div class="wrapper">
	{#await getPrinters()}
		<div>loading...</div>
	{:then printers}
		{#each printers as printer}
			<div>
				{printer.name}
				{formatCost(estimateCost(conditions, printer))}
			</div>
		{/each}
	{/await}
	<!-- has two inputs side by side for the amount in grams and print cost -->
	<!-- accordion menu for other conditions (electricity cost and cost of filament) -->
	<!-- accordion menu for choosing a printer. has a search bar -->
</div>

<style>
	.wrapper {
		margin: auto;
		max-width: 600px;
		border: 1px solid #ccc;
	}
</style>
