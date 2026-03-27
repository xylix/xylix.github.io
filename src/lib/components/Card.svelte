<script lang="ts">
	interface Props {
		link: string;
		title: string;
		tagline?: string;
		wordCount?: number;
		createdAt?: Date;
		eraBackground?: string;
		deprioritized?: boolean;
	}

	let { link, title, tagline, wordCount, createdAt, eraBackground, deprioritized }: Props =
		$props();

	// Use the era background as an accent color.
	// eraBackground may be a solid hex or a CSS gradient; for a border we
	// pass it straight through — solid colors work as border-color, gradients
	// need a workaround (we put it on a pseudo-element via a CSS custom prop).
	const accentStyle = $derived(
		eraBackground ? `--accent: ${eraBackground}` : '--accent: var(--color-theme-1)'
	);
</script>

<a href={link} class="post-row" class:deprioritized style={accentStyle}>
	<span class="accent-bar" aria-hidden="true"></span>

	<span class="body">
		<span class="title">{title}</span>
		{#if tagline}
			<span class="tagline">{tagline}</span>
		{/if}
	</span>

	<span class="meta">
		{#if createdAt}
			<span class="date"
				>{createdAt.toLocaleDateString('en-GB', { year: 'numeric', month: 'short' })}</span
			>
		{/if}
		{#if wordCount}
			<span class="words">{wordCount}w</span>
		{/if}
	</span>
</a>

<style>
	.post-row {
		display: grid;
		grid-template-columns: 3px 1fr auto;
		gap: 0 1.25rem;
		align-items: center;
		padding: 1.15rem 0;
		border-bottom: 1px solid var(--color-rule, color-mix(in srgb, currentColor 8%, transparent));
		color: inherit;
		text-decoration: none;
		opacity: 0.72;
		transition: opacity 0.12s;
	}

	.post-row:hover {
		opacity: 1;
		text-decoration: none;
	}

	.post-row.deprioritized {
		opacity: 0.35;
		filter: saturate(0.4);
	}

	.post-row.deprioritized:hover {
		opacity: 0.65;
		filter: saturate(0.7);
	}

	/* The accent bar uses the era color via a CSS custom property.
	   background handles both solid colors and gradients. */
	.accent-bar {
		display: block;
		width: 3px;
		align-self: stretch;
		min-height: 1.5rem;
		border-radius: 2px;
		background: var(--accent, var(--color-theme-1));
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.title {
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--color-text);
		letter-spacing: 0.005em;
	}

	.tagline {
		font-size: 0.8rem;
		color: var(--color-text-muted, color-mix(in srgb, var(--color-text) 45%, transparent));
		line-height: 1.4;
	}

	.meta {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.15rem;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--color-text-muted, color-mix(in srgb, var(--color-text) 45%, transparent));
		white-space: nowrap;
	}
</style>
