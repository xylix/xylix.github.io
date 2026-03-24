<script lang="ts">
	import type { PageData } from './$types';
	import type { ResolvedNode } from './+page';

	let { data }: { data: PageData } = $props();
</script>

{#snippet renderNode(node: ResolvedNode)}
	<li>
		{#if node.post}
			<a href={node.post.link}>{node.label}</a>
			{#if node.post.draft}
				<span class="draft-badge">draft</span>
			{/if}
		{:else}
			{node.label}
		{/if}
		{#if node.children.length > 0}
			<ul>
				{#each node.children as child}
					{@render renderNode(child)}
				{/each}
			</ul>
		{/if}
	</li>
{/snippet}

<article>
	<h1>{data.name}</h1>
	{#if data.tagline}
		<p>{data.tagline}</p>
	{/if}
	<ul>
		{#each data.tree as node}
			{@render renderNode(node)}
		{/each}
	</ul>
</article>

<style>
	.draft-badge {
		font-size: 0.75em;
		opacity: 0.6;
		margin-left: 0.4em;
	}
</style>
