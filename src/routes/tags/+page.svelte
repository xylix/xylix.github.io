<script lang="ts">
	import CardGrid from '$lib/components/CardGrid.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Tags</title>
	<meta name="description" content="Tags" />
</svelte:head>

<section>
	<h1>Tags</h1>
	<p>List of tags in the blog</p>
	<CardGrid posts={data.posts} />
</section>
