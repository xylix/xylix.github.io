<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<article>
	<h1>{data.name}</h1>
	<svelte:component this={data.content} />
	{#if data.tagged.length > 0}
		<hr />
		<p>Posts with this tag:</p>
		<ul>
			{#each data.tagged as post}
				<li>
					<a href={post.link}>{post.title}</a>
				</li>
			{/each}
		</ul>
	{/if}
</article>
