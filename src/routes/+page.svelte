<script lang="ts">
	import { estimateCost, formatCost } from '../lib/calculator';
	import type { PrintConditions, Printer } from '../lib/printers';
	import { getPrinters } from '../lib/printers';

	let fixedTo = 2;

	let conditions: PrintConditions = {
		amountInGrams: 4,
		printTime: .36,
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
	<section>
		<h1>Cost Estimator</h1>
		<p>
			Enter the amount of filament you want to print, the time it will take to
			print, and the cost of electricity and filament. The cost estimator will
			then calculate the cost of printing your object.
		</p>
	</section>
	
	<details open>
		<summary>Estimated Cost</summary>
		<p>
			{formatCost(estimateCost(conditions, printer), fixedTo)}
		</p>
		<!-- bind input to fixedTo value  btween 2 and 10 with a range -->
		<label for="fixed-to">Fixed to {fixedTo} digits</label>
		<input
			id="fixed-to"
			type="range"
			min="2"
			max="20"
			bind:value={fixedTo}
		/>
		
	</details>

	<details open>
		<summary>Print Conditions</summary>
		<div>
			<label for="amount-in-grams">Amount in grams</label>
			<input
				id="amount-in-grams"
				type="number"
				bind:value={conditions.amountInGrams}
			/>

			<label for="print-time">Print Time</label>
			<input id="print-time" type="number" bind:value={conditions.printTime} />

			<label for="warm-up-time">Warm Up Time</label>
			<input
				id="warm-up-time"
				type="number"
				bind:value={conditions.warmupTime}
			/>

			<label for="electricity-cost">Electricity Cost</label>
			<input
				id="electricity-cost"
				type="number"
				bind:value={conditions.electricityCost}
			/>

			<label for="cost-of-filament">Cost of Filament</label>
			<input
				id="cost-of-filament"
				type="number"
				bind:value={conditions.costOfFilament}
			/>

			<label for="other-costs">Other Costs</label>
			<input id="other-costs" type="number" bind:value={conditions.otherCosts} />
		</div>
	</details>
	<details open>
		<summary>Printer Information</summary>
		<div>
			<!-- name, printWatts, warmupWatts inputs -->
			<label for="name">Name</label>
			<input id="name" type="text" bind:value={printer.name} />

			<label for="print-watts">Print Watts</label>
			<input id="print-watts" type="number" bind:value={printer.printWatts} />

			<label for="warmup-watts">Warmup Watts</label>
			<input
				id="warmup-watts"
				type="number"
				bind:value={printer.warmupWatts}
			/>

			<!-- search bar -->
			<label for="search">Search</label>
			<input id="search" type="text" />

		</div>
	</details>
</main>

<style>
	main {
		margin: auto;
		max-width: 600px;
		border: 1px solid #ccc;
	}
</style>
