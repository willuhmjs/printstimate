<script lang="ts">
	import { estimateCost, formatCost } from '../lib/calculator';
	import type { PrintConditions, Printer } from '../lib/printers';
	import { getPrinters } from '../lib/printers';

	import Box from '$lib/Box.svelte';

	let toFixed = 2;

	let printTimeMinutes: number = 30;
	let printTimeHours: number = 1;

	let conditions: PrintConditions = {
		amountInGrams: 15,
		printTime: 0,
		warmupTime: 5,
		electricityCost: 0.11,
		costOfFilament: 25,
		otherCosts: 0
	};

	$: conditions = {
		...conditions,
		printTime: printTimeHours + printTimeMinutes / 60
	};

	const printers = getPrinters();
	// move the object in the array with the name value "Custom" to the front
	printers.sort((a, b) => {
		if (a.name === 'Custom') {
			return -1;
		} else if (b.name === 'Custom') {
			return 1;
		} else {
			return 0;
		}
	});
	let printer: Printer = printers[0];
</script>

<main>
	<nav>
		<h1>printstimate</h1>
		<p>
			<a href="https://github.com/willuhmjs/printstimate" target="_blank"><i class="fa-brands fa-github"></i></a>
		</p>
	</nav>
	<Box title="Cost Estimate">
		<label for="costEstimate">Cost Estimate</label>
		<p class="costEstimate">{formatCost(estimateCost(conditions, printer), toFixed)}</p>
		<div class="inputItem">
			<label for="toFixed">Decimal Places</label>
			<br />
			<div class="inputContent rangeContent">
				<input
					min="2"
					max="10"
					placeholder="Decimal Places"
					id="toFixed"
					type="range"
					bind:value={toFixed}
				/>
				<output for="toFixed">{toFixed}</output>
			</div>
		</div></Box
	>
	<Box title="3D Printer">
		<div class="printerInput">
			<div class="inputItem printerSelectItem">
				<label for="printer">3D Printer</label>
				<br />
				<div class="inputContent">
					<select id="printer" bind:value={printer}>
						{#each printers as printer}
							<option value={printer}>{printer.name}</option>
						{/each}
					</select>
				</div>
			</div>
			<div class="inputItem">
				<label for="printWatts">Print Watts</label>
				<br />
				<div class="inputContent">
					<input
						min="0"
						placeholder="Watts"
						id="printWatts"
						type="number"
						bind:value={printer.printWatts}
						disabled={printer.name !== 'Custom'}
					/>
				</div>
			</div>
			<div class="inputItem">
				<label for="warmupWatts">Warm Up Watts</label>
				<br />
				<div class="inputContent">
					<input
						min="0"
						placeholder="Watts"
						id="warmupWatts"
						type="number"
						bind:value={printer.warmupWatts}
						disabled={printer.name !== 'Custom'}
					/>
				</div>
			</div>
		</div>
	</Box>
	<Box title="Print Info">
		<div class="inputItem">
			<label for="amountInGrams">Print Weight (g)</label>
			<br />
			<div class="inputContent">
				<input
					min="0"
					placeholder="Grams"
					id="amountInGrams"
					type="number"
					bind:value={conditions.amountInGrams}
				/>
			</div>
		</div>
		<div class="inputItem">
			<label for="printTime">Print Time (hr, min)</label>
			<br />
			<div class="inputContent">
				<input placeholder="Hours" class="printTime" type="number" bind:value={printTimeHours} />
				<input
					min="0"
					placeholder="Minutes"
					class="printTime"
					type="number"
					bind:value={printTimeMinutes}
				/>
			</div>
		</div>
		<div class="inputItem">
			<label for="warmupTime">Warm Up Time (min)</label>
			<br />
			<div class="inputContent">
				<input
					min="0"
					placeholder="Minutes"
					id="warmupTime"
					type="number"
					bind:value={conditions.warmupTime}
				/>
			</div>
		</div>
		<div class="inputItem">
			<label for="electricityCost">Electricity Cost ($/kWH)</label>
			<br />
			<div class="inputContent">
				<input
					min="0"
					placeholder="Dollars per Kilowatt-hour"
					id="electricityCost"
					type="number"
					bind:value={conditions.electricityCost}
				/>
			</div>
		</div>
		<div class="inputItem">
			<label for="costOfFilament">Cost of Filament ($/kg)</label>
			<br />
			<div class="inputContent">
				<input
					min="0"
					placeholder="Dollars per Kilogram"
					id="costOfFilament"
					type="number"
					bind:value={conditions.costOfFilament}
				/>
			</div>
		</div>
		<div class="inputItem">
			<label for="otherCosts">Other Costs ($)</label>
			<br />
			<div class="inputContent">
				<input
					min="0"
					placeholder="Dollars"
					id="otherCosts"
					type="number"
					bind:value={conditions.otherCosts}
				/>
			</div>
		</div>
	</Box>
</main>

<style>
	.inputContent {
		display: flex;
		flex-direction: row;
	}

	.printerInput {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 1ch;
	}

	.printerInput div {
		flex: 1;
	}

	.rangeContent {
		display: flex;
		flex-direction: row;
		gap: 1ch;
		vertical-align: middle;
		align-items: center;
	}

	.inputContent input[type='number'],
	.inputContent input[type='range'] {
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

	input,
	select {
		width: 100%;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}

	.inputItem {
		margin-bottom: 1em;
	}

	.printerSelectItem {
		min-width: 0;
	}

	.costEstimate {
		font-size: 1rem;
		font-weight: bold;
	}

	nav {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #ccc;
	}

	nav a {
		color: #000;
		text-decoration: none;
		font-size: 1.5rem;
	}

	nav a:hover {
		text-decoration: underline;
		color: #666;
	}

	@media (max-width: 600px) {
		.printerInput {
			display: block;
		}
	}
</style>
