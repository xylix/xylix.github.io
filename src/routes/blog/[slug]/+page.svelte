<script lang="ts">
	import type { PageData } from './$types';
	import { github_repo } from '../../constants';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const githubFileUrl = $derived(`${github_repo}/commits/main/src/lib/posts/${data.slug}.md`);
</script>

<div class="post-layout">
	<header class="post-header">
		{#each data.sequenceBreadcrumbs as { sequenceSlug, sequenceName, path }}
			<nav class="sequence-breadcrumb">
				<a href="/sequences/{sequenceSlug}">{sequenceName}</a>
				{#each path as segment}
					<span class="breadcrumb-sep">&rsaquo;</span>
					<span>{segment}</span>
				{/each}
			</nav>
		{/each}
		<h1>{data.title}</h1>
		{#if data.subtitle}
			<p class="subtitle">{data.subtitle}</p>
		{/if}
	</header>

	<article class:thread={data.format === 'thread'}>
		<data.content />
	</article>

	<footer class="post-footer">
		<hr class="footer-rule" />

		<div class="footer-meta">
			<span class="faded">Published {data.createdAt.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</span>

			{#if data.updatedAt && data.updatedAt.length > 0}
				<details>
					<summary class="faded">Revisions ({data.updatedAt.length})</summary>
					<ul>
						{#each data.updatedAt as rev}
							<li>
								<a href={githubFileUrl}>{rev.date.toLocaleString('en-GB', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</a>
								<span class="diff-stat"><span class="added">+{rev.added}</span> <span class="deleted">-{rev.deleted}</span></span>
							</li>
						{/each}
					</ul>
				</details>
			{/if}

			<div class="tags">
				{#each data.tags as tag}
					<a class="tag" href="/tags/{tag}">{tag}</a>
				{/each}
			</div>
		</div>

		{#if data.similar.length > 0}
			<div class="similar">
				<span class="similar-label">Related</span>
				<ul>
					{#each data.similar as similar}
						<li><a href={similar.link}>{similar.title}</a></li>
					{/each}
				</ul>
			</div>
		{/if}

		<a class="return-link" href="/blog">All posts</a>
	</footer>
</div>

<style>
	.post-layout {
		width: 100%;
	}

	.post-header {
		margin-bottom: 2.5rem;
	}

	.post-header h1 {
		text-align: left;
		margin-bottom: 0.35rem;
	}

	.sequence-breadcrumb {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.3rem;
		margin-bottom: 0.5rem;
		font-size: 0.7rem;
		letter-spacing: 0.05em;
		opacity: 0.6;
	}

	.sequence-breadcrumb a,
	.sequence-breadcrumb span {
		padding: 0.15rem 0.45rem;
		border-radius: 2px;
		border: 1px solid currentColor;
		color: var(--color-text);
		text-decoration: none;
		transition: opacity 0.12s;
	}

	.sequence-breadcrumb a:hover {
		opacity: 1;
		text-decoration: none;
	}

	.breadcrumb-sep {
		border: none !important;
		padding: 0 !important;
		opacity: 0.6;
	}

	.subtitle {
		margin: 0;
		font-size: 0.95rem;
		opacity: 0.55;
		line-height: 1.4;
	}

	.post-footer {
		margin-top: 3rem;
	}

	.footer-rule {
		border: none;
		border-top: 1px solid var(--color-rule, color-mix(in srgb, currentColor 8%, transparent));
		margin-bottom: 1.25rem;
	}

	.footer-meta {
		font-size: 0.8rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
	}

	.tag {
		font-size: 0.7rem;
		letter-spacing: 0.05em;
		padding: 0.15rem 0.45rem;
		border-radius: 2px;
		border: 1px solid currentColor;
		opacity: 0.6;
		color: var(--color-text);
		text-decoration: none;
		transition: opacity 0.12s;
	}

	.tag:hover {
		opacity: 1;
		text-decoration: none;
	}

	.faded {
		opacity: 0.45;
	}

	.footer-meta details summary {
		cursor: pointer;
	}

	.footer-meta ul {
		margin: 0.25rem 0 0;
		padding-left: 1rem;
	}

	.diff-stat {
		margin-left: 0.5rem;
		font-size: 0.85em;
	}

	.added {
		color: #4caf4c;
	}

	.deleted {
		color: #d44040;
	}

	.similar {
		margin-bottom: 1.5rem;
		font-size: 0.85rem;
	}

	.similar-label {
		display: block;
		font-size: 0.7rem;
		letter-spacing: 0.07em;
		text-transform: uppercase;
		opacity: 0.4;
		margin-bottom: 0.5rem;
	}

	.similar ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.return-link {
		display: inline-block;
		font-size: 0.78rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		opacity: 0.4;
		color: var(--color-text);
		text-decoration: none;
		transition: opacity 0.12s;
	}

	.return-link:hover {
		opacity: 0.9;
		text-decoration: none;
	}

	/* ── Thread format ─────────────────────────────────────────────── */

	:global(article.thread) {
		max-width: 54rem;
		margin-left: auto;
		margin-right: auto;
	}

	:global(article.thread p) {
		position: relative;
		padding-left: calc(44px + 0.75rem);
		min-height: 44px;
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}

	:global(article.thread p::before) {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: url('/2024_picture.jpg') center / cover;
		border: 2px solid var(--color-accent);
	}

	:global(article.thread blockquote p::before) {
		display: none;
	}

	:global(article.thread blockquote p) {
		padding-left: 0;
		min-height: unset;
	}

	:global(article.thread blockquote) {
		margin: 0.5rem 0 0 calc(44px + 0.75rem);
		padding: 0.4rem 0.75rem;
		border-left: 3px solid color-mix(in srgb, var(--color-accent) 50%, transparent);
		color: var(--color-text, inherit);
		opacity: 0.85;
		font-style: italic;
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
			color-mix(in srgb, var(--color-accent) 60%, transparent),
			color-mix(in srgb, var(--color-accent) 10%, transparent)
		);
	}
</style>
