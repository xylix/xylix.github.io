<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import Card from './Card.svelte';

	interface Props {
		posts: ComponentProps<typeof Card>[];
	}

	let { posts }: Props = $props();
</script>

<div class="list">
	{#each posts as post}
		<Card {...post} />
	{/each}
</div>

<style>
	.list {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
</style>
