<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<article>
	<h1>{data.name}</h1>
	<svelte:component this={data.content} />
	{#each data.sections as section}
		{#if section.name}
			<h2>{section.name}</h2>
		{/if}
		{#if section.posts.length > 0}
			<ol>
				{#each section.posts as post}
					<li>
						<a href={post.link}>{post.title}</a>
						{#if post.draft}
							<span class="draft-badge">draft</span>
						{/if}
					</li>
				{/each}
			</ol>
		{:else}
			<p><em>No posts yet.</em></p>
		{/if}
	{/each}
</article>

<style>
	.draft-badge {
		font-size: 0.75em;
		opacity: 0.6;
		margin-left: 0.4em;
	}
</style>
