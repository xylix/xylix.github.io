<script lang="ts">
	import CardGrid from '$lib/components/CardGrid.svelte';
	import { public_posts } from '$lib/load_posts';
	import { getCardBackground } from '$lib/eras';

	const withEra = (posts: typeof public_posts) =>
		posts.map((p) => ({ ...p, eraBackground: getCardBackground(p.createdAt, p.updatedAt) }));

	const newest = withEra(public_posts.slice(0, 3));
	const favourites = withEra(public_posts.filter((post) => post.favourite));
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

	<p>"Fresh" off the presses:</p>
	<CardGrid posts={newest} />

	<p>Some of my favorites:</p>
	<CardGrid posts={favourites} />
</section>
