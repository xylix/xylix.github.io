<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import Card from './Card.svelte';

	interface Props {
		posts: ComponentProps<typeof Card>[];
		columns?: 1 | 2;
	}

	let { posts, columns = 2 }: Props = $props();
</script>

<div class="grid" style="--cols: {columns}">
	{#each posts as post}
		<Card {...post} />
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: 1fr;
		align-self: stretch;
	}

	@media (min-width: 720px) {
		.grid {
			grid-template-columns: repeat(var(--cols, 1), 1fr);
			column-gap: 2rem;
		}
	}
</style>
