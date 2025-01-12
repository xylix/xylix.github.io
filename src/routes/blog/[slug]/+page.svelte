<script lang="ts">
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	// Could consider {data.createdAt.toLocaleDateString("fi-FI")} {data.createdAt.toLocaleTimeString("fi-FI")} GMT+0200 for date formatting in the code
</script>

<h1>{data.title}</h1>

<span class="centered">{data.subtitle}</span>

<article>
	<data.content />
</article>

<footer>
	<hr />
	<p>Originally released on {data.createdAt}</p>
	{#if data.updatedAt && data.updatedAt.valueOf() !== data.createdAt.valueOf()}
		<div>
			This post was updated: {data.updatedAt}
		</div>
	{/if}

	{#if data.similar.length > 0}
		<p>You may also like:</p>
		<ul>
			{#each data.similar as similar}
				<li>
					<a href={similar.link}>{similar.title}</a>
				</li>
			{/each}
		</ul>
	{/if}
</footer>

<style>
	footer {
		margin-top: auto;
	}

	.centered {
		margin-left: auto;
		margin-right: auto;
		margin-top: -1rem;
	}
</style>
