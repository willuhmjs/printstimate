<script lang="ts">
	export let title: String;
</script>

<section>
	<h2>{title}</h2>
	<div class="box">
		<slot />
	</div>
</section>

<style>
	.box {
		border: 1px solid #ccc;
		border-radius: 4px;
		padding: 1em;
		margin: 1em 0;
		background-color: #f5f5f5;
	}
</style>
