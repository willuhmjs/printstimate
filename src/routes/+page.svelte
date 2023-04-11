<script lang="ts">
	import { estimateCost, formatCost } from '../lib/calculator';
	import type { PrintConditions, Printer } from '../lib/printers';
	import { getPrinters } from '../lib/printers';
	
	import Box from '$lib/Box.svelte';

	let fixedTo = 2;

	let printTimeMinutes: number = 0;
	let printTimeHours: number = 10;

	let conditions = {
		amountInGrams: 4,
		printTime: 0,
		warmupTime: 5,
		electricityCost: 0.11,
		costOfFilament: 25,
		otherCosts: 0
	};

	$: conditions = {
        ...conditions,
        printTime: printTimeHours + (printTimeMinutes/60)
	}

	const printers = getPrinters();
	// move the object in the array with the name value "Custom" to the front
	printers.sort((a, b) => {
		if (a.name === "Custom") {
			return -1;
		} else if (b.name === "Custom") {
			return 1;
		} else {
			return 0;
		}
	});
	let printer: Printer = printers[0];
</script>

<main>
	{estimateCost(conditions, printer)}
	<Box title="Printer">
		<div class="inputItem">
			<label for="printer">Printer</label>
			<br>
			<div class="inputContent">
				<select id="printer" bind:value={printer}>	
					{#each printers as printer}
						<option value={printer}>{printer.name}</option>
					{/each}
				</select>
				<input type="number" disabled={printer.name !== "Custom"} bind:value={printer.printWatts}/>
				<input type="number" disabled={printer.name !== "Custom"} bind:value={printer.warmupWatts} />
			</div>
	</Box>
		<Box title="Print Info">
		<div class="inputItem">
			<label for="amountInGrams">Print Weight (g)</label>
			<br>
			<div class="inputContent">
				<input placeholder="Grams" id="amountInGrams" type="number" bind:value={conditions.amountInGrams} />
			</div>
		</div>
		<div class="inputItem">
			<label for="printTime">Print Time (hr, min)</label>
			<br>
			<div class="inputContent">
				<input placeholder="Hours" class="printTime" type="number" bind:value={printTimeHours} />
				<input placeholder="Minutes" class="printTime" type="number" bind:value={printTimeMinutes} />
			</div>
		</div>
		<div class="inputItem">
			<label for="warmupTime">Warm Up Time (min)</label>
			<br>
			<div class="inputContent">
				<input placeholder="Minutes" id="warmupTime" type="number" bind:value={conditions.warmupTime} />
			</div>
		</div>
		<div class="inputItem">
			<label for="electricityCost">Electricity Cost ($/kWH)</label>
			<br>
			<div class="inputContent">
				<input placeholder="Dollars per Kilowatt-hour" id="electricityCost" type="number" bind:value={conditions.electricityCost} />
			</div>
		</div>
		<div class="inputItem">
			<label for="costOfFilament">Cost of Filament ($/kg)</label>
			<br>
			<div class="inputContent">
				<input placeholder="Dollars per Kilogram" id="costOfFilament" type="number" bind:value={conditions.costOfFilament} />
			</div>
		</div>
		<div class="inputItem">
			<label for="otherCosts">Other Costs ($)</label>
			<br>
			<div class="inputContent">
				<input placeholder="Dollars" id="otherCosts" type="number" bind:value={conditions.otherCosts} />
			</div>
		</div>
	</Box>
	
	
</main>
<style>
	.inputContent {
		display: flex;
		flex-direction: row;
	}

	.inputContent input[type=number] {
		flex: 1;
		padding: 1ch;
		border: 1px solid #ccc;
		border-radius: 4px;
		margin-top: 0.6em;
	}

	.inputContent select {
		flex: 1;
		padding: 1ch;
		border: 1px solid #ccc;
		border-radius: 4px;
		margin-top: 0.6em;
	}

	.inputContent input:not(:first-child) {
		margin-left: 1ch;
	}

	.inputItem {
		margin-bottom: 1em;
	}

</style>