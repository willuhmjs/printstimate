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
	<section>
		<h1>Cost Estimator</h1>
		<p>
			Enter information regarding your printer and what you are printing. The cost estimator will
			then calculate the cost of printing your object.
		</p>

		<h3>Estimated Cost</h3>
		<p>
			{formatCost(estimateCost(conditions, printer), fixedTo)}
		</p>
		<!-- bind input to fixedTo value  btween 2 and 10 with a range -->
		<label for="fixed-to">Fixed to {fixedTo} digits</label>
		<input id="fixed-to" type="range" min="2" max="20" bind:value={fixedTo} />
	</section>

	<section>
		<h3>Print Conditions</h3>
		<div>
			<div>
				<label for="amount-in-grams">Amount in grams</label>
				<br />
				<input id="amount-in-grams" type="number" bind:value={conditions.amountInGrams} />
			</div>

			<div>
				<label for="print-time">Print Time</label>
				<br />
				<input id="print-time" type="number" bind:value={conditions.printTime} />
			</div>
			<div>
				<label for="warm-up-time">Warm Up Time</label>
				<br />
				<input id="warm-up-time" type="number" bind:value={conditions.warmupTime} />
			</div>

			<div>
				<label for="electricity-cost">Electricity Cost</label>
				<br />
				<input id="electricity-cost" type="number" bind:value={conditions.electricityCost} />
			</div>
			<div>
				<label for="cost-of-filament">Cost of Filament</label>
				<br />
				<input id="cost-of-filament" type="number" bind:value={conditions.costOfFilament} />
			</div>

			<div>
				<label for="other-costs">Other Costs</label>
				<br />
				<input id="other-costs" type="number" bind:value={conditions.otherCosts} />
			</div>
		</div>
	</section>
	<section class="printerInformation">
		<div>
			<h3>Printer Information</h3>
			<div>
				<label for="name">Name</label>
				<br />
				<input id="name" type="text" bind:value={printer.name} />
			</div>
			<div>
				<label for="print-watts">Print Watts</label>
				<br />
				<input id="print-watts" type="number" bind:value={printer.printWatts} />
			</div>

			<div>
				<label for="warmup-watts">Warmup Watts</label>
				<br />
				<input id="warmup-watts" type="number" bind:value={printer.warmupWatts} />
			</div>
		</div>
		<div>
			<label for="search">Search</label>
			<br />
			<input id="search" type="text" />
		</div>
	</section>
</main>

<style>
	main {
		margin: auto;
		max-width: 600px;
	}

	* {
		box-sizing: border-box;
		font-family: sans-serif;
	}

	section {
		border: 1px solid #ccc;
		border-radius: 10px;
		padding: 1rem;
		margin: 1rem 0;
	}

	.printerInformation {
		display: flex;
		justify-content: space-between;
	}

	input {
		padding: 1ch;
		border: 1px solid #ccc;
		border-radius: 5px;
		width: 100%;
	}

	section div div {
		margin-bottom: 1rem;
	}

	section div div * {
		margin: 3px 0;
	}

	h1,
	h2,
	h3 {
		margin: 0;
		margin-bottom: 1rem;
	}
</style>
