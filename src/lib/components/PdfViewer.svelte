<script lang="ts">
	let { src, title = 'PDF viewer' }: { src: string; title?: string } = $props();
</script>

<iframe {src} {title} loading="lazy"></iframe>

<style>
	iframe {
		width: 100%;
		height: 80vh;
		border: 1px solid var(--color-rule, color-mix(in srgb, currentColor 8%, transparent));
		border-radius: 4px;
	}
</style>
