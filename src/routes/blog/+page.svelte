<script lang="ts">
	import { website } from '../constants';
	import { public_posts } from '$lib/load_posts';
	import CardGrid from '$lib/components/CardGrid.svelte';
	import { withEraBackground } from '$lib/eras';

	const feed = `${website}/rss.xml`;
	const postsWithEra = withEraBackground(public_posts);
</script>

<svelte:head>
	<title>Blog</title>
	<meta name="description" content="Blog" />
</svelte:head>

<section>
	<h1>Blog</h1>
	<p>My blog posts in chronological order (latest first)</p>
	<p>
		RSS feed available at <a href={feed}>{feed}</a>
	</p>

	<CardGrid posts={postsWithEra} />
</section>
