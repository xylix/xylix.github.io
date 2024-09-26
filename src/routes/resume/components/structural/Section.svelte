<script lang="ts">
	import Contact from '../sections/Contact.svelte';
	import Skills from '../sections/Skills.svelte';
	import FullDetails from '../sections/FullDetails.svelte';
	import SimpleDetails from '../sections/SimpleDetails.svelte';
	import Picture from '../items/Picture.svelte';
	export let label: string;
	/* eslint-disable @typescript-eslint/no-explicit-any */
	export let details: any;
	export let type: string;
</script>

<div class="section">
	{#if type === 'picture'}
		<Picture {label} {details} />
	{:else}
		<h2 class="section-label">{label}</h2>
		<hr class="section-underline" />
		{#if type === 'simple-details'}
			<SimpleDetails {details} />
		{:else if type === 'full-details'}
			<FullDetails {details} />
		{:else if type === 'skills'}
			<Skills {details} />
		{:else if type === 'contact'}
			<Contact {details} />
		{/if}
	{/if}
</div>
