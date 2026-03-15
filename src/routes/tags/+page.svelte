<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Tags</title>
	<meta name="description" content="Tags" />
</svelte:head>

<section>
	<h1>Tags</h1>
	<p>List of tags in the blog</p>
	<ul>
		{#each data.posts as tag}
			<li><a href={tag.link}>{tag.heading}</a></li>
		{/each}
	</ul>
</section>
