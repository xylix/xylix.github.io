<script lang="ts">
	import { vibes } from '$lib/vibes';
</script>

<div class="vibes-canvas" aria-label="Current vibes">
	{#each vibes as item (item.id)}
		<div
			class="vibe-item"
			class:mono={item.mono}
			style="
				left: {item.x}%;
				top: {item.y}%;
				transform: rotate({item.rotate ?? 0}deg);
				font-size: {item.fontSize ?? '0.9rem'};
				color: {item.color ?? 'var(--color-text)'};
			"
		>
			{#if item.type === 'image'}
				<img src={item.content} alt={item.alt ?? ''} class="vibe-image" />
			{:else}
				{item.content}
			{/if}
		</div>
	{/each}
</div>

<style>
	.vibes-canvas {
		position: relative;
		width: 100%;
		height: 220px;
		margin: 1.5rem 0 0.5rem;
	}

	.vibe-item {
		position: absolute;
		white-space: pre-wrap;
		line-height: 1.35;
		user-select: none;
		opacity: 0.92;
		transition: opacity 0.2s;
	}

	.vibe-item:hover {
		opacity: 1;
	}

	.vibe-item.mono {
		font-family: var(--font-mono);
	}

	.vibe-image {
		width: 90px;
		height: 90px;
		object-fit: cover;
		border: 1px solid color-mix(in srgb, var(--color-theme-1) 40%, transparent);
		display: block;
	}

	@media (max-width: 480px) {
		.vibes-canvas {
			height: 260px;
		}
	}
</style>
