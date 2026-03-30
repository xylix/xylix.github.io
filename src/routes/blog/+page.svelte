<script lang="ts">
	import { website } from '../constants';
	import { public_posts, draft_posts } from '$lib/load_posts';
	import { public_sequences } from '$lib/load_sequences';
	import CardGrid from '$lib/components/CardGrid.svelte';
	import { withEraBackground } from '$lib/eras';

	const feed = `${website}/rss.xml`;

	const DEPRIORITIZED_TAGS = ['work-in-progress', 'in-progress', 'ai-written'];
	const isDeprioritized = (tags: string[]) => tags.some((t) => DEPRIORITIZED_TAGS.includes(t));

	const sorted = [
		...public_posts.filter((p) => !isDeprioritized(p.tags)),
		...public_posts.filter((p) => isDeprioritized(p.tags))
	];
	const postsWithEra = withEraBackground(sorted).map((p) => ({
		...p,
		deprioritized: isDeprioritized(p.tags)
	}));

	const draftPostsWithEra = withEraBackground(draft_posts).map((p) => ({
		...p,
		deprioritized: true
	}));

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
	<div class="index-header">
		<h1>Blog</h1>
		<a class="feed-link" href={feed}>RSS</a>
	</div>

	{#if sequenceCards.length > 0}
		<h2 class="section-label">Sequences</h2>
		<CardGrid posts={sequenceCards} columns={1} />
		<hr class="section-divider" />
	{/if}

	<CardGrid posts={postsWithEra} columns={1} />

	{#if draftPostsWithEra.length > 0}
		<hr class="section-divider" />
		<h2 class="section-label">Drafts:</h2>
		<CardGrid posts={draftPostsWithEra} columns={1} />
	{/if}
</section>

<style>
	.index-header {
		display: flex;
		align-items: baseline;
		gap: 1.25rem;
		margin-bottom: 1.5rem;
	}

	.index-header h1 {
		margin: 0;
	}

	.feed-link {
		font-size: 0.72rem;
		letter-spacing: 0.07em;
		text-transform: uppercase;
		opacity: 0.4;
		color: var(--color-text);
		transition: opacity 0.12s;
	}

	.feed-link:hover {
		opacity: 0.9;
		text-decoration: none;
	}

	.section-label {
		font-size: 0.7rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		opacity: 0.35;
		margin: 0 0 0.25rem;
		font-weight: 400;
	}

	.section-divider {
		margin: 0.75rem 0 0;
		border: none;
		border-top: 1px solid var(--color-rule, color-mix(in srgb, currentColor 8%, transparent));
		width: 100%;
	}
</style>
