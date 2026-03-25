<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import Card from './Card.svelte';

	interface Props {
		posts: ComponentProps<typeof Card>[];
	}

	let { posts }: Props = $props();
</script>

<div class="grid">
	{#each posts as post}
		<Card {...post} />
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: 1fr;
		align-self: stretch; /* override section's align-items: flex-start */

		@media (min-width: 720px) {
			grid-template-columns: 1fr 1fr;
			column-gap: 2rem;
		}
	}
</style>
