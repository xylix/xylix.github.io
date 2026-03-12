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

<article class:thread={data.format === 'thread'}>
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

	/* ── Thread format ─────────────────────────────────────────────── */

	:global(article.thread) {
		max-width: 54rem;
		margin-left: auto;
		margin-right: auto;
	}

	:global(article.thread p) {
		display: grid;
		grid-template-columns: 48px 1fr;
		gap: 0.75rem;
		align-items: start;
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}

	:global(article.thread p::before) {
		content: '';
		display: block;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: url('/2024_picture.jpg') center / cover;
		border: 2px solid var(--color-theme-1);
	}

	/* hr becomes the connector line between thoughts */
	:global(article.thread hr) {
		all: unset;
		display: block;
		width: 2px;
		height: 1.5rem;
		margin-left: 21px; /* center of 44px avatar */
		background: linear-gradient(
			to bottom,
			color-mix(in srgb, var(--color-theme-1) 60%, transparent),
			color-mix(in srgb, var(--color-theme-1) 10%, transparent)
		);
	}
</style>
