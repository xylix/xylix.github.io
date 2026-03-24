<script lang="ts">
	import CardGrid from '$lib/components/CardGrid.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Sequences</title>
	<meta name="description" content="Sequences — ordered collections of related posts" />
</svelte:head>

<section>
	<h1>Sequences</h1>
	<p>Ordered collections of posts that build on each other.</p>
	<CardGrid posts={data.posts} />
</section>
