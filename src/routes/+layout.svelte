<script>
	import Header from './Header.svelte';
	import './styles.css';
	import { page } from '$app/stores';
</script>

<div class="app">
	{#if !$page.url.pathname.includes('/resume')}
		<Header />
	{/if}

	<main>
		<slot />
	</main>
</div>

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
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
