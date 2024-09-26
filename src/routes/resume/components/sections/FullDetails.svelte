<script>
	import FullDetail from '../items/FullDetail.svelte';
	export let details;
</script>

<div>
	{#each details as details}
		<FullDetail {details} />
	{/each}
</div>
