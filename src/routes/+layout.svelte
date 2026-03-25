<script lang="ts">
	import Header from './Header.svelte';
	import './styles.css';
	import { page } from '$app/stores';
	interface Props {
		children?: import('svelte').Snippet;
	}

	const { children }: Props = $props();

	const noFrame = $derived(['/resume'].includes($page.url.pathname));
</script>

{#if noFrame}
	{@render children?.()}
{:else}
	<div class="app">
		<Header />
		<main>
			{@render children?.()}
		</main>
		<footer>
			<a href="/llms.txt">llms.txt</a>
		</footer>
	</div>
{/if}

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 2.5rem 1.5rem 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		padding: 1rem 1.5rem 1.5rem;
		font-size: 0.75rem;
		opacity: 0.25;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
		border-top: 1px solid var(--color-rule);
	}

	footer a {
		color: inherit;
		text-decoration: none;
		letter-spacing: 0.04em;
	}

	footer a:hover {
		opacity: 1;
		text-decoration: underline;
	}
</style>
