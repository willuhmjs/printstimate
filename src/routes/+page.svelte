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
		<div class="inputItem">
			<label for="amountInGrams">Print Weight</label>
			<br>
			<div class="inputContent">
				<input id="amountInGrams" type="number" bind:value={conditions.amountInGrams} />
			</div>
		</div>
		<div class="inputItem">
			<label for="printTime">Print Time</label>
			<br>
			<div class="inputContent">
				<input class="printTime" type="number" bind:value={printTimeHours} />
				<input class="printTime" type="number" bind:value={printTimeMinutes} />
			</div>
		</div>
		<div class="inputItem">
			<label for="warmupTime">Warm Up Time</label>
			<br>
			<div class="inputContent">
				<input id="warmupTime" type="number" bind:value={conditions.warmupTime} />
			</div>
		</div>
		<div class="inputItem">
			<label for="electricityCost">Electricity Cost</label>
			<br>
			<div class="inputContent">
				<input id="electricityCost" type="number" bind:value={conditions.electricityCost} />
			</div>
		</div>
		<div class="inputItem">
			<label for="costOfFilament">Cost of Filament</label>
			<br>
			<div class="inputContent">
				<input id="costOfFilament" type="number" bind:value={conditions.costOfFilament} />
			</div>
		</div>
		<div class="inputItem">
			<label for="otherCosts">Other Costs</label>
			<br>
			<div class="inputContent">
				<input id="otherCosts" type="number" bind:value={conditions.otherCosts} />
			</div>
		</div>
	</Box>
	{estimateCost(conditions, printer)}
</main>
<style>
	.inputContent {
		display: flex;
		flex-direction: row;
	}

	.inputContent input {
		flex: 1;
		padding: 1ch;
		border: 1px solid #ccc;
		border-radius: 4px;
		margin-top: 0.6em;
	}

	.inputContent input:nth-child(2) {
		margin-left: 1ch;
	}

	.inputItem {
		margin-bottom: 1em;
	}

</style>