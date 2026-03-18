<script lang="ts">
	import { website } from '../constants';
	import { draft_posts } from '$lib/load_posts';
	import CardGrid from '$lib/components/CardGrid.svelte';
	import { withEraBackground } from '$lib/eras';

	const feed = `${website}/rss.xml`;
	const draftsWithEra = withEraBackground(draft_posts);
</script>

<svelte:head>
	<title>Blog</title>
	<meta name="description" content="Blog" />
</svelte:head>

<section>
	<h1>Drafts</h1>
	<p>
		These posts are still cooking. They won't show up on the <a href="/blog">post list</a>, nor in
		<a href={feed}>RSS feed</a>. Svelte won't include posts in the build that are never linked to,
		which is why this page exists.
	</p>
	<CardGrid posts={draftsWithEra} />
</section>
