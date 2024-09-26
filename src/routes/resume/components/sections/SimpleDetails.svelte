<script lang="ts">
	import SimpleDetail from '../items/SimpleDetail.svelte';
	export let details: {
		title: string;
		subtitle: string;
		icon: string;
		url: string;
		link: string;
		description: string;
	}[];
</script>

<div>
	{#each details as { title, subtitle, icon, url, link, description }}
		<SimpleDetail {title} {subtitle} {icon} {url} {link} {description} />
	{/each}
</div>
