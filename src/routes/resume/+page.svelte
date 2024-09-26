<script>
	import Header from './components/structural/Header.svelte';
	import Section from './components/structural/Section.svelte';
	import './styles.css';

	import { mainColumnContent, sideColumnContent } from './content';
</script>

<main>
	<Header />
	<div class="main-body">
		<div id="main-column" class="column">
			{#each mainColumnContent as { label, details, type }}
				<Section {label} {details} {type} />
			{/each}
		</div>
		<div id="side-column" class="column">
			{#each sideColumnContent as { label, details, type }}
				<Section {label} {details} {type} />
			{/each}
		</div>
	</div>
</main>

<style>
	div.main-body {
		display: flex;
		justify-content: space-between;
		flex-direction: var(--column-order);
		margin: 0 var(--horizontal-offset);
	}

	.column {
		margin: 0 var(--horizontal-space-between-columns);
		display: flex;
		flex-direction: column;
	}

	#main-column {
		width: var(--main-column-width);
		justify-content: space-between;
	}

	#side-column {
		width: calc(100% - var(--main-column-width));
		text-align: var(--more-centered);
		/* justify-content: space-between; */
	}
</style>
