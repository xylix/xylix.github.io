<script lang="ts">
	interface Props {
		title: string;
		subtitle?: string;
		wordCount?: number;
		link: string;
		pubDate: Date;
	}

	const { title, subtitle, wordCount, link, pubDate }: Props = $props();
</script>

<a href={link}>
	<h2>{title}</h2>
	<h3>{subtitle}</h3>
	<div>
		{#if wordCount}
			<span>{wordCount} words</span>
		{/if}
		<span>Published {pubDate.toLocaleDateString()}</span>
	</div>
</a>

<style>
	a {
		display: flex;
		flex-direction: column;
		padding: 1rem;
		height: 100%;
		box-sizing: border-box;

		border: solid black;
		border-radius: 0.5rem;

		background-color: var(--color-bg-light);
		color: var(--color-text-card);
	}


	div {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		margin-top: auto;
		padding-top: 0.5rem;
	}
</style>
