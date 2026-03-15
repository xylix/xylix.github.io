<script lang="ts">
	import type { Article } from '$lib/load_posts';
	import BigCard from './BigCard.svelte';

	const { posts }: { posts: Article[] } = $props();
</script>

<div class="grid">
	{#each posts as post}
		<BigCard
			title={post.title}
			subtitle={post.tagline}
			link={post.link}
			wordCount={post.wordCount}
			pubDate={post.createdAt}
		/>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		gap: 1rem;
		width: 100%;
		grid-template-columns: repeat(1, 1fr);

		@media (min-width: 720px) {
			grid-template-columns: repeat(2, 1fr);
		}
		@media (min-width: 1080px) {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
