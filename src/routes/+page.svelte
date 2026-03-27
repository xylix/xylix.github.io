<script lang="ts">
	import CardGrid from '$lib/components/CardGrid.svelte';
	import VibesCanvas from '$lib/components/VibesCanvas.svelte';
	import { public_posts } from '$lib/load_posts';
	import { withEraBackground } from '$lib/eras';

	const newest = withEraBackground(public_posts.slice(0, 10));
	const favourites = withEraBackground(public_posts.filter((post) => post.favourite));
</script>

<svelte:head>
	<title>xylix.github.io</title>
	<meta name="description" content="Landing page" />
</svelte:head>

<section>
	<h1>Welcome</h1>

	<p>
		<a href="/about">Xylix's</a> home page. I think here aloud. Includes a not-so-active blog, miscellaneous
		thoughts, etc.
	</p>

	<VibesCanvas />

	<p>"Fresh" off the presses:</p>
	<CardGrid posts={newest} />

	<p>Some of my favorites:</p>
	<CardGrid posts={favourites} />
</section>
