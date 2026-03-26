<script>
	import { page } from '$app/stores';

	let currentPage = $derived($page.url.pathname);

	let pages = [
		['/', 'Home'],
		['/blog', 'Blog'],
		['/tags', 'Tags'],
		['/about', 'About me']
	];
</script>

<header>
	<nav>
		<ul>
			{#each pages as [path, name]}
				<li aria-current={currentPage === path ? 'page' : undefined}>
					<a href={path}>{name}</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style>
	header {
		width: 100%;
		border-bottom: 1px solid color-mix(in srgb, var(--color-text) 8%, transparent);
	}

	nav {
		max-width: 64rem;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	ul {
		display: flex;
		align-items: center;
		gap: 0;
		list-style: none;
		margin: 0;
		padding: 0.6rem 0;
	}

	li a {
		display: block;
		padding: 0.25rem 0.75rem;
		font-size: 0.78rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--color-text);
		text-decoration: none;
		opacity: 0.35;
		transition: opacity 0.12s;
	}

	li a:hover {
		opacity: 0.9;
		text-decoration: none;
	}

	li[aria-current='page'] a {
		opacity: 1;
		color: var(--color-theme-1);
	}
</style>
