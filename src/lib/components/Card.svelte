<script lang="ts">
	interface Props {
		link: string;
		title: string;
		tagline?: string;
		wordCount?: number;
		createdAt?: Date;
		eraBackground?: string;
	}

	let { link, title, tagline, wordCount, createdAt, eraBackground }: Props = $props();
</script>

<a href={link}>
	<div style:background={eraBackground}>
		<h2>{title}</h2>

		{#if tagline}
			<p>{tagline}</p>
		{/if}

		{#if wordCount || createdAt}
			<p class="meta">
				{#if wordCount}{wordCount} words{/if}
				{#if wordCount && createdAt}
					·
				{/if}
				{#if createdAt}{createdAt.toLocaleDateString()}{/if}
			</p>
		{/if}
	</div>
</a>

<style>
	h2 {
		min-height: 2.5em;
	}
	p {
		min-height: 3em;
	}
	p.meta {
		min-height: unset;
		font-size: 0.85em;
		opacity: 0.7;
	}

	div {
		background: var(--color-bg-light);
		color: var(--color-text-card);
		border-radius: 0.5rem;
		padding: 0.01rem 1rem;
	}
</style>
