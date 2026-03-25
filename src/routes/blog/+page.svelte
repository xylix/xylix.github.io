<script lang="ts">
	import { website } from '../constants';
	import { public_posts } from '$lib/load_posts';
	import { public_sequences } from '$lib/load_sequences';
	import CardGrid from '$lib/components/CardGrid.svelte';
	import { withEraBackground } from '$lib/eras';

	const feed = `${website}/rss.xml`;
	const postsWithEra = withEraBackground(public_posts);
	const sequenceCards = public_sequences.map((s) => ({
		link: s.link,
		title: s.name,
		tagline: s.tagline
	}));
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

	{#if sequenceCards.length > 0}
		<h2 class="section-heading">Sequences</h2>
		<CardGrid posts={sequenceCards} />
		<hr class="section-divider" />
	{/if}

	<CardGrid posts={postsWithEra} />
</section>

<style>
	.section-heading {
		margin-top: 2rem;
	}

	.section-divider {
		margin: 2rem 0;
		border: none;
		border-top: 1px solid var(--color-text, currentColor);
		opacity: 0.15;
	}
</style>
