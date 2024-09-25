<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import CardGrid from '$lib/components/CardGrid.svelte';

	export let data: ComponentProps<CardGrid>;
</script>

<svelte:head>
	<title>Tags</title>
	<meta name="description" content="Tags" />
</svelte:head>

<section>
	<h1>Projects</h1>
	<p>
    List of tags in the blog
	</p>
	<CardGrid {...data} />
</section>
