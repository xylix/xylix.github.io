<script>
	import CardGrid from '$lib/components/CardGrid.svelte';

	export let data;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Landing page" />
</svelte:head>

<section>
	<h1>Welcome</h1>

	<p>
		<a href="/about">Xylix's</a> home page. Includes a not-so-active blog, miscellaneous thoughts, etc.
	</p>

	<CardGrid posts={data.favourites} />
</section>
