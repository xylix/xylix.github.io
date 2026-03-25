import adapterStatic from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { remarkFlattenThreadBullets, remarkFootnotes } from './src/lib/remark-plugins.ts';

const stripMarkdownComments = {
	name: 'strip-markdown-comments',
	markup({ content, filename }) {
		if (!filename?.endsWith('.md')) return;
		const code = content.replace(/<!--[\s\S]*?-->/g, '').replace(/^(TODO|FIXME|NOTE):.*$/gm, '');
		return { code };
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		stripMarkdownComments,
		mdsvex({
			extensions: ['.md'],
			highlight: { alias: { rs: 'rust' } },
			remarkPlugins: [remarkFlattenThreadBullets, remarkFootnotes]
		})
	],
	extensions: ['.svelte', '.md'],

	kit: { adapter: adapterStatic(), prerender: { entries: ['*', '/'] } }
};

export default config;
