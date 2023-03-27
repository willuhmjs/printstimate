<script lang="ts">
    import { estimateCost, formatCost } from '../lib/calculator'
    import type { PrintConditions, Printer } from '../lib/printers';
    import { printers } from '../lib/printers';

    let printer: Printer = printers[0];
    let conditions: PrintConditions = {
        amountInGrams: 4,
        printTime: (22/60),
        electricityCost: 0.11,
        costOfFilament: 25
    };

    $: cost = estimateCost(conditions, printer);
</script>

<div class="wrapper">
    <!-- has two inputs side by side for the amount in grams and print cost -->
    <!-- accordion menu for other conditions (electricity cost and cost of filament) -->
    <!-- accordion menu for chosing a printer. has a search bar -->
</div>

<style>
    .wrapper {
        margin: auto;
        max-width: 600px;
        border: 1px solid #ccc;
    }
</style>